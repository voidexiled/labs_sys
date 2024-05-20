"use client"
import { createSupabaseBrowser } from "@/lib/supabase/browser";
import { Tables } from "@/lib/types/supabase"
import { useQuery } from "@tanstack/react-query"

import { GroupUserListItem } from "./group_user_list_item";
import { useEffect } from "react";
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button";
import { Link } from "lucide-react";

export const GroupUserList = ({ courseId }: { courseId: number }) => {

    const { data: courseStudents, error: errorCourseStudents, refetch: refetchCourseStudents } = useQuery({
        queryKey: ['students_course', courseId],
        queryFn: async () => {
            const supabase = createSupabaseBrowser();
            const { data } = await supabase.from("courses_students").select("*").eq("course_id", courseId);
            console.log("dataClient", data)
            return data as Tables<"courses_students">[];
        }
    })

    const { data: profilesStudents, error: errorProfilesStudents, refetch: refetchProfilesStudents } = useQuery({
        queryKey: ['profiles_students', courseId],
        queryFn: async () => {
            const supabase = createSupabaseBrowser();
            const studentsIds = courseStudents?.map(student => student.student_id);
            console.log("client studentsIds", studentsIds)
            const { data } = await supabase.from("users").select("*").in("id", studentsIds!).eq("role_id", 5);
            return data as Tables<"users">[];
        }
    })

    return (
        <motion.div className="flex flex-col w-full h-full justify-start"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.08 }}
        >
            <div className="flex flex-row py-3 text-lg gap-2 justify-center md:justify-between items-center w-full flex-wrap">
                <Button variant="link" className="gap-3">
                    <Link width={16} height={16}></Link>
                    Compartir enlace de grupo
                </Button>

            </div>
            <div className="flex flex-col gap-3 w-full">
                {
                    (courseStudents && profilesStudents) ?
                        courseStudents.map(async (course_student) => {
                            const user = profilesStudents.find(user => user.id === course_student.student_id)
                            if (!user) {
                                return null;
                            }
                            return (
                                <GroupUserListItem key={user.id} student={course_student} user={user} />
                            )
                        }) : (
                            <>Cargando</>
                        )
                }
            </div>

        </motion.div>
    )
}