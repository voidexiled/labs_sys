"use client"
import { ClientsList } from "@/components/clients-list";
import { MainWrapper } from "@/components/main-wrapper";
import { MainWrapperContent } from "@/components/main-wrapper-content";
import { MainWrapperHeader } from "@/components/main-wrapper-header";
import { Client } from "@/env";
import { useAuth } from "@/store/auth";
import { useClients } from "@/store/clients";
import { useUser } from "@nextui-org/react";
import { createClientComponentClient, createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";

import { useEffect, useState } from "react";



export default function ClientsPage() {
    // TODO: SAVE A STATE WITH LIST OF AUTH USERS TO BE USED IN CLIENT COMPONENTS
    // const supabase = createServerComponentClient({ cookies }, {
    //     supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
    //     supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY,
    // });
    const { clients, setClients } = useClients();

    const supabase = createClientComponentClient();

    useEffect(() => {
        const getClients = async () => {
            // Fetch Clients from supabase
            await supabase.from("clients").select("*").then((data) => {
                if (data.data) {
                    if (clients !== data.data) {

                        setClients(data.data);
                    }
                }
            });
        }
        getClients();

    }, []);

    // console.log(users);

    return (<MainWrapper>
        <MainWrapperHeader title="Clientes" />
        <MainWrapperContent>
            <ClientsList />
        </MainWrapperContent>

    </MainWrapper>)
}