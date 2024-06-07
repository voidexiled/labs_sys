"use server"
import { GroupUserList } from "@/components/teacher/groups/group_user_list";
import createSupabaseServer from "@/lib/supabase/server";
import type { Tables } from "@/lib/types/supabase";
import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";


// switch to useQueryClient hook . prefetchQuery
// So can load easy

export default async function GestionPage({ params }: { params: { courseId: number } }) {
    const queryClient = new QueryClient();



    await queryClient.prefetchQuery({
        queryKey: ['students_course', params.courseId],
        queryFn: async () => {
            const supabase = await createSupabaseServer();
            const { data, error } = await supabase.from("courses_students").select("*").eq("course_id", params.courseId);
            console.log("dataServer", data)
            if (data) {
                await queryClient.prefetchQuery({
                    queryKey: ['profiles_students', params.courseId],
                    queryFn: async () => {
                        const supabase = await createSupabaseServer();
                        const studentsIds = data?.map(student => student.student_id);
                        console.log("server studentsIds", studentsIds)
                        const { data: dataProfiles } = await supabase.from("users").select("*").in("id", studentsIds!).eq("role_id", 5);
                        return dataProfiles as Tables<"users">[];
                    }
                })
            }
            return data as Tables<"courses_students">[];
        }
    })




    return (
        <HydrationBoundary state={dehydrate(queryClient)}>

            <div className="flex flex-col items-start justify-start w-full h-full px-6 py-5">

                <GroupUserList courseId={params.courseId} />

            </div>
        </HydrationBoundary>
    )
}