'use client';
import { LaboratoriesList } from "@/components/laboratories-list";
import { MainWrapper } from "@/components/main-wrapper";
import { MainWrapperContent } from "@/components/main-wrapper-content";
import { MainWrapperHeader } from "@/components/main-wrapper-header";
import { Retriever } from "@/components/retriever/retriever";
import { useLabs } from "@/store/labs";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect } from "react";

export default function LaboratoriesPage() {
    const { setLaboratories } = useLabs();
    const supabase = createClientComponentClient();

    useEffect(() => {
        const getData = async () => {
            const { data, error } = await supabase
                .from("laboratories")
                .select("*");
            if (error) {
                console.error(error);
            } else {

                setLaboratories(data);
            }
        }
        getData();
        /*
        TODO: LOAD DATA FROM
            - LABS
            - CLIENTS
            - TYPES OF CLIENTS
            - SUBJECTS
        */



    }, [])

    return (
        <MainWrapper>

            <MainWrapperHeader title="Laboratorios" />
            <MainWrapperContent>
                <LaboratoriesList />
            </MainWrapperContent>
        </MainWrapper>


    )
}