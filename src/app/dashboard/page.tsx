import { useAuth } from "@/store/auth";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
export default async function DashboardPage() {
    const supabase = createServerComponentClient({ cookies });

    const { data, error } = await supabase.auth.getUser()


    return (<>
        {
            data.user ? (
                <h1>{data.user.id}</h1>
            ) : <h1>{error?.message}</h1>
        }
    </>
    );


}