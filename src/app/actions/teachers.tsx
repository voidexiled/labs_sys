"use server";
import createSupabaseServer from "@/lib/supabase/server";

export const getUnitAssignments = async ({ params }: { params: { courseId: number, unitId: number } }) => {
    const supabase = await createSupabaseServer();

    const { data: unitData, error: unitError } = await supabase.from('units').select('*, assignments(*)').eq('course_id', params.courseId).eq('unit', params.unitId).single();

    return unitData;
}

export const getAssignmentSubmissionsFrom = async ({ params }: { params: { assignmentId: number } }) => {
    const supabase = await createSupabaseServer();
    const { data: assignment } = await supabase.from('assignments').select('*, submissions(*, users(*))').eq('id', params.assignmentId).single();
    return assignment;
}