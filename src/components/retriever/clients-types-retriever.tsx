"use client";
import { useClients } from "@/store/clients";
import { useClientsTypes } from "@/store/clients_types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useEffect } from "react";

export const ClientsTypesRetriever = () => {
    const { setTypes } = useClientsTypes();
    const supabase = createClientComponentClient();

    useEffect(() => {
        const getData = async () => {
            const { data, error } = await supabase
                .from("clients_types")
                .select("*");
            if (error) {
                console.error("Error Types get: // " + error);
            } else {
                console.info("Types data: \\ " + data);
                setTypes(data);
            }
            (error?.message)
        }
        getData();
    }, []);

    return (
        <>hola</>
    )
}