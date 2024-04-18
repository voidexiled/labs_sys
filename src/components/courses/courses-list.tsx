"use client";
import { useCourses } from "@/hooks/useCourses"
import { ScrollAreaDashboard } from "../scroll-area-dashboard"
import { useEffect, useState } from "react";
import { useUsers } from "@/hooks/useUsers";
import { useSubjects } from "@/hooks/useSubjects";
import { CourseItem } from "./course-item";
import { Tables } from "@/lib/types/supabase";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import { cn, normalizeString } from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { CourseItemSkeleton } from "./skeletons/course-item-skeleton";
import { CoursesListSkeleton } from "./skeletons/courses-list-skeleton";
import { ListPagination } from "../list-pagination";
export const CoursesList = ({ q, status, subject, teacher, currentPage }: { q: string, status: string, subject: string, teacher: string, currentPage: number }) => {
    const itemsPerPage = 4;
    const { replace } = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();

    const { isFetching: isFetchingCourses, data: courses } = useCourses();
    const { isFetching: isFetchingUsers, data: users } = useUsers();
    const { isFetching: isFetchingSubjects, data: subjects } = useSubjects();

    const [filteredCourses, setFilteredCourses] = useState(courses);
    const [pagedCourses, setPagedCourses] = useState(courses);
    const [pages, setPages] = useState<number[]>([]);


    useEffect(() => {
        const lastIndex = currentPage * itemsPerPage;
        const firstIndex = lastIndex - itemsPerPage;

        const filtered = filterCourses();
        console.log("filtrado", filtered);
        setFilteredCourses(filtered);
        setPagedCourses(filtered.slice(firstIndex, lastIndex));



    }, [courses, users, subjects, currentPage, subject, teacher, q, status]);

    useEffect(() => {
        if (filteredCourses) {

            const temp = []
            for (let i = 1; i <= Math.ceil(filteredCourses.length / itemsPerPage); i++) {
                temp.push(i);
            }
            setPages(temp);
        }
    }, [filteredCourses])

    useEffect(() => {
        if (pages) {
            if (currentPage > pages.length) {
                const params = new URLSearchParams(searchParams)
                params.set("page", "" + (pages.length));
                replace(`${pathname}?${params.toString()}`);
            }
        }
    }, [pages]);

    const filterCourses = () => {
        if (!courses) return [];
        return courses.filter((course) => {

            const { classroom_code } = course;

            const _querySearch = normalizeString(q);
            const _normalizedCode = normalizeString(classroom_code || "");

            const _search = _normalizedCode?.toLowerCase().includes(_querySearch);

            const _subject = subjects?.find((s) => s.key === subject)
            const _teacher = users?.find((u) => u.id === teacher)

            const subjectFilter = subject ? course.subject_id === _subject?.id : true;
            const teacherFilter = teacher ? course.teacher_id === _teacher?.id : true;

            const checkFilters = _search && subjectFilter && teacherFilter;

            if (status === "all") {
                return checkFilters;
            } else if (status === "completed") {
                return course.status === "completed" && checkFilters;
            } else if (status === "active") {
                return course.status === "active" && checkFilters;
            } else if (status === "inactive") {
                return course.status === "inactive" && checkFilters;
            } else {
                return true && checkFilters;
            }
        });
    }



    if (!pagedCourses) return <></>
    return (<>
        <ScrollAreaDashboard>
            {
                isFetchingCourses || isFetchingSubjects || isFetchingUsers ?
                    <CoursesListSkeleton len={itemsPerPage} /> :

                    pagedCourses?.map((course) => {
                        const subject = subjects?.find((s) => s.id === course.subject_id) as Tables<"subjects">;
                        const teacher = users?.find((u) => u.id === course.teacher_id) as Tables<"users_profile">;

                        return (
                            <CourseItem key={course.id}
                                course={course}
                                subject={subject}
                                teacher={teacher}
                            />
                        )
                    })
            }
        </ScrollAreaDashboard>
        <ListPagination currentPage={currentPage} pages={pages} query=
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