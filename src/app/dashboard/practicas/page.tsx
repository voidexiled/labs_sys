"use server";
import { MainWrapper } from "@/components/main-wrapper"
import { MainWrapperContent } from "@/components/main-wrapper-content"
import { MainWrapperHeader } from "@/components/main-wrapper-header"
import readUserSession from "@/lib/actions";
import { redirect } from "next/navigation";

export default async function PracticasPage() {
    const { data: { user } } = await readUserSession();

    if (!user) {
        return redirect("/login");
    }
    return (<MainWrapper>
        <MainWrapperHeader title="Practicas" />
        <MainWrapperContent>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla, ducimus porro vero quis error accusantium voluptas mollitia asperiores non magni quidem fuga nisi dicta sint, voluptatem vel natus accusamus odio?</p>
        </MainWrapperContent>

    </MainWrapper>)
}