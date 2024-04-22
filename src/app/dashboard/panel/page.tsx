"use server";
import { MainWrapper } from "@/components/main-wrapper";
import { MainWrapperContent } from "@/components/main-wrapper-content";
import { MainWrapperHeader } from "@/components/main-wrapper-header";
import { redirect } from "next/navigation";
import readUserSession from "@/lib/actions";
import createSupabaseServer, { createSupabaseAdmin } from "@/lib/supabase/server";
import { FormEvent } from "react";
import axios from "axios";
// import { BodyPanel } from "@/components/providers/panel/body-test";
export default async function PanelPage() {
    const { data: { user } } = await readUserSession();

    if (!user) {
        return redirect("/login");
    }
    const admin = await createSupabaseAdmin();
    const supabase = await createSupabaseServer();
    const authUsers = await admin.auth.admin.listUsers();
    const users = await supabase.from("users").select("*");
    // console.log("authUsers: ", authUsers.data.users);
    // console.log("users: ", users.data);


    return (<MainWrapper>
        <MainWrapperHeader title="Panel de administración" />
        <MainWrapperContent>
            <></>
        </MainWrapperContent>

    </MainWrapper>
    );


}