"use client";
import { createSupabaseBrowser } from "@/lib/supabase/browser";
import { useQuery } from "@tanstack/react-query";
const initUser = {
    created_at: "",
    display_name: "",
    email: "",
    id: "",
    image_url: "",
    labAt: 0,
    noIdentificador: "",
    updated_at: "",
}
export function useUser() {
    return useQuery({
        queryKey: ["user"],
        _optimisticResults: "optimistic",
        queryFn: async () => {
            const supabase = createSupabaseBrowser();
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                // fetch user info
                const { data: _user } = await supabase.from("users_profile").select("*").eq("id", user.id).single();
                return _user;
            }
            return initUser;
        }
    })
}