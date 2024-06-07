"use server";

import { getStudentsCourses } from "@/app/actions/students";
import { MainWrapper } from "@/components/main-wrapper";
import { MainWrapperContent } from "@/components/main-wrapper-content";
import { MainWrapperHeader } from "@/components/main-wrapper-header";
import { StudentGroupsList } from "@/components/students/StudentGroupsList";
import createSupabaseServer from "@/lib/supabase/server";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

export default async function StudentGruposPage() {
    const queryClient = new QueryClient();

    const supabase = await createSupabaseServer();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) { return <></> }

    await queryClient.prefetchQuery({
        queryKey: ['groups', user.id],
        queryFn: getStudentsCourses
    })

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <MainWrapper>
                <MainWrapperHeader title="Grupos" />
                <MainWrapperContent>
                    <StudentGroupsList user={user} />
                </MainWrapperContent>
            </MainWrapper>
        </HydrationBoundary>
    )
}