"use server";
import { MainWrapper } from "@/components/main-wrapper";
import { MainWrapperContent } from "@/components/main-wrapper-content";
import { MainWrapperHeader } from "@/components/main-wrapper-header";
import { verifyRoleRedirect } from "@/app/auth-server-action/actions";
import createSupabaseServer from "@/lib/supabase/server";
import readUserSession from "@/lib/actions";
import GroupCreator from "@/components/creators/group/group-creator";
import { Tables } from "@/lib/types/supabase";
import { GroupManager } from "@/components/creators/group/group-manager";

export default async function GruposPage({ searchParams }: { searchParams?: { q?: string, status?: string, subject?: string, teacher?: string, page?: string } }) {
    const query = searchParams?.q || '';
    const status = searchParams?.status || '';
    const subject = searchParams?.subject || '';
    const teacher = searchParams?.teacher || '';
    const page = Number(searchParams?.page) || 1;
    await verifyRoleRedirect([3]);

    const supabase = await createSupabaseServer();

    const { data: courses, error: GError } = await supabase.from("courses").select("*");
    const { data: students, error: SError } = await supabase.from("users").select("*").eq("role_id", 5);
    const { data: courses_students, error: CSError } = await supabase.from("courses_students").select("*");

    if (!courses || !students || !courses_students) {
        return <></>
    }
    return (
        <MainWrapper>
            <MainWrapperHeader title="Administración de grupos" />
            <MainWrapperContent>
                <GroupManager searchParams={{ query, status, subject, teacher, page }} courses={courses} students={students} courses_students={courses_students} />
            </MainWrapperContent>

        </MainWrapper>
    );


}