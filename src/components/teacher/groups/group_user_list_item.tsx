import { Tables } from "@/lib/types/supabase"
import { cn } from "@/lib/utils"
export const GroupUserListItem = ({ student, user }: { student: Tables<"courses_students">, user: Tables<"users"> }) => {
    return (
        <div key={student.id} className="cursor-pointer h-[72px] w-full px-4 py-2 bg-accent/40 flex flex-row items-center justify-between rounded-sm text-sm tracking-wider shadow-md border relative hover:bg-accent/80 transition-all text-muted-foreground text">
            <div className="flex flex-col gap-1  h-full grow">
                <span>{user.display_name}</span>
                <span className={cn("text-xs", student.assistance_type === "active" ? "text-success" : student.assistance_type === "inactive" ? "text-error" : "text-muted")}>
                    {student.assistance_type === "active" ? "Asistencia aprovatoria " : student.assistance_type === "inactive" ? "Asistencia no aprovatoria" : "Desertor"}
                </span>
            </div>
            <div className="flex flex-col gap-1 items-end">

            </div>
        </div>
    )
}

