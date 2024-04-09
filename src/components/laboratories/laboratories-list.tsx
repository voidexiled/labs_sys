"use client";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Suspense, useEffect, useState } from "react";
import { ScrollArea } from "../ui/scroll-area";
import { LaboratoryItem } from "./laboratory-item";
// import type { Laboratory } from "@/env";

import { useLaboratories } from "@/hooks/useLaboratories";
import { useSubjects } from "@/hooks/useSubjects";
import { useUserRoles } from "@/hooks/useUserRoles";
import { useUsers } from "@/hooks/useUsers";
import { Tables } from "@/lib/types/supabase";
import { Input } from "../ui/input";
import { LaboratoriesListSkeleton } from "./skeletons/laboratories-list-skeleton";

export const LaboratoriesList = () => {
    // Fetching 
    const { isFetching: isFetchingLaboratories, data: laboratories } = useLaboratories();
    const { isFetching: isFetchingSubjects, data: subjects } = useSubjects();
    const { isFetching: isFetchingTypesUsers, data: types } = useUserRoles();
    const { isFetching: isFetchingUsers, data: users } = useUsers();

    const [searchQuery, setSearchQuery] = useState("");
    const [filteredLaboratories, setFilteredLaboratories] = useState(laboratories)
    const [filterBy, setFilterBy] = useState<string>("all");


    useEffect(() => {

        if (laboratories) {
            let filteredLabs = laboratories.filter((l) => true);
            if (searchQuery.length > 0) {
                const filtered = laboratories.filter((l) => l.label.toLowerCase().includes(searchQuery.toLowerCase()));
                filteredLabs = filtered as typeof laboratories;
            }
            if (filterBy === "all") {
                filteredLabs = filteredLabs;
            } else if (filterBy === "busy") {
                filteredLabs = filteredLabs.filter((l) => typeof l.busyBy === "string" && l.busyBy.length > 0);
            } else if (filterBy === "notbusy") {
                filteredLabs = filteredLabs.filter((l) => typeof l.busyBy !== "string" && typeof l.busyBy !== "number");
            }

            setFilteredLaboratories(filteredLabs as typeof laboratories)
        }

    }, [searchQuery, laboratories, filterBy])

    useEffect(() => {
        setFilteredLaboratories(laboratories)
    }, [laboratories])


    const merge = (arr1: Tables<"laboratories">[], arr2: Tables<"laboratories">[]) => {
        const newArr: Tables<"laboratories">[] = [...arr1];
        for (let i = 0; i < arr2.length; i++) {
            const item = arr2[i];
            if (newArr.includes(item)) continue;
            newArr.push(item);
        }
        return newArr;
    }


    if (!laboratories) return <></>
    if (!filteredLaboratories) return <></>
    return (

        <div className="">
            <div className="flex flex-row w-full mb-4 rounded-md gap-1 py-1 justify-between">
                <ToggleGroup
                    variant="outline" type="single" defaultValue="all"
                    onValueChange={(value: string) => {
                        setFilterBy(value);
                    }}>
                    {/* onValueChange={(value) => handleFilter(0, value)}> */}
                    <ToggleGroupItem value="all" className="font-normal" >
                        Todos
                    </ToggleGroupItem>
                    <ToggleGroupItem value="notbusy" className="font-normal">
                        Disponibles
                    </ToggleGroupItem>
                    <ToggleGroupItem value="busy" className="font-normal">
                        Ocupados
                    </ToggleGroupItem>


                </ToggleGroup>
                <ToggleGroup type="single" defaultValue="all">
                    {/* <Button variant="destructive" size="default">Reload <ReloadIcon className="ml-2 h-4 w-4" /> </Button> */}

                    <Input
                        className="w-80"

                        placeholder="Buscar laboratorio..."
                        value={searchQuery}

                        onChange={(e) => {
                            setSearchQuery(e.target.value);
                        }}
                    />
                </ToggleGroup>



            </div>
            <ScrollArea className="h-[600px] pr-8">
                {
                    isFetchingLaboratories || isFetchingSubjects || isFetchingTypesUsers || isFetchingUsers
                        ? <LaboratoriesListSkeleton len={filteredLaboratories.length} />
                        : filteredLaboratories.map((lab) => (
                            <Suspense key={lab.id} fallback={<div>loading...</div>}>
                                <LaboratoryItem lab={lab as Tables<"laboratories">} subjects={subjects as Tables<"subjects">[]} types={types as Tables<"user_roles">[]} users={users as Tables<"users_profile">[]} />

                            </Suspense>
                        ))

                }
            </ScrollArea>
        </div>

    )
}