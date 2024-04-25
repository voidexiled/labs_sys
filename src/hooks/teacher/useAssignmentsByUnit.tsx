"use client";
import { createSupabaseBrowser } from "@/lib/supabase/browser";
import { Tables } from "@/lib/types/supabase";
import { useQuery } from "@tanstack/react-query";

const initAssignments: Tables<"assignments">[] = [{
    id: 0,
    created_at: "",
    updated_at: "",
    description: "",
    end_date: "", // quitar
    file_name: "",
    grade_value: 0, // quitar
    title: "",
    unit_id: 0,
}]

export function useAssignmentsByUnit({ unit_id }: { unit_id?: number }) {
    return useQuery({
        queryKey: ["assignments_" + unit_id],
        _optimisticResults: "optimistic",
        queryFn: async () => {
            if (!unit_id) {
                return
            }
            const supabase = createSupabaseBrowser();
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                // fetch practices info
                const { data: assignments } = await supabase.from("assignments").select("*").eq("unit_id", unit_id);
                return assignments as Tables<"assignments">[];
            }
            return initAssignments;
        }
    })
}