"use server"
import { GroupUnitContainer } from "@/components/groups/units/group-unit-container";
import createSupabaseServer from "@/lib/supabase/server";
import { Tables } from "@/lib/types/supabase";
import { dehydrate, HydrationBoundary, QueryClient, useQuery } from "@tanstack/react-query";

export default async function Page({ params }: { params: { courseId: number, unitId: number } }) {
    const queryClient = new QueryClient();



    const supabase = await createSupabaseServer();
    const { data: course, error: ECourse } = await supabase.from('courses').select('*').eq('id', params.courseId).single()
    const { data: unit, error: EUnit } = await supabase.from('units').select('*').eq('course_id', params.courseId).eq('unit', params.unitId).single()
    console.log("ids", params.courseId, params.unitId)
    console.log("unit of url", unit, EUnit)
    const { data: unitAssignments, error: EAssignments } = await supabase.from('assignments').select('*').eq('unit_id', params.unitId)
    const { data: subject, error: ESubject } = await supabase.from('subjects').select('*').eq('id', course!.subject_id).single();

    await queryClient.prefetchQuery({
        queryKey: ['assignments'],
        queryFn: async () => {
            const supabase = await createSupabaseServer();
            const { data: assignments, error } = await supabase.from('assignments').select('*').eq('unit_id', params.unitId);
            return assignments;
        }
    })

    if (!course || !unit || !unitAssignments || !subject) {
        return <></>;
    }

    const { data: allCourses, error: EAllCourses } = await supabase.from('courses').select('*').eq('subject_id', subject.id);
    if (!allCourses) {
        return <></>;
    }

    const coursesIds = allCourses.map((course) => course.id);
    const { data: allUnits, error: EAllUnits } = await supabase.from('units').select('*').in('course_id', coursesIds).eq('unit', params.unitId);
    if (!allUnits) {
        return <></>;
    }


    const unitsIds = allUnits!.map((unit) => unit.id);
    const { data: allAssignments, error: EAllAssignments } = await supabase.from('assignments').select('*').in('unit_id', unitsIds);
    if (!allAssignments) {
        return <></>;
    }




    console.table([ECourse, EAssignments, EUnit, ESubject, EUnit, ECourse])
    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <GroupUnitContainer
                course={course as Tables<"courses">}
                unit={unit as Tables<"units">}
                assignments={unitAssignments as Tables<"assignments">[]}
                allAssignments={allAssignments as Tables<"assignments">[]}
            />
        </HydrationBoundary>
    )
}