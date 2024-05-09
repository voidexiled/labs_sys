"use client"

import { Tables } from "@/lib/types/supabase"
import { motion } from "framer-motion"
import { AssignmentsList } from "./assignments/assignments-list";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { createSupabaseBrowser } from "@/lib/supabase/browser";
import { LoadingUnit } from "@/components/teacher/groups/loading_unit";

type Props = {
    unitId: number;
    courseId: number;
    className?: string;
    children?: React.ReactNode;
}

export const GroupUnitContainer = ({ courseId, unitId, className, children }: Props) => {


    const { data: unitData, error: unitError, refetch: refetchUnit, isFetching: isFetchingUnit } = useQuery({
        queryKey: ['unit', courseId, unitId],
        queryFn: async () => {
            const supabase = createSupabaseBrowser();
            const { data: unitData, error } = await supabase.from('units').select('*').eq('course_id', courseId).eq('unit', unitId).single();
            console.log("unitData", unitData);
            return unitData as Tables<"units">;
        },
        retry: true,
    })

    const { data: assignments, error: assignmentsError, refetch: refetchAssignments, isFetching: isFetchingAssignments } = useQuery({
        queryKey: ['assignments', courseId, unitId],
        queryFn: async () => {
            const supabase = createSupabaseBrowser();
            const { data: assignments, error } = await supabase.from('assignments').select('*').eq('unit_id', unitData?.id!);
            return assignments;
        },
        retry: true,
    })

    const { data: courseData, error: courseError, refetch: refetchCourse, isFetching: isFetchingCourse } = useQuery({
        queryKey: ['course', courseId],
        queryFn: async () => {
            const supabase = createSupabaseBrowser();
            const { data: courseData, error } = await supabase.from('courses').select('*').eq('id', courseId).single();
            return courseData as Tables<"courses">;
        },
        retry: true,
    })

    const { data: subjectData, error: subjectError, refetch: refetchSubject, isFetching: isFetchingSubject } = useQuery({
        queryKey: ['subject', courseId],
        queryFn: async () => {
            const supabase = createSupabaseBrowser();

            // validate possible undefined subject_id
            const { data: subjectData, error: error } = await supabase.from("subjects").select("*").eq("id", courseData?.subject_id!).single();
            return subjectData as Tables<"subjects">;
        },
        retry: true,
    })

    const { data: allCoursesData, error: allCoursesError, refetch: refetchAllCourses, isFetching: isFetchingAllCourses } = useQuery({
        queryKey: ['subject_courses', subjectData?.id],
        queryFn: async () => {
            const supabase = createSupabaseBrowser();
            // validate possible undefined subject_id
            const { data: allCoursesData, error } = await supabase.from('courses').select('*').eq('subject_id', subjectData?.id!);
            return allCoursesData;
        },
        retry: true,
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
        retry: true,
    })

    const { data: allAssignments, error: allAssignmentsError, refetch: refetchAllAssignments, isFetching: isFetchingAllAssignments } = useQuery({
        queryKey: ['subject_courses_units_assignments', courseId, unitId],
        queryFn: async () => {
            const supabase = createSupabaseBrowser();
            const allUnitsIds = allUnitsData?.map((unit) => unit.id);
            const { data: allAssignmentsData, error } = await supabase.from('assignments').select('*').in('unit_id', allUnitsIds!);
            return allAssignmentsData;
        },
        retry: true,
    })





    return (
        <motion.div
            className={cn("flex flex-col items-start justify-start w-full h-full px-6 py-5 bg-card text-card-foreground", className)}
        >
            {
                children ??
                    ((isFetchingAssignments || isFetchingUnit || isFetchingCourse || isFetchingSubject || isFetchingAllCourses || isFetchingAllUnits || isFetchingAllAssignments) && (!assignments || !unitData || !courseData || !subjectData || !allCoursesData || !allUnitsData || !allAssignments)) ? <LoadingUnit /> :
                    <AssignmentsList unit={unitData!} assignments={assignments!} allAssignments={allAssignments!} course={courseData!} refetch={refetchAssignments} />
            }
        </motion.div>
    )
}