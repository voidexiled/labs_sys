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
    syllabus_id: 0,
    units: 0,
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