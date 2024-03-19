'use client';
import { LaboratoriesList } from "@/components/laboratories-list";
import { MainWrapper } from "@/components/main-wrapper";
import { MainWrapperContent } from "@/components/main-wrapper-content";
import { MainWrapperHeader } from "@/components/main-wrapper-header";
import { Retriever } from "@/components/retriever/retriever";
import { useClients } from "@/store/clients";
import { useClientsTypes } from "@/store/clients_types";
import { useLabs } from "@/store/labs";
import { useSubjects } from "@/store/subjects";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect } from "react";

export default function LaboratoriesPage() {
    const { laboratories, setLaboratories } = useLabs();
    const { subjects, setSubjects } = useSubjects();
    const { clients, setClients } = useClients();
    const { types, setTypes } = useClientsTypes();
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
    useEffect(() => {

        const fetchData = async () => {

            // Fetch Subjects from supabase
            const { data, error } = await supabase.from("subjects").select("*")
            if (data) {
                setSubjects(data);
            }

            // Fetch Clients from supabase
            await supabase.from("clients").select("*").then((data) => {
                if (data.data) {
                    setClients(data.data);
                }
            });
            // Fetch Client Types from supabase
            await supabase.from("clients_types").select("*").then((data) => {
                if (data.data) {
                    setTypes(data.data);
                }
            });
            console.log("!!!! FETCHING ----")
            console.log("---Subjects: ", subjects);
            console.log("---Clients: ", clients);
            console.log("---Types: ", types);
            console.log("---- END FETCHING!!!!");
        }
        fetchData();
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