import Search from "@/components/users/search-input"
import { Button } from "@nextui-org/react"
import { AssignmentRegisterSelect } from "./assignment-register-select"
import { Tables } from "@/lib/types/supabase"

export const AssignmentsListHeader = ({ allAssignments, refetch, unit }: { refetch: () => void, unit: Tables<"units">, allAssignments?: Tables<"assignments">[] }) => {

    return (
        <div className="flex flex-row py-3 text-lg gap-2 justify-center md:justify-between items-center w-full flex-wrap">
            <div className="flex flex-row gap-2 flex-grow md:flex-grow-0">
                <AssignmentRegisterSelect assignments={allAssignments!} refetch={refetch} unit={unit} />

            </div>

            <div className="flex flex-row gap-2 flex-grow md:flex-grow-0">
                <Search className="w-full md:w-[293px]" placeholder="Buscar..." />
            </div>

        </div>
    )
}