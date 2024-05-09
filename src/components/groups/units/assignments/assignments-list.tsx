import { Tables } from "@/lib/types/supabase"
import { motion } from "framer-motion"
import { AssignmentItem } from "./assignment-item"
import { AssignmentsListHeader } from "./assignments-list-header"
import { UploadAssignmentButton } from "./upload-assignment-button"
import { useQuery } from "@tanstack/react-query"
import { createSupabaseBrowser } from "@/lib/supabase/browser"
export const AssignmentsList = ({ unit, assignments, refetch, allAssignments, course }: { unit: Tables<"units">, assignments?: Tables<"assignments">[], refetch: () => void, allAssignments?: Tables<"assignments">[], course: Tables<"courses"> }) => {




    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.08 }}
            className="flex flex-col items-start justify-start w-full h-full">
            {

                (assignments && unit && allAssignments && course) && (assignments.length > 0
                    ? (
                        <>
                            <AssignmentsListHeader allAssignments={allAssignments} refetch={refetch} unit={unit}>
                            </AssignmentsListHeader>

                            <div className="flex flex-col gap-3 w-full">
                                <UploadAssignmentButton refetch={refetch} unitId={unit.id} />
                                {
                                    assignments.sort((a, b) => b.id - a.id).map((assignment) => {
                                        return (
                                            <AssignmentItem key={assignment.id} assignment={assignment} refetch={refetch} unit={unit} course={course} />

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