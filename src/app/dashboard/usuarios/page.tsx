"use server"
import UsersList from "@/components/users/users-list";
import { MainWrapper } from "@/components/main-wrapper";
import { MainWrapperContent } from "@/components/main-wrapper-content";
import { MainWrapperHeader } from "@/components/main-wrapper-header";
import readUserSession from "@/lib/actions";
import { redirect } from "next/navigation";

import { Filters } from "@/components/filters";
import createSupabaseServer from "@/lib/supabase/server";
import { Tables } from "@/lib/types/supabase";




export default async function UsersPage({ searchParams }: { searchParams?: { q?: string, role?: string, page?: string } }) {
    const query = searchParams?.q || '';
    const role = searchParams?.role || '';
    const currentPage = Number(searchParams?.page) || 1;
    const supabase = await createSupabaseServer();
    const { data: roles } = await supabase.from("user_roles").select("*");
    const { data: { user } } = await readUserSession();

    if (!user) {
        return redirect("/login");
    }


    return (
        <MainWrapper>
            <MainWrapperHeader title="Usuarios" />
            <MainWrapperContent>
                <Filters page="users" tabs={roles as Tables<"user_roles">[]} />
                <UsersList q={query} role={role} currentPage={currentPage} />
            </MainWrapperContent>
        </MainWrapper>)
}