import type { Tables } from "@/lib/types/supabase";
import { cn } from "@/lib/utils";
import { Chip } from "@nextui-org/react";
import { AnimatePresence, motion } from "framer-motion";
import { Eye, Pencil, Trash } from "lucide-react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import {
	ContextMenu,
	ContextMenuContent,
	ContextMenuItem,
	ContextMenuTrigger,
} from "../ui/context-menu";

type Props = {
	course: Tables<"courses">;
	teacher: Tables<"users">;
	subject: Tables<"subjects">;
};
type MeetingSchedule = {
	[day: string]: {
		start_time: string;
		end_time: string;
	};
};

export const CourseItem = ({ course, teacher, subject }: Props) => {
	const searchParams = useSearchParams();
	const { status, meeting_schedule } = course as Tables<"courses">;
	const schedule: MeetingSchedule = meeting_schedule as MeetingSchedule;

	const clase = `${subject?.key}-${course.label}`;

	const teacherNames = teacher.display_name?.split(" ");

	const dayOfToday = new Date().toLocaleDateString("en-US", {
		weekday: "long",
	});

	const hourOfToday = new Date().toLocaleTimeString("es-MX", {
		hour: "numeric",
		minute: "numeric",
	});

	const today = `${dayOfToday} ${hourOfToday}`;

	const todayHaveSchedule = Object.keys(schedule).includes(dayOfToday);

	const todayIsBusy =
		Object.keys(schedule).includes(dayOfToday) &&
		schedule[dayOfToday].start_time < hourOfToday &&
		schedule[dayOfToday].end_time > hourOfToday;

	if (todayIsBusy) {
	}

	return (
		<AnimatePresence>
			<ContextMenu>
				<ContextMenuTrigger>
					{/* searchParams que se le pasa no debe tener "&" para que no lo interprete como query la siguiente pagina  */}
					{/* <Link href={`/dashboard/cursos/${course.id}?prev=${searchParams}`}> */}

					<motion.div
						initial={{ opacity: 0 }}
						animate={{
							opacity: 1,
							transition: {
								duration: 0.35,
							},
						}}
						exit={{
							opacity: 0,
							transition: {
								duration: 0.35,
							},
						}}
						className="relative flex flex-row transition-all duration-300 hover:cursor-pointer group min-h-28 max-h-28 hover:bg-card rounded-md mb-3 border "
					>
						<div
							className={cn(
								"flex mx-3 items-center justify-center h-[64px] w-[64px] rounded-full self-center border transition-all bg-accent group-hover:bg-secondary ",
								status === "completed"
									? "group-hover:border-success"
									: status === "active"
										? "group-hover:border-warning"
										: "group-hover:border-danger",
							)}
						>
							<span
								className={
									"text-sm text-accent-foreground group-hover:text-secondary-foreground"
								}
							>
								{clase}
							</span>
						</div>
						<div className="py-4 px-5 flex flex-col justify-between tracking-wider text-sm text-muted-foreground transition-all text-pretty h">
							<span className="hidden xs:flex text-foreground transition-all">
								{teacher.display_name}
							</span>
							<span className="flex xs:hidden text-foreground transition-all">
								{teacherNames
									? `${teacherNames[0]!} ${teacherNames[1]!}`
									: teacher.display_name}
							</span>
							<div className="flex flex-row gap-3 text-sm transition-all group-hover:pl-2 group-hover:text-foreground">
								<span className="">{subject?.label}</span>
								<span className="hidden lg:flex">&middot;</span>
								<span className="hidden lg:flex"> Tema 01 - Practica </span>
							</div>
							{
								<div className="flex flex-row gap-3 text-sm transition-all group-hover:pl-2 group-hover:text-foreground">
									{status === "completed" ? (
										<Chip
											size="sm"
											color="success"
											className="text-success-foreground"
											classNames={{
												base: "py-1",
												content: "text-xs",
											}}
										>
											Completado
										</Chip>
									) : status === "active" ? (
										<Chip
											size="sm"
											color="warning"
											className="text-primary-foreground"
										>
											Activo
										</Chip>
									) : (
										<Chip
											size="sm"
											color="danger"
											className="text-destructive-foreground"
										>
											Inactivo
										</Chip>
									)}
								</div>
							}
						</div>
					</motion.div>
					{/* </Link> */}
				</ContextMenuTrigger>
				<ContextMenuContent>
					<ContextMenuItem>Administrar alumnos</ContextMenuItem>
					<ContextMenuItem>Editar</ContextMenuItem>
					<ContextMenuItem>Eliminar</ContextMenuItem>
				</ContextMenuContent>
			</ContextMenu>
		</AnimatePresence>
	);
};
