"use client";
import { useLabs } from "@/store/labs"
import { LaboratoryItem } from "./laboratory-item"
import { ScrollArea } from "./ui/scroll-area"
import { Suspense, useEffect, useState } from "react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import type { Laboratory } from "@/env";
import { useSubjects } from "@/store/subjects";
import { useClients } from "@/store/clients";
import { useClientsTypes } from "@/store/clients_types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Button } from "./ui/button";

import { ReloadIcon } from "@radix-ui/react-icons";
import { Label } from "./ui/label";
import { Input } from "./ui/input";

export const LaboratoriesList = () => {
    const { laboratories, setLaboratories } = useLabs();
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredLaboratories, setFilteredLaboratories] = useState(laboratories)

    const supabase = createClientComponentClient();

    useEffect(() => {
        if (searchQuery.length > 0) {
            setFilteredLaboratories(laboratories.filter((lab) => lab.label.toLowerCase().includes(searchQuery.toLowerCase())))
        } else {
            setFilteredLaboratories(laboratories)
        }
    }, [searchQuery])





    useEffect(() => {
        setFilteredLaboratories(laboratories)
    }, [laboratories])


    const merge = (arr1: Laboratory[], arr2: Laboratory[]) => {
        const newArr: Laboratory[] = [...arr1];
        for (let i = 0; i < arr2.length; i++) {
            const item = arr2[i];
            if (newArr.includes(item)) continue;
            newArr.push(item);
        }
        return newArr;
    }


    const handleFilter = (type: number, value: string) => {
        let labs: Laboratory[] = []
        console.log("outside")
        if (value.length === 0) return;
        if (type === 0) {
            console.log("into")
            let labs0: Laboratory[] = [];
            if (value === "all") {
                console.log("all into")
                labs0 = laboratories.filter((lab) => lab.isBusy === false || lab.isBusy === true)
            } else if (value === "notbusy") {
                labs0 = laboratories.filter((lab) => lab.isBusy === false)

            } else if (value === "busy") {
                labs0 = laboratories.filter((lab) => lab.isBusy === true)
            }
            // labs0.
            labs = merge(labs, labs0);
        }
        setFilteredLaboratories(labs);
    }
    return (

        <div className="">
            <div className="flex flex-row w-full mb-4 rounded-md gap-1 py-1 justify-between">
                <ToggleGroup type="single" defaultValue="all"
                    onValueChange={(value) => handleFilter(0, value)}>
                    <ToggleGroupItem value="all" >
                        Todos
                    </ToggleGroupItem>
                    <ToggleGroupItem value="notbusy" >
                        Disponibles
                    </ToggleGroupItem>
                    <ToggleGroupItem value="busy">
                        Ocupados
                    </ToggleGroupItem>


                </ToggleGroup>
                <ToggleGroup type="single" defaultValue="all">
                    {/* <Button variant="destructive" size="default">Reload <ReloadIcon className="ml-2 h-4 w-4" /> </Button> */}
                    <Label htmlFor="search">Buscar</Label>
                    <Input
                        className="w-80"

                        placeholder="Laboratorio..."
                        value={searchQuery}

                        onChange={(e) => {
                            setSearchQuery(e.target.value);
                        }}
                    />
                </ToggleGroup>



            </div>
            <ScrollArea className="h-[600px] pr-8">

                {
                    filteredLaboratories.map((lab) => (
                        <Suspense key={lab.id} fallback={<div>loading...</div>}>
                            <LaboratoryItem lab={lab} />
                        </Suspense>
                    ))
                }

            </ScrollArea>
        </div>

    )
}