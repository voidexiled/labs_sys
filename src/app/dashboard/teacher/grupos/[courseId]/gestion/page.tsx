"use server"
import { GroupUserList } from "@/components/teacher/groups/group_user_list";
import createSupabaseServer from "@/lib/supabase/server";


// switch to useQueryClient hook . prefetchQuery
// So can load easy

export default async function GestionPage({ params }: { params: { courseId: number } }) {
    const supabase = await createSupabaseServer();
    const { data: courseStudentsData, error: ECourseStudents } = await supabase.from("courses_students").select("*").eq("course_id", params.courseId);
    const { data: usersData, error: EUsers } = await supabase.from("users").select("*").eq("role_id", 5); // students

    if (ECourseStudents || EUsers) {
        console.log(ECourseStudents, EUsers)
        return <></>
    }
    if (!courseStudentsData || !usersData) {
        return <></>
    }

    return (
        <div className="flex flex-col items-start justify-start w-full h-full px-6 py-5 bg-card text-card-foreground">
            <GroupUserList students={courseStudentsData} users={usersData} />

        </div>
    )
}