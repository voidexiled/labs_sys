import Link from "next/link"

import { motion } from "framer-motion"
import { Tables } from "@/lib/types/supabase"
import { Skeleton } from "@nextui-org/react"
import { AspectRatio } from "../ui/aspect-ratio"
import { Avatar, AvatarFallback } from "../ui/avatar"



export const GroupItem = ({ course, subject, laboratory }: { course: Tables<"courses"> | undefined, subject: Tables<"subjects"> | undefined, laboratory?: Tables<"laboratories"> }) => {
    return (
        <>
            {
                (course && subject) && <Link key={course.id} href={`grupos/${course.id}`} className="group flex w-56 h-48 mx-auto" >
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="bg-card text-card-foreground border rounded-md group-hover:scale-[0.95] transition-all w-full h-full flex flex-col justify-center items-center p-5 gap-2 group-hover:border-card-foreground/20"
                    >
                        <div className="rounded-xl w-[76px] h-[76px] bg-secondary flex items-center justify-center p-1 border text-sm">

                            {
                                subject ? (
                                    <span>{subject.key} - {course.label}</span>
                                ) :
                                    <Skeleton className="rounded-full object-cover w-full h-full" />
                            }
                        </div>
                        <span>
                            {subject ? subject.label : "Cargando..."}
                        </span>
                    </motion.div>
                </Link>
            }
        </>
    )
}