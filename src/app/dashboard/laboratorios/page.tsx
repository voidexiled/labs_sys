'use server';
import { LaboratoriesList } from "@/components/laboratories/laboratories-list";
import { MainWrapper } from "@/components/main-wrapper";
import { MainWrapperContent } from "@/components/main-wrapper-content";
import { MainWrapperHeader } from "@/components/main-wrapper-header";
import readUserSession from "@/lib/actions";
import { redirect } from "next/navigation";
export default async function LaboratoriesPage() {
    const { data: { user } } = await readUserSession();

    if (!user) {
        return redirect("/login");
    }


    return (
        <MainWrapper>

            <MainWrapperHeader title="Laboratorios" />
            <MainWrapperContent>
                <LaboratoriesList />
            </MainWrapperContent>
        </MainWrapper>


    )
}