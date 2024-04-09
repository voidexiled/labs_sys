"use client";

import { MainWrapper } from "@/components/main-wrapper";
import { MainWrapperContent } from "@/components/main-wrapper-content";
import { MainWrapperHeader } from "@/components/main-wrapper-header";
import { useUsers } from "@/hooks/useUsers";

export default function UserDetails({ params }: { params: { userId: string } }) {
    const { data: users, isFetching } = useUsers();

    if (!users) return <div>Error...</div>;

    const user = users.find((u) => u.id === params.userId);



    return (

        <MainWrapper>
            <MainWrapperHeader title={user?.display_name || "Cargando..."}>

            </MainWrapperHeader>
            <MainWrapperContent>
                <></>
            </MainWrapperContent>
        </MainWrapper>
    )
}