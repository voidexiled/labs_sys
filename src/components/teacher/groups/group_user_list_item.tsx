import { Tables } from "@/lib/types/supabase"

export const GroupUserListItem = ({ student, user }: { student: Tables<"courses_students">, user: Tables<"users"> }) => {
    return (
        <div key={student.id}>
            <span>{user.display_name} - {user.email} - {user.no_identificador}</span>
        </div>
    )
}