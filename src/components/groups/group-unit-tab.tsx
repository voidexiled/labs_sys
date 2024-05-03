"use client"

import { useAssignmentsByUnit } from "@/hooks/teacher/useAssignmentsByUnit";
import { GroupAdd } from "@/icons/group-add";
import { Tables } from "@/lib/types/supabase";
import { cn } from "@/lib/utils";
import { Button, Skeleton, Spinner, Tab } from "@nextui-org/react";
import { AnimatePresence, motion } from "framer-motion";
import { CloudDownload, Download, DownloadIcon, SidebarClose } from "lucide-react";
import { useEffect, useState } from "react";
import { AssignmentItem } from "./units/assignments/assignment-item";
import { ExitIcon } from "@radix-ui/react-icons";
import { ScrollArea } from "../ui/scroll-area";


export const GroupUnitTab = ({ unit }: { unit: Tables<"units"> }) => {
    const [isRegisteringAssignments, setIsRegisteringAssignments] = useState(false)
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

            className={cn(" flex-shrink relative w-full h-full flex flex-col p-6 bg-background/80 shadow-[0px_9px_20px] shadow-black/5 rounded-lg border dark:border-none overflow-hidden")}
        >


            {
                isFetchingAssignments ? (
                    <div className="w-full h-full flex justify-center items-center"><Spinner label="Cargando..." size="lg"></Spinner>
                    </div>
                ) : (
                    assignments && assignments.length > 0 ? assignments.map((assignment) => {
                        return (
                            <>
                                <AssignmentItem key={assignment.id} assignment={assignment} />
                                <AssignmentItem key={assignment.id} assignment={assignment} />
                                <AssignmentItem key={assignment.id} assignment={assignment} />
                                <AssignmentItem key={assignment.id} assignment={assignment} />
                                <AssignmentItem key={assignment.id} assignment={assignment} />
                                <AssignmentItem key={assignment.id} assignment={assignment} />
                                <AssignmentItem key={assignment.id} assignment={assignment} /><AssignmentItem key={assignment.id} assignment={assignment} />
                                <AssignmentItem key={assignment.id} assignment={assignment} />
                            </>
                        )
                    }) : (
                        <div className="w-full h-full flex flex-col justify-center items-center text-2xl md:text-3xl text-center align-middle text-muted-foreground gap-4 ">
                            <span>
                                No se encontraron practicas.
                            </span>
                            <Button variant="light" color="primary" size="sm"
                                onClick={() => {
                                    setIsRegisteringAssignments(true)
                                }}

                            >
                                <CloudDownload size={18} />
                                Cargar practicas

                            </Button>
                        </div>

                    )
                )
            }


        </motion.div>
    )
}