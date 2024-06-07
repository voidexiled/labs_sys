"use client";

import { getStudentsCourses } from "@/app/actions/students";

import type { Tables } from "@/lib/types/supabase";
import type { User, UserResponse } from "@supabase/supabase-js";
import { useQuery } from "@tanstack/react-query";
import { ScrollAreaDashboard } from "../scroll-area-dashboard";
import { GroupItem } from "../groups/group-item";

type StudentGroupsListProps = {
    user: User;
}

export const StudentGroupsList = ({ user }: StudentGroupsListProps) => {
    const { data: studentRelation, error: studentRelationError, isFetching: isFetchingRelation, refetch: refetchStudentRelation } = useQuery({
        queryKey: ['groups', user.id],
        queryFn: getStudentsCourses
    })


    return (
        <ScrollAreaDashboard >
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 justify-stretch gap-12 ">
                {/* <AddGroupButton courses={groups!} isFetching={isFetchingGroups} /> */}
                {
                    !isFetchingRelation && studentRelation?.map((relation) => {
                        const course = relation.courses;
                        const subject = course?.subjects;
                        if (!course || !subject) { return <></> }
                        return (
                            <GroupItem key={course.id} course={course} subject={subject} />
                        )
                    })
                }

            </div>



        </ScrollAreaDashboard >
    )
}