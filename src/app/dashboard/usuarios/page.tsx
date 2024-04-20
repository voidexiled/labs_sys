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
import { UsersFilters } from "@/components/users/users-filters";




export default async function UsersPage({ searchParams }: { searchParams?: { q?: string, role?: string, status?: string, page?: string } }) {
    const query = searchParams?.q || '';
    const role = searchParams?.role || '';
    const status = searchParams?.status || '';
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
                {/* <Filters page="users" tabs={roles as Tables<"user_roles">[]} /> */}

                <UsersFilters />
                <UsersList q={query} role={role} status={status} currentPage={currentPage} />
            </MainWrapperContent>
        </MainWrapper>)
}