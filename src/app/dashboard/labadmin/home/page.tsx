"use server";
import { MainWrapper } from "@/components/main-wrapper";
import { MainWrapperContent } from "@/components/main-wrapper-content";
import { MainWrapperHeader } from "@/components/main-wrapper-header";
import { redirect } from "next/navigation";
import readUserSession from "@/lib/actions";
import createSupabaseServer, { createSupabaseAdmin } from "@/lib/supabase/server";
import { verifyRoleRedirect } from "@/app/auth-server-action/actions";

// import { BodyPanel } from "@/components/providers/panel/body-test";
export default async function HomePage() {
    const { data: { user } } = await readUserSession();
    await verifyRoleRedirect([3]);
    if (!user) { return <></> }
    const supabase = await createSupabaseServer();


    const { data: _user } = await supabase.from("users").select("*").eq("id", user?.id).single();

    return (
        <MainWrapper>
            <MainWrapperHeader title={"Bienvenido Jefe de Laboratorio  \"" + _user?.display_name + "\""} />
            <MainWrapperContent>
                <></>
            </MainWrapperContent>

        </MainWrapper>
    );


}