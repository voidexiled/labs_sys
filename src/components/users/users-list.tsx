"use client";

import { memo, useEffect, useState } from "react";
import ClientItem from "./user-item";
import { useUsers } from "@/hooks/useUsers";
import { useLaboratories } from "@/hooks/useLaboratories";
import { useUserRoles } from "@/hooks/useUserRoles";
import { Tables } from "@/lib/types/supabase";
import { UsersListSkeleton } from "./skeletons/users-list-skeleton";
import { ScrollAreaDashboard } from "../scroll-area-dashboard";


const UsersList = ({ q, role, currentPage }: { q: string, role: string, currentPage: number }) => {

    const { isFetching: isFetchingUsers, refetch: refetchUsers, data: users } = useUsers();
    const { isFetching: isFetchingUserRoles, data: roles } = useUserRoles();
    const { isFetching: isFetchingLaboratories, data: laboratories } = useLaboratories();

    const [filteredUsers, setFilteredUsers] = useState<typeof users>([]);


    useEffect(() => {
        const filtered = filterUsers()
        setFilteredUsers(filtered);
    }, [users, q, currentPage, role])

    const filterUsers = () => {
        if (!users) return [];
        let roleFilter = role.toLowerCase();
        if (roleFilter === 'administrador') {
            roleFilter = "1";
        } else if (roleFilter === 'jefedepartamento') {
            roleFilter = "2";
        } else if (roleFilter === 'recepcionista') {
            roleFilter = "3";
        } else if (roleFilter === 'docente') {
            roleFilter = "4";
        } else if (roleFilter === 'alumno') {
            roleFilter = "5";
        }
        return users.filter((user) => {
            const _q = q.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
            const _role = roles?.filter((r) => r.label === role)[0]?.id || "all";
            const { no_identificador, display_name, role_id } = user;
            const normalized_display_name = display_name?.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
            const roleeId = parseInt(roleFilter);
            if (role === "all" || !role) {
                return no_identificador?.toLowerCase().includes(_q) || normalized_display_name?.toLowerCase().includes(_q);
            } else {
                return (no_identificador?.toLowerCase().includes(q) || normalized_display_name?.toLowerCase().includes(q)) &&
                    role_id === roleeId;
            }
        });
    }

    return (
        <ScrollAreaDashboard>
            {
                isFetchingUsers || isFetchingUserRoles || isFetchingLaboratories
                    ? <UsersListSkeleton len={filteredUsers!.length} />
                    : filteredUsers!.sort((a, b) => a.display_name?.localeCompare(b.display_name!, undefined, { numeric: true })! | 0).map((user) => {
                        return <ClientItem key={user.id} user={user as Tables<"users_profile">} laboratories={laboratories as Tables<"laboratories">[]} types={roles as Tables<"user_roles">[]} refetchUsers={refetchUsers} />
                    })
            }
        </ScrollAreaDashboard>)
}
export default memo(UsersList);