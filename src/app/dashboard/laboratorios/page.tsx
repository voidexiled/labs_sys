'use server';
import { Filters } from "@/components/filters";
import { LaboratoriesFilters } from "@/components/laboratories/laboratories-filters.tsx";
import LaboratoriesList from "@/components/laboratories/laboratories-list";
import { MainWrapper } from "@/components/main-wrapper";
import { MainWrapperContent } from "@/components/main-wrapper-content";
import { MainWrapperHeader } from "@/components/main-wrapper-header";
import readUserSession from "@/lib/actions";
import { redirect } from "next/navigation";
export default async function LaboratoriesPage({ searchParams }: { searchParams?: { q?: string, status?: string, subject?: string, teacher?: string, page?: string } }) {
    const query = searchParams?.q || '';
    const status = searchParams?.status || '';
    const subject = searchParams?.subject || '';
    const teacher = searchParams?.teacher || '';
    const currentPage = Number(searchParams?.page) || 1;

    const { data: { user } } = await readUserSession();

    if (!user) {
        return redirect("/login");
    }


    return (
        <MainWrapper>

            <MainWrapperHeader title="Laboratorios" />
            <MainWrapperContent>
                <LaboratoriesFilters />
                <LaboratoriesList q={query} status={status} subject={subject} teacher={teacher} currentPage={currentPage} />
            </MainWrapperContent>
        </MainWrapper>


    )
}