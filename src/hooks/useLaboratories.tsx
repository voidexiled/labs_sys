"use client";
import { createSupabaseBrowser } from "@/lib/supabase/browser";
import { useQuery } from "@tanstack/react-query";

const initLabs = [{
    busyBy: 0,
    capacity: 0,
    id: 0,
    isBusy: false,
    label: "",
    subjectId: 0,
}]

export function useLaboratories() {
    return useQuery({
        queryKey: ["laboratories"],
        queryFn: async () => {
            const supabase = createSupabaseBrowser();
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                // fetch labs info
                const { data: labs } = await supabase.from("laboratories").select("*");
                return labs;
            }
            return initLabs;
        }
    })
}