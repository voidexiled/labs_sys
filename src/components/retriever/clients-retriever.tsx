"use client";
import { useClients } from "@/store/clients";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useEffect } from "react";

export const ClientsRetriever = () => {
    const { setClients } = useClients();
    const supabase = createClientComponentClient();

    useEffect(() => {
        const getData = async () => {
            const { data, error } = await supabase
                .from("clients")
                .select("*");
            if (error) {
                console.error("Error: Clients get: // " + error);
            } else {
                console.info("Clients data: \\ " + data);
                setClients(data);
            }
        }
        getData();
    }, []);

    return (
        <>hola</>
    )
}