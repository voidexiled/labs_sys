import { Tables } from "@/lib/types/supabase"

export const GroupUserListItem = ({ student, user }: { student: Tables<"courses_students">, user: Tables<"users"> }) => {
    return (
        <div key={student.id} className="cursor-pointer h-16 w-full px-4 py-2 bg-accent/40 flex flex-row items-center justify-between rounded-sm text-sm  tracking-wider shadow-medium border relative hover:bg-accent/80 transition-all">
            <span>{user.display_name}</span>
        </div>
    )
}