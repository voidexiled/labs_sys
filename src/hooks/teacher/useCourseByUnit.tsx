"use client";
import { createSupabaseBrowser } from "@/lib/supabase/browser";
import { Tables } from "@/lib/types/supabase";
import { useQuery } from "@tanstack/react-query";

const initCourse: Tables<"courses"> = {
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

}

export function useCourseById({ course_id }: { course_id?: number }) {
    return useQuery({
        queryKey: ["courses"],
        _optimisticResults: "optimistic",
        queryFn: async () => {
            if (!course_id) {
                return
            }
            const supabase = createSupabaseBrowser();
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                // fetch labs info
                const { data: course } = await supabase.from("courses").select("*").eq("id", course_id).single();
                return course as Tables<"courses">;
            }
            return initCourse;
        }
    })
}