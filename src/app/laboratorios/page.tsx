import { LaboratoriesList } from "@/components/laboratories-list";
import { MainWrapper } from "@/components/main-wrapper";
import { MainWrapperContent } from "@/components/main-wrapper-content";
import { MainWrapperHeader } from "@/components/main-wrapper-header";

export default function LaboratoriesPage() {



    return (
        <MainWrapper>
            <MainWrapperHeader title="Laboratorios" />
            <MainWrapperContent>
                <LaboratoriesList />
            </MainWrapperContent>
        </MainWrapper>


    )
}