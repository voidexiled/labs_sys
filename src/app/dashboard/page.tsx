"use server"

import readUserSession from "@/lib/actions";
import createSupabaseServer from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { verifyIsNotLoggedIn, verifyRoleRedirect } from "../auth-server-action/actions";

export default async function DashboardPage() {

    await verifyRoleRedirect();

    return (
        <>


        </>
    );
}
