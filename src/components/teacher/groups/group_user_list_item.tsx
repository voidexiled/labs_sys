import { Tables } from "@/lib/types/supabase"

export const GroupUserListItem = ({ student, user }: { student: Tables<"courses_students">, user: Tables<"users"> }) => {
    return (
        <div key={student.id} className="cursor-pointer h-12 w-full px-4 py-2 bg-accent/40 flex flex-row items-center justify-between rounded-sm text-sm tracking-wider shadow-medium border relative hover:bg-accent/80 transition-all text-muted-foreground text">
            <span>{user.display_name}</span>
        </div>
    )
}

