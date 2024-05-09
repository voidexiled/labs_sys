"use server"
import { GroupUnitContainer } from "@/components/groups/units/group-unit-container";
import createSupabaseServer from "@/lib/supabase/server";
import { Tables } from "@/lib/types/supabase";
import { dehydrate, HydrationBoundary, QueryClient, useQuery } from "@tanstack/react-query";

// TODO:✅ Switch all to useQueryClient hook . prefetchQuery

export default async function Page({ params }: { params: { courseId: number, unitId: number } }) {
    const queryClient = new QueryClient();

    /* 1. Prefetch unit of the current course */
    await queryClient.prefetchQuery({
        queryKey: ['unit', params.courseId, params.unitId],
        queryFn: async () => {
            const supabase = await createSupabaseServer();
            const { data: unitData, error } = await supabase.from('units').select('*').eq('course_id', params.courseId).eq('unit', params.unitId).single();
            if (unitData) {
                /* 2. Prefetch assignments of the current unit of the current course */
                await queryClient.prefetchQuery({
                    queryKey: ['assignments', params.courseId, params.unitId],
                    queryFn: async () => {
                        const supabase = await createSupabaseServer();
                        const { data: assignments, error } = await supabase.from('assignments').select('*').eq('unit_id', unitData.id!);
                        return assignments;
                    }
                })
            }
            return unitData;
        }
    })




    /* 1. Prefech course data */

    await queryClient.prefetchQuery({
        queryKey: ['course', params.courseId],
        queryFn: async () => {
            const supabase = await createSupabaseServer();
            const { data: courseData, error: courseError } = await supabase.from('courses').select('*').eq('id', params.courseId).single();

            if (courseData) {

                /* 2. Prefetch subject data of course */

                await queryClient.prefetchQuery({
                    queryKey: ['subject', params.courseId],
                    queryFn: async () => {
                        const supabase = await createSupabaseServer();
                        const { data: subjectData, error: subjectError } = await supabase.from("subjects").select("*").eq("id", courseData.subject_id).single();
                        if (subjectData) {

                            /* 3. Prefetch all courses of the subject */
                            await queryClient.prefetchQuery({
                                queryKey: ['subject_courses', subjectData.id],
                                queryFn: async () => {
                                    const supabase = await createSupabaseServer();
                                    const { data: allCoursesData, error: allCoursesError } = await supabase.from('courses').select('*').eq('subject_id', subjectData.id);
                                    if (allCoursesData) {
                                        const allCoursesIds = allCoursesData.map((course) => course.id);

                                        /* 4. Prefetch all units of all courses of the subject */

                                        await queryClient.prefetchQuery({
                                            queryKey: ['subject_courses_units', params.courseId, params.unitId],
                                            queryFn: async () => {
                                                const supabase = await createSupabaseServer();
                                                const { data: allUnitsData, error: allUnitsError } = await supabase.from('units').select('*').in('course_id', allCoursesIds).eq('unit', params.unitId);
                                                if (allUnitsData) {
                                                    const allUnitsIds = allUnitsData.map((unit) => unit.id);

                                                    /* 5. Prefetch all assignments of all units of all courses of the subject */

                                                    await queryClient.prefetchQuery({
                                                        queryKey: ['subject_courses_units_assignments', params.courseId, params.unitId],
                                                        queryFn: async () => {
                                                            const supabase = await createSupabaseServer();
                                                            const { data: allAssignmentsData, error: allAssignmentsError } = await supabase.from('assignments').select('*').in('unit_id', allUnitsIds);

                                                            return allAssignmentsData as Tables<"assignments">[]
                                                        }
                                                    })
                                                }

                                                return allUnitsData as Tables<"units">[]
                                            }
                                        })

                                    }

                                    return allCoursesData as Tables<"courses">[];
                                }
                            })
                        }

                        return subjectData as Tables<"subjects">;
                    }
                })
            }

            return courseData as Tables<"courses">;
        }
    })

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <GroupUnitContainer
                courseId={params.courseId}
                unitId={params.unitId}
            />
        </HydrationBoundary>
    )
}