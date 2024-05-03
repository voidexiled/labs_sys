"use client"

import { Tables } from "@/lib/types/supabase"
import { motion } from "framer-motion"
import { AssignmentsList } from "./assignments/assignments-list";
import { cn } from "@/lib/utils";

type Props = {
    course?: Tables<"courses">;
    unit?: Tables<"units">;
    assignments?: Tables<"assignments">[];
    allAssignments?: Tables<"assignments">[];
    className?: string;
    children?: React.ReactNode;
}

export const GroupUnitContainer = ({ course, unit, assignments, allAssignments, className, children }: Props) => {
    return (
        <motion.div
            className={cn("flex flex-col items-start justify-start w-full h-full px-6 py-5 bg-card text-card-foreground", className)}
        >
            {
                children ??
                <AssignmentsList unit={unit!} assignments={assignments!} allAssignments={allAssignments} />
            }
        </motion.div>
    )
}