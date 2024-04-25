import { GroupAdd } from "@/icons/group-add"
import { Tables } from "@/lib/types/supabase"
import { Skeleton } from "@nextui-org/react";
import { motion, useAnimate } from "framer-motion"

export const AddGroupButton = ({ courses }: { courses: Tables<"courses">[] }) => {
    const [scope, animate] = useAnimate();

    const onButtonClick = () => {
        animate([
            [
                "motion.div", {
                    scale: 0.85
                }, {
                    duration: 0.1,
                    at: "<"
                }
            ],
            [
                "motion.div", {
                    scale: 0.95
                }, {
                    duration: 0.1
                }
            ]
        ])
    }

    return (
        <motion.div
            ref={scope}
            onClick={onButtonClick}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}

            className="relative flex mx-auto w-56 h-48 bg-card text-card-foreground border rounded-lg cursor-pointer hover:scale-[0.95]  transition-transform justify-center items-center group overflow-hidden">
            <div className="absolute w-[110%] h-[110%] -left-[5%] -top-[5%] z-[2] group-hover:backdrop-blur-[2px] transition-all opacity-0 group-hover:opacity-80 flex justify-center items-center stroke-card-foreground flex-col
                        bg-accent/0 group-hover:bg-accent/5
                    ">
                <span className="text-lg font-semibold text-card-foreground/90 transition-all hover:text-foreground/90">Registrar nuevo grupo</span>



                <GroupAdd width={128} height={128} />
            </div>
            <div className="relative group-hover:opacity-0  transition-all flex flex-col items-center justify-center">

                <span
                    className="text-lg font-semibold text-card-foreground/90 transition-all hover:text-foreground/90">Tienes {courses?.length || "0"} {courses?.length === 1 ? "grupo" : "grupos"}</span>

                <span className="text-sm text-card-foreground/90 transition-all hover:text-foreground/90">Registrar nuevo grupo</span>
            </div>
        </motion.div>
    )
}