import { Tables } from "@/lib/types/supabase"
import { motion } from "framer-motion"
import { AssignmentItem } from "./assignment-item"
import { AssignmentsListHeader } from "./assignments-list-header"
import { UploadAssignmentButton } from "./upload-assignment-button"
import { useQuery } from "@tanstack/react-query"
import { createSupabaseBrowser } from "@/lib/supabase/browser"
export const AssignmentsList = ({ unit, assignments: ass, allAssignments }: { unit: Tables<"units">, assignments?: Tables<"assignments">[], allAssignments?: Tables<"assignments">[] }) => {

    const { data: assignments, refetch } = useQuery({
        queryKey: ['assignments', unit.id], queryFn: async () => {
            const supabase = createSupabaseBrowser();

            // fetch practices info
            const { data: assignments } = await supabase.from("assignments").select("*").eq("unit_id", unit.id);
            return assignments as Tables<"assignments">[]

        }
    })

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.08 }}
            className="flex flex-col items-start justify-start w-full h-full">
            {

                assignments && (assignments.length > 0
                    ? (
                        <>
                            <AssignmentsListHeader allAssignments={allAssignments} refetch={refetch} unit={unit}>
                            </AssignmentsListHeader>

                            <div className="flex flex-col gap-3 w-full">
                                <UploadAssignmentButton refetch={refetch} unitId={unit.id} />
                                {
                                    assignments.map((assignment) => {
                                        return (
                                            <AssignmentItem key={assignment.id} assignment={assignment} refetch={refetch} />

                                        )
                                    })
                                }

                            </div>
                        </>
                    )
                    : (
                        <>
                            <AssignmentsListHeader allAssignments={allAssignments} refetch={refetch} unit={unit}>
                            </AssignmentsListHeader>
                            <div className="w-full h-full flex flex-col items-center justify-center gap-3">

                                <span className="text-muted-foreground text-2xl">
                                    No hay practicas.
                                </span>
                                <UploadAssignmentButton refetch={refetch} unitId={unit.id} isThumb />
                            </div>
                        </>
                    )
                )

            }
        </motion.div>
    )
}