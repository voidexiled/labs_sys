"use client"

import { useAssignmentsByUnit } from "@/hooks/teacher/useAssignmentsByUnit";
import { GroupAdd } from "@/icons/group-add";
import { Tables } from "@/lib/types/supabase";
import { cn } from "@/lib/utils";
import { Button, Skeleton, Spinner, Tab } from "@nextui-org/react";
import { motion } from "framer-motion";
import { Download, DownloadIcon } from "lucide-react";
import { useEffect } from "react";

export const GroupUnitTab = ({ unit }: { unit: Tables<"units"> }) => {
    const { isFetching: isFetchingAssignments, data: assignments } = useAssignmentsByUnit({ unit_id: unit.id })


    useEffect(() => {
        console.log("assignments --", assignments)
        console.log("assignments", assignments?.length)
    }, [assignments])
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}

            className={cn("w-full h-full flex flex-col gap-4 p-6 bg-background/80 shadow-[0px_9px_20px] shadow-black/5 rounded-lg border dark:border-none")}
        >
            {
                isFetchingAssignments ? (
                    <div className="w-full h-full flex justify-center items-center"><Spinner label="Cargando..." size="lg"></Spinner>
                    </div>
                ) : (
                    assignments && assignments.length > 0 ? assignments.map((assignment) => {
                        return (
                            <div key={assignment.id}
                                className="h-12  px-4 py-1 bg-accent/40 flex flex-row items-center justify-between rounded-sm text-sm border dark:border-none w-[460px]">
                                <span>
                                    {assignment.title}
                                </span>

                                <Button variant="solid"
                                    size="sm" color="primary" className="flex flex-row gap-3 cursor-pointer">
                                    <span>Descargar</span>
                                    <Download size="18" />
                                </Button>

                            </div>
                        )
                    }) : (
                        <div className="w-full h-full flex flex-col justify-center items-center text-2xl md:text-3xl text-center align-middle text-muted-foreground gap-4 ">
                            <span>
                                No se encontraron practicas.
                            </span>
                            <Button variant="shadow" color="primary" size="md" >
                                Subir practica
                            </Button>
                        </div>

                    )
                )
            }

        </motion.div>
    )
}