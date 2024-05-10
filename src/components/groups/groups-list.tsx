"use client"
import { motion } from "framer-motion"
import { useCoursesByTeacher } from "@/hooks/teacher/useCoursesByTeacher";
import { useCourses } from "@/hooks/useCourses"
import { useUser } from "@/hooks/useUser";
import { Tables } from "@/lib/types/supabase";
import { User } from "@supabase/supabase-js";
import { ScrollAreaDashboard } from "../scroll-area-dashboard";
import { GroupAdd } from "@/icons/group-add";
import { AddGroupButton } from "./add-group-button";
import Link from "next/link";
import { GroupItem } from "./group-item";
import { Button, DateInput, Skeleton } from "@nextui-org/react";
import { GroupsListSkeleton } from "./skeletons/groups-list-skeleton";
import { useSubjects } from "@/hooks/useSubjects";




export const GroupsList = ({ teacher_user }: { teacher_user: User | null }) => {
    // const { isFetching: IFUser, data: user } = useUser();
    const { isFetching: isFetchingGroups, data: groups } = useCoursesByTeacher({ teacher_uuid: teacher_user?.id });
    const { isFetching: isFetchingSubjects, data: subjects } = useSubjects();




    return (
        <ScrollAreaDashboard >
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 justify-stretch gap-12 ">
                <AddGroupButton courses={groups!} isFetching={isFetchingGroups} />
                {
                    groups?.map((course) => {
                        const _subject = subjects?.find((s) => s.id === course.subject_id);
                        return (
                            <GroupItem key={course.id} course={course} subject={_subject} />
                        )
                    })
                }

            </div>



        </ScrollAreaDashboard >
    )
}