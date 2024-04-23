"use server";
import { MainWrapper } from "@/components/main-wrapper";
import { MainWrapperContent } from "@/components/main-wrapper-content";
import { MainWrapperHeader } from "@/components/main-wrapper-header";
import { verifyIsNotLoggedIn, verifyRoleRedirect } from "@/app/auth-server-action/actions";
// import { BodyPanel } from "@/components/providers/panel/body-test";
export default async function PanelPage() {
    await verifyRoleRedirect([1, 2]);


    return (<MainWrapper>
        <MainWrapperHeader title="Panel de administración" />
        <MainWrapperContent>
            <></>
        </MainWrapperContent>

    </MainWrapper>
    );


}