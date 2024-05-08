"use client"

import { Tables } from "@/lib/types/supabase";
import { GroupUserListItem } from "./group_user_list_item";

export const GroupUserList = ({ students, users }: { students: Tables<"courses_students">[], users: Tables<"users">[] }) => {

    return (
        <div className="flex flex-col w-full">
            {students && students.map(async (course_student) => {
                const user = users.find(user => user.id === course_student.student_id)
                if (!user) {
                    return null;
                }
                return (
                    <GroupUserListItem key={user.id} student={course_student} user={user} />
                )
            })}
        </div>
    )
}