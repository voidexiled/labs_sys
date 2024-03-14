"use client";
import { useLabs } from "@/store/labs"
import { LaboratoryItem } from "./laboratory-item"
import { ScrollArea } from "./ui/scroll-area"
import { Suspense, useState } from "react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import type { Laboratory } from "@/env";
export const LaboratoriesList = () => {
    const { laboratories } = useLabs()
    const [filteredLaboratories, setFilteredLaboratories] = useState([...laboratories])


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
                labs0 = laboratories.filter((lab) => lab.is_busy === false || lab.is_busy === true)
            } else if (value === "notbusy") {
                labs0 = laboratories.filter((lab) => lab.is_busy === false)

            } else if (value === "busy") {
                labs0 = laboratories.filter((lab) => lab.is_busy === true)
            }
            // labs0.
            labs = merge(labs, labs0);
        }
        setFilteredLaboratories(labs);
    }
    return (

        <div className="">
            <div className="flex flex-row w-full mb-4 rounded-md px-2 gap-1 py-1">
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



            </div>
            <ScrollArea className="h-[600px]">

                {
                    filteredLaboratories.map((lab) => (
                        <Suspense key={lab.lab_id} fallback={<div>loading...</div>}>
                            <LaboratoryItem lab={lab} />
                        </Suspense>
                    ))
                }
                {/* <LaboratoryItem />
                <LaboratoryItem />
                <LaboratoryItem />
                <LaboratoryItem />
                <LaboratoryItem />
                <LaboratoryItem />
                <LaboratoryItem /> */}
            </ScrollArea>
        </div>

    )
}