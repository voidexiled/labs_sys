"use server";
import { MainWrapper } from "@/components/main-wrapper";
import { MainWrapperContent } from "@/components/main-wrapper-content";
import { MainWrapperHeader } from "@/components/main-wrapper-header";
import { verifyRoleRedirect } from "@/app/auth-server-action/actions";
import createSupabaseServer from "@/lib/supabase/server";
import readUserSession from "@/lib/actions";
import { GroupsList } from "@/components/groups/groups-list";
import { CoursesFilters } from "@/components/courses/courses-filters";

export default async function GruposPage() {
    await verifyRoleRedirect([4]);

    const supabase = await createSupabaseServer();
    const { data: { user } } = await readUserSession();

    return (<MainWrapper>
        <MainWrapperHeader title="Grupos" />
        <MainWrapperContent>
            {/* <CoursesFilters /> */}
            <GroupsList teacher_user={user} />
        </MainWrapperContent>

    </MainWrapper>
    );


}