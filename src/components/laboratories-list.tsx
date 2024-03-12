"use client";
import { useLabs } from "@/store/labs"
import { LaboratoryItem } from "./laboratory-item"
import { ScrollArea } from "./ui/scroll-area"
export const LaboratoriesList = () => {
    const { laboratories } = useLabs()
    return (

        <div className="">
            <ScrollArea className="h-[600px]">
                {
                    laboratories.map((lab) => (
                        <LaboratoryItem key={lab.lab_id} lab={lab} />
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