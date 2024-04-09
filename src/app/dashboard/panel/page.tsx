"use server";
import { MainWrapper } from "@/components/main-wrapper";
import { MainWrapperContent } from "@/components/main-wrapper-content";
import { MainWrapperHeader } from "@/components/main-wrapper-header";
import { redirect } from "next/navigation";
import readUserSession from "@/lib/actions";
// import { BodyPanel } from "@/components/providers/panel/body-test";
export default async function PanelPage() {
    const { data: { user } } = await readUserSession();

    if (!user) {
        return redirect("/login");
    }



    return (<MainWrapper>
        <MainWrapperHeader title="Panel de administración" />
        <MainWrapperContent>
            {/* <BodyPanel /> */}
            <></>
        </MainWrapperContent>

    </MainWrapper>
    );


}