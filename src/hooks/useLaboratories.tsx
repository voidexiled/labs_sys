"use client";
import { createSupabaseBrowser } from "@/lib/supabase/browser";
import { Tables } from "@/lib/types/supabase";
import { useQuery } from "@tanstack/react-query";

const initLabs: Tables<"laboratories">[] = [{
    busy_by: "",
    capacity: 0,
    id: 0,
    label: "",
    subject_id: 0,
    updated_at: "",

}]

export function useLaboratories() {
    return useQuery({
        queryKey: ["laboratories"],
        _optimisticResults: "optimistic",
        queryFn: async () => {
            const supabase = createSupabaseBrowser();
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                // fetch labs info
                const { data: labs } = await supabase.from("laboratories").select("*");
                return labs as Tables<"laboratories">[];
            }
            return initLabs;
        }
    })
}