"use server";
import { MainWrapper } from "@/components/main-wrapper";
import { MainWrapperContent } from "@/components/main-wrapper-content";
import { MainWrapperHeader } from "@/components/main-wrapper-header";
import { verifyRoleRedirect } from "@/app/auth-server-action/actions";

export default async function EntregasPage() {
    await verifyRoleRedirect([4]);


    return (<MainWrapper>
        <MainWrapperHeader title="Entregas" />
        <MainWrapperContent>
            <></>
        </MainWrapperContent>

    </MainWrapper>
    );


}