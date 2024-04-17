import { Tables } from "@/lib/types/supabase"
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "../ui/context-menu";
import { AspectRatio } from "../ui/aspect-ratio";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { SyntheticEvent } from "react";
import { cn } from "@/lib/utils";
import moment from 'moment';
import { Chip } from "@nextui-org/react";
type Props = {
    course: Tables<"courses">;
    teacher: Tables<"users_profile">;
    subject: Tables<"subjects">;
}
type MeetingSchedule = {
    [day: string]: {
        start_time: string;
        end_time: string;
    }
}


export const CourseItem = ({ course, teacher, subject }: Props) => {

    const { status, meeting_schedule } = course as Tables<"courses">;
    const schedule: MeetingSchedule = meeting_schedule as MeetingSchedule;

    const clase = subject?.key + "-" + course.label;

    const dayOfToday = new Date().toLocaleDateString("en-US", { weekday: 'long' });

    const hourOfToday = new Date().toLocaleTimeString("es-MX", { hour: 'numeric', minute: 'numeric' });

    const today = dayOfToday + " " + hourOfToday;

    const todayHaveSchedule = Object.keys(schedule).includes(dayOfToday);

    const todayIsBusy = Object.keys(schedule).includes(dayOfToday) && schedule[dayOfToday].start_time < hourOfToday && schedule[dayOfToday].end_time > hourOfToday;


    if (todayIsBusy) {

    }


    return (
        <ContextMenu >
            <ContextMenuTrigger >
                <div
                    className="relative flex flex-row transition-all duration-300 hover:cursor-pointer group min-h-28 max-h-28 hover:bg-card rounded-md 
                    mb-3 border

                    
                    "
                >
                    <div className={
                        // cn("mx-3 flex items-center justify-center h-[64px] w-[64px] rounded-full self-center border transition-all ",
                        //     status === "completed" ? "bg-success/90 group-hover:bg-success"
                        //         : status === "active" ? "bg-primary/90 group-hover:bg-primary"
                        //             : "bg-destructive/90 group-hover:bg-destructive"
                        // )
                        cn("mx-3 flex items-center justify-center h-[64px] w-[64px] rounded-full self-center border transition-all bg-accent group-hover:bg-secondary ",
                            status === "completed" ? "group-hover:border-success"
                                : status === "active" ? "group-hover:border-warning"
                                    : "group-hover:border-danger"
                        )
                    }>
                        <span className={
                            // cn("text-sm",
                            //     status === "completed" ? "text-success-foreground"
                            //         : status === "active" ? "text-primary-foreground"
                            //             : "text-destructive-foreground"

                            // )
                            "text-sm text-accent-foreground group-hover:text-secondary-foreground"
                        }>
                            {clase}
                        </span>
                    </div>
                    <div className="py-4 px-5 flex flex-col justify-between tracking-wider text-sm text-muted-foreground transition-all text-pretty h">
                        <span className="text-foreground  transition-all">{teacher?.display_name}</span>
                        <div className="flex flex-row gap-3 text-sm transition-all group-hover:pl-2 group-hover:text-foreground">
                            <span className="">{subject?.label}</span>
                            <span className="">&middot;</span>
                            <span className="">  Tema 01 - Practica </span>
                            {/* Ultima practica terminada o cursando */}

                        </div>
                        {

                            <div className="flex flex-row gap-3 text-sm transition-all group-hover:pl-2 group-hover:text-foreground">
                                {
                                    status === "completed" ?
                                        // <span>Finaliza a las {schedule[dayOfToday].end_time}</span>
                                        <Chip size="sm" color="success" className="text-success-foreground" classNames={{
                                            base: "py-1",
                                            content: "text-xs",
                                        }}>Completado</Chip>
                                        : status === "active" ?
                                            <Chip size="sm" color="warning" className="text-primary-foreground">En clase</Chip> :
                                            <Chip size="sm" color="danger" className="text-destructive-foreground">En espera</Chip>
                                    // <span>Empieza a las {schedule[dayOfToday].start_time}</span>
                                }
                            </div>
                        }

                    </div>
                </div>


                {/* </Link> */}

            </ContextMenuTrigger>
            <ContextMenuContent>
                <ContextMenuItem>
                    Vista rápida
                </ContextMenuItem>
                <ContextMenuItem>
                    Inspeccionar
                </ContextMenuItem>
                <ContextMenuItem inset>
                    Más opciones
                </ContextMenuItem>
            </ContextMenuContent>
        </ContextMenu>)
}