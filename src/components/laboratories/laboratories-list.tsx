"use client";

import { useEffect, useState } from "react";
import { LaboratoryItem } from "./laboratory-item";
import { useLaboratories } from "@/hooks/useLaboratories";
import { useSubjects } from "@/hooks/useSubjects";
import { useUserRoles } from "@/hooks/useUserRoles";
import { useUsers } from "@/hooks/useUsers";
import { Tables } from "@/lib/types/supabase";
import { LaboratoriesListSkeleton } from "./skeletons/laboratories-list-skeleton";
import { ScrollAreaDashboard } from "../scroll-area-dashboard";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { cn, normalizeString } from "@/lib/utils";


import { ListPagination } from "../list-pagination";
import { useCourses } from "@/hooks/useCourses";

export default function LaboratoriesList(
    { q, status, subject, teacher, currentPage }
        : {
            q: string,
            status: string,
            subject: string,
            teacher: string,
            currentPage: number
        }) {
    const itemsPerPage = 4;

    const { replace } = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    // Fetching 
    const { isFetching: isFetchingLaboratories, data: laboratories } = useLaboratories();
    const { isFetching: isFetchingSubjects, data: subjects } = useSubjects();
    const { isFetching: isFetchingTypesUsers, data: types } = useUserRoles();
    const { isFetching: isFetchingUsers, data: users } = useUsers();
    const { isFetching: isFetchingCourses, data: courses } = useCourses();


    const [filteredLaboratories, setFilteredLaboratories] = useState(laboratories);
    const [pagedLaboratories, setPagedLaboratories] = useState(laboratories);

    const [pages, setPages] = useState<number[]>([]);


    /* Definir la lista filtrada y la lista filtrada y paginada */
    useEffect(() => {

        const filtered = filterLaboratories();
        setFilteredLaboratories(filtered);
    }, [laboratories, users, subjects, q, currentPage, status, subject, teacher]);

    useEffect(() => {
        if (filteredLaboratories) {
            const lastIndex = currentPage * itemsPerPage;
            const firstIndex = lastIndex - itemsPerPage;
            setPagedLaboratories(filteredLaboratories.slice(firstIndex, lastIndex));
        }
    }, [filteredLaboratories])


    /* Definir las páginas */
    useEffect(() => {
        if (filteredLaboratories) {
            const temp = []
            for (let i = 1; i <= Math.ceil(filteredLaboratories.length / itemsPerPage); i++) {
                temp.push(i);
            }
            setPages(temp);
        }
    }, [filteredLaboratories])

    useEffect(() => {
        if (pages) {
            if (currentPage > pages.length) {
                const params = new URLSearchParams(searchParams)
                params.set("page", "" + pages.length);
                replace(`${pathname}?${params.toString()}`);
            }
        }
    }, [pages])


    const filterLaboratories = () => {
        if (!laboratories) return [];
        return laboratories.filter((lab) => {
            const { label } = lab;
            const _course = courses?.find((c) => c.id === lab.course_id)
            const _searchQuery = normalizeString(q);
            const _displayName = normalizeString(label);

            const _search = _displayName?.toLowerCase().includes(_searchQuery);

            const _subject = subjects?.find((s) => s.key === subject);
            const _teacher = users?.find((u) => u.id === teacher);

            const teacherFilter = teacher ? _course?.teacher_id === _teacher?.id : true;
            const subjectFilter = subject ? _course?.subject_id === _subject?.id : true;

            const isBusy = !!_course;

            const checkFilters = _search && teacherFilter && subjectFilter;

            if (status === "all") {
                return checkFilters;
            } else if (status === "busy") {
                return isBusy && checkFilters;
            } else if (status === "idle") {
                return !isBusy && checkFilters;
            } else if (status === "oos") {
                return true && checkFilters;
            } else {
                return true && checkFilters;
            }
        });
    }

    return (
        <>
            <ScrollAreaDashboard>
                {
                    isFetchingLaboratories || isFetchingSubjects || isFetchingTypesUsers || isFetchingUsers || isFetchingCourses
                        ? <LaboratoriesListSkeleton len={itemsPerPage} />
                        : pagedLaboratories?.map((lab) => {

                            const course = courses?.find((course) => course.id === lab.course_id) as Tables<"courses">;
                            const subject = course && subjects?.find((subject) => subject.id === course.subject_id) as Tables<"subjects">;
                            const teacher = course && users?.find((user) => user.id === course.teacher_id) as Tables<"users">;
                            const userRole = course && types?.find((type) => type.id === teacher.role_id) as Tables<"roles">;
                            const isBusy = !!course;

                            // console.log("isBusy", isBusy);
                            // console.log("course", course);
                            // console.log("subject", subject);
                            // console.log("teacher", teacher);
                            // console.log("userRole", userRole);



                            return <LaboratoryItem key={lab.id}
                                lab={lab}
                                subject={subject}
                                type={userRole}
                                user={teacher}
                                isBusy={isBusy}
                            />



                        })

                }
            </ScrollAreaDashboard>
            <ListPagination
                currentPage={currentPage}
                pages={pages}
                query=
                {{
                    q: q,
                    status: status,
                    subject: subject,
                    teacher: teacher,
                }}
                nextQuery=
                {{
                    q: q,
                    status: status,
                    subject: subject,
                    teacher: teacher,
                    page: currentPage + 1,
                }}
                previousQuery=
                {{
                    q: q,
                    status: status,
                    subject: subject,
                    teacher: teacher,
                    page: currentPage - 1,
                }}
            />
        </>
    )
}
