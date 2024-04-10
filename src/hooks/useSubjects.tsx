"use client";
import { createSupabaseBrowser } from "@/lib/supabase/browser";
import { useQuery } from "@tanstack/react-query";
const initSubjects = [{
    id: 0,
    label: ""
}]
export function useSubjects() {
    return useQuery({
        queryKey: ["subjects"],
        _optimisticResults: "optimistic",
        queryFn: async () => {
            const supabase = createSupabaseBrowser();
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                // fetch user info
                const { data: subjects } = await supabase.from("subjects").select("*");
                return subjects;
            }
            return initSubjects;
        }
    })
}