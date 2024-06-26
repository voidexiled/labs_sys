"use client";

import { memo, useEffect, useState } from "react";
import UserItem from "./user-item";
import { useUsers } from "@/hooks/useUsers";
import { useLaboratories } from "@/hooks/useLaboratories";
import { useUserRoles } from "@/hooks/useUserRoles";
import type { Tables } from "@/lib/types/supabase";
import { UsersListSkeleton } from "./skeletons/users-list-skeleton";
import { ScrollAreaDashboard } from "../scroll-area-dashboard";
import { normalizeString } from "@/lib/utils";
import { ListPagination } from "../list-pagination";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCourses } from "@/hooks/useCourses";

const UsersList = ({
  q,
  role,
  status,
  currentPage,
}: {
  q: string;
  role: string;
  status: string;
  currentPage: number;
}) => {
  const itemsPerPage = 4;

  const { replace } = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const {
    isFetching: isFetchingUsers,
    refetch: refetchUsers,
    data: users,
  } = useUsers();
  const { isFetching: isFetchingUserRoles, data: roles } = useUserRoles();
  const { isFetching: isFetchingLaboratories, data: laboratories } =
    useLaboratories();
  const { isFetching: isFetchingCourses, data: courses } = useCourses();

  const [filteredUsers, setFilteredUsers] = useState<typeof users>(users);
  const [pagedUsers, setPagedUsers] = useState<typeof users>(users);

  const [pages, setPages] = useState<number[]>([]);

  useEffect(() => {
    const filtered = filterUsers();
    setFilteredUsers(filtered);
  }, [users, q, currentPage, role, status, roles, laboratories]);

  useEffect(() => {
    if (filteredUsers) {
      const lastIndex = currentPage * itemsPerPage;
      const firstIndex = lastIndex - itemsPerPage;
      setPagedUsers(filteredUsers.slice(firstIndex, lastIndex));
    }
  }, [filteredUsers]);

  /* Definir las páginas */
  useEffect(() => {
    if (filteredUsers) {
      const temp = [];
      for (
        let i = 1;
        i <= Math.ceil(filteredUsers.length / itemsPerPage);
        i++
      ) {
        temp.push(i);
      }
      setPages(temp);
    }
  }, [filteredUsers]);

  useEffect(() => {
    if (pages && pages.length > 0) {
      if (currentPage > pages.length) {
        const params = new URLSearchParams(searchParams);
        params.set("page", `${pages.length}`);
        replace(`${pathname}?${params.toString()}`);
      }
    }
  }, [pages]);

  const filterUsers = () => {
    if (!users) return [];
    let roleFilter = normalizeString(role);
    if (roleFilter === "administrador") {
      roleFilter = "1";
    } else if (roleFilter === "jefedepartamento") {
      roleFilter = "2";
    } else if (roleFilter === "recepcionista") {
      roleFilter = "3";
    } else if (roleFilter === "docente") {
      roleFilter = "4";
    } else if (roleFilter === "alumno") {
      roleFilter = "5";
    }
    return users.filter((user) => {
      const _q = normalizeString(q);
      const _course = courses?.find((c) => c.teacher_id === user.id);
      const _laboratory = laboratories?.find(
        (l) => l.course_id === _course?.id
      );
      // const _role = roles?.filter((r) => r.label === role)[0]?.id || "all";
      const { no_identificador, display_name, role_id } = user;
      const _display_name = normalizeString(display_name!);
      const _role_id = Number.parseInt(roleFilter);
      const _no_identificador = normalizeString(no_identificador!);
      const _search =
        _no_identificador.includes(_q) || _display_name.includes(_q);

      const roleFilters = _role_id ? role_id === _role_id : true;

      const checkFilters = _search && roleFilters;
      const isBusy = !!_laboratory;

      if (status === "all" || !status) {
        return checkFilters;
      }if (status === "busy") {
        return checkFilters && isBusy;
      }if (status === "active") {
        return checkFilters && !isBusy;
      }
        return true && checkFilters;
    });
  };

  return (
    <>
      <ScrollAreaDashboard>
        {isFetchingUsers || isFetchingUserRoles || isFetchingLaboratories ? (
          <UsersListSkeleton len={itemsPerPage} />
        ) : (
          pagedUsers?.sort(
              (a, b) =>
                a.display_name?.localeCompare(b.display_name!, undefined, {
                  numeric: true,
                })! | 0
            )
            .map((user) => {
              const _course = courses?.find(
                (c) => c.teacher_id === user.id
              ) as Tables<"courses">;
              const _laboratory = laboratories?.find(
                (lab) => lab.course_id === _course?.id
              ) as Tables<"laboratories">;
              const _role = roles?.find(
                (r) => r.id === user.role_id
              ) as Tables<"roles">;
              return (
                <UserItem
                  key={user.id}
                  user={user as Tables<"users">}
                  laboratory={_laboratory}
                  course={_course}
                  isBusy={!!_laboratory}
                  userRole={_role}
                  refetchUsers={refetchUsers}
                  types={roles as Tables<"roles">[]}
                />
              );
            })
        )}
      </ScrollAreaDashboard>
      <ListPagination
        currentPage={currentPage}
        pages={pages}
        query={{ q: q, role: role, status: status }}
        nextQuery={{ q: q, role: role, status: status, page: currentPage + 1 }}
        previousQuery={{
          q: q,
          role: role,
          status: status,
          page: currentPage - 1,
        }}
      />
    </>
  );
};
export default memo(UsersList);
