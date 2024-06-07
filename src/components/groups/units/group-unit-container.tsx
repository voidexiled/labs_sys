"use client"

import type { Tables } from "@/lib/types/supabase"
import { motion } from "framer-motion"
import { AssignmentsList } from "./assignments/assignments-list";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { createSupabaseBrowser } from "@/lib/supabase/browser";
import { LoadingUnit } from "@/components/teacher/groups/loading_unit";
import { getUnitAssignments } from "@/app/actions/teachers";

type Props = {
    unitId: number;
    courseId: number;
    className?: string;
    children?: React.ReactNode;
}

export const GroupUnitContainer = ({ courseId, unitId, className, children }: Props) => {


    const { data: unitAssignmentsData, error: unitAssignmentsError, refetch: refetchUnitAssignments, isFetching: isFetchingUnitAssignments } = useQuery({
        queryKey: ['unit_assignments', courseId, unitId],
        queryFn: () => getUnitAssignments({ params: { courseId, unitId } }),
        enabled: !!children,
    })



    const { data: courseData, error: courseError, refetch: refetchCourse, isFetching: isFetchingCourse } = useQuery({
        queryKey: ['course', courseId],
        queryFn: async () => {
            const supabase = createSupabaseBrowser();
            const { data: courseData, error } = await supabase.from('courses').select('*').eq('id', courseId).single();
            return courseData as Tables<"courses">;
        },
        enabled: !!children,
    })

    const { data: subjectData, error: subjectError, refetch: refetchSubject, isFetching: isFetchingSubject } = useQuery({
        queryKey: ['subject', courseId],
        queryFn: async () => {
            const supabase = createSupabaseBrowser();

            // validate possible undefined subject_id
            const { data: subjectData, error } = await supabase.from("subjects").select("*").eq("id", courseData?.subject_id!).single();
            return subjectData as Tables<"subjects">;
        },
        enabled: !!children,
    })

    const { data: allCoursesData, error: allCoursesError, refetch: refetchAllCourses, isFetching: isFetchingAllCourses } = useQuery({
        queryKey: ['subject_courses', subjectData?.id],
        queryFn: async () => {
            const supabase = createSupabaseBrowser();
            // validate possible undefined subject_id
            const { data: allCoursesData, error } = await supabase.from('courses').select('*').eq('subject_id', subjectData?.id!);
            return allCoursesData;
        },
        enabled: !!children,
    })

    // noww all units of all the courses of the subject
    const { data: allUnitsData, error: allUnitsError, refetch: refetchAllUnits, isFetching: isFetchingAllUnits } = useQuery({
        queryKey: ['subject_courses_units', courseId, unitId],
        queryFn: async () => {
            const supabase = createSupabaseBrowser();
            const allCoursesIds = allCoursesData?.map((course) => course.id);
            const { data: allUnitsData, error } = await supabase.from('units').select('*').in('course_id', allCoursesIds!).eq('unit_id', unitId);
            return allUnitsData;
        },
        enabled: !!children,
    })

    const { data: allAssignments, error: allAssignmentsError, refetch: refetchAllAssignments, isFetching: isFetchingAllAssignments } = useQuery({
        queryKey: ['subject_courses_units_assignments', courseId, unitId],
        queryFn: async () => {
            const supabase = createSupabaseBrowser();
            const allUnitsIds = allUnitsData?.map((unit) => unit.id);
            const { data: allAssignmentsData, error } = await supabase.from('assignments').select('*').in('unit_id', allUnitsIds!);
            return allAssignmentsData;
        },
        enabled: !!children,
    })






    const isLoadingSomething = isFetchingUnitAssignments || isFetchingCourse || isFetchingSubject || isFetchingAllCourses || isFetchingAllUnits || isFetchingAllAssignments;

    return (
        <motion.div
            className={cn("flex flex-col items-start justify-start w-full h-full px-6 py-5  text-secondary-foreground", className)}
        >
            {
                children ? children :
                    isLoadingSomething
                        ? <LoadingUnit />
                        : <AssignmentsList unit={unitAssignmentsData!} allAssignments={allAssignments!} course={courseData!} refetch={refetchUnitAssignments} />
            }
        </motion.div>
    )
}