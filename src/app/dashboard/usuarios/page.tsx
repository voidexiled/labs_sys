"use server"
import UsersList from "@/components/users/users-list";
import { MainWrapper } from "@/components/main-wrapper";
import { MainWrapperContent } from "@/components/main-wrapper-content";
import { MainWrapperHeader } from "@/components/main-wrapper-header";
import { useUsers } from "@/hooks/useUsers";
import readUserSession from "@/lib/actions";
import { redirect } from "next/navigation";




export default async function UsersPage() {
    const { data: { user } } = await readUserSession();

    if (!user) {
        return redirect("/login");
    }


    return (<MainWrapper>
        <MainWrapperHeader title="Usuarios" />
        <MainWrapperContent>
            <UsersList />
        </MainWrapperContent>

    </MainWrapper>)
}