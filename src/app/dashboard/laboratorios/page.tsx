'use server';
import { Filters } from "@/components/filters";
import LaboratoriesList from "@/components/laboratories/laboratories-list";
import { MainWrapper } from "@/components/main-wrapper";
import { MainWrapperContent } from "@/components/main-wrapper-content";
import { MainWrapperHeader } from "@/components/main-wrapper-header";
import readUserSession from "@/lib/actions";
import { redirect } from "next/navigation";
export default async function LaboratoriesPage({ searchParams }: { searchParams?: { q?: string, status?: string, page?: string } }) {
    const query = searchParams?.q || '';
    const status = searchParams?.status || '';
    const currentPage = Number(searchParams?.page) || 1;

    const { data: { user } } = await readUserSession();

    if (!user) {
        return redirect("/login");
    }


    return (
        <MainWrapper>

            <MainWrapperHeader title="Laboratorios" />
            <MainWrapperContent>
                <Filters page="laboratories" tabs={["busy", "idle"]} />
                <LaboratoriesList q={query} status={status} currentPage={currentPage} />
            </MainWrapperContent>
        </MainWrapper>


    )
}