"use client";
import { createSupabaseBrowser } from "@/lib/supabase/browser";
import { Tables } from "@/lib/types/supabase";
import { useQuery } from "@tanstack/react-query";

const initCourses: Tables<"courses">[] = [{
    classroom_code: "",
    created_at: "",
    current_enrollment: 0,
    end_date: "",
    enrollment_limit: 0,
    id: 0,
    label: "",
    meeting_schedule: "",
    status: "",
    subject_id: 0,
    teacher_id: "",
    type: "",
    updated_at: "",
    visibility: "",

}]

export function useCoursesByTeacher({ teacher_uuid }: { teacher_uuid?: string }) {
    return useQuery({
        queryKey: ["courses", teacher_uuid],
        _optimisticResults: "optimistic",
        queryFn: async () => {
            if (!teacher_uuid) {
                return
            }
            const supabase = createSupabaseBrowser();
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                // fetch labs info
                const { data: courses } = await supabase.from("courses").select("*").eq("teacher_id", teacher_uuid);
                return courses as Tables<"courses">[];
            }
            return initCourses;
        },
        retry: true
    })
}