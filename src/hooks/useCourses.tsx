"use client";
import { createSupabaseBrowser } from "@/lib/supabase/browser";
import { Tables } from "@/lib/types/supabase";
import { useQuery } from "@tanstack/react-query";

const initCourses: Tables<"courses">[] = [{
    classroom_code: null,
    created_at: "",
    current_enrollment: null,
    end_date: null,
    enrollment_limit: null,
    id: 0,
    label: null,
    meeting_schedule: null,
    start_date: null,
    status: null,
    subject_id: null,
    teacher_id: null,
    type: null,
    updated_at: null,
    visibility: null
}]

export function useCourses() {
    return useQuery({
        queryKey: ["courses"],
        _optimisticResults: "optimistic",
        queryFn: async () => {
            const supabase = createSupabaseBrowser();
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                // fetch labs info
                const { data: labs } = await supabase.from("courses").select("*");
                return labs as Tables<"courses">[];
            }
            return initCourses;
        }
    })
}