"use client";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button as ShadcnButton } from "@/components/ui/button";
import {
	ContextMenu,
	ContextMenuContent,
	ContextMenuItem,
	ContextMenuLabel,
	ContextMenuShortcut,
	ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import {
	DropdownMenu,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";
import { useCourseById } from "@/hooks/teacher/useCourseByUnit";
import { useSubmissionsByAssignment } from "@/hooks/teacher/useSubmissionsByAssignment";
import { createSupabaseBrowser } from "@/lib/supabase/browser";
import type { Tables } from "@/lib/types/supabase";
import { cn } from "@/lib/utils";
import { Button } from "@nextui-org/react";
import { AnimatePresence, motion } from "framer-motion";
import { Delete, DeleteIcon, Download, Edit, Trash } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { AssignmentItemEdit } from "./actions/assignment-item-edit";

export const AssignmentItem = ({
	course,
	assignment,
	unit,
	refetch,
}: {
	course: Tables<"courses">;
	assignment: Tables<"assignments">;
	unit: Tables<"units">;
	refetch: () => void;
}) => {
	const { toast } = useToast();

	// calculate if assignment.created_at was 1 min around now
	const created_at = new Date(assignment.created_at);
	const now = new Date();

	const created_at_diff = Math.abs(now.getTime() - created_at.getTime());
	const created_at_diff_minutes = Math.ceil(created_at_diff / (1000 * 60));

	const [isNew, setIsNew] = useState(created_at_diff_minutes <= 1);
	const [isOpenEditAssignmentDialog, setIsOpenEditAssignmentDialog] =
		useState(false);

	const { isFetching: isFetchingSubmissions, data: submissions } =
		useSubmissionsByAssignment({ assignment_id: assignment?.id });
	// const { isFetching: isFetchingCourse, data: course } = useCourseById({ course_id: unit?.course_id })
	const supabase = createSupabaseBrowser();

	const {
		data: { publicUrl },
	} = supabase.storage.from("assignments").getPublicUrl(assignment.file_name!);

	const handleDelete = async () => {
		const supabase = createSupabaseBrowser();

		const { error } = await supabase
			.from("assignments")
			.delete()
			.eq("id", assignment.id);
		if (error) {
			toast({
				title: "Error",
				description: error.message,
				variant: "destructive",
			});
		} else {
			toast({
				title: "Practica eliminada",
				description: `La practica ${assignment.title} ha sido eliminada.`,
				variant: "default",
			});
			// window.location.reload()
			refetch();
		}
	};

	function handleDownloadFileAssignment() {
		window.open(publicUrl);
	}

	function closeEditAssignmentDialog() {
		setIsOpenEditAssignmentDialog(false);
	}

	/* TODO: Añadir:
    1. Interfaz
        - [x] Titulo practica
        - [x] Puntuacion de practica
        - [x] Fecha final de practica
        - [x] Boton para editar practica
        - [x] Boton para descargar practica
        - [x] Boton para eliminar practica
        - [x] Dialogo de confirmacion para eliminar practica
    2. Funcionalidad
        - [x] Boton para editar practica
        - [x] Boton para descargar practica
        - [x] Boton para eliminar practica
        - [x] Dialogo de confirmacion para eliminar practica
    */
	return (
		<AlertDialog>
			<Dialog
				open={isOpenEditAssignmentDialog}
				onOpenChange={setIsOpenEditAssignmentDialog}
			>
				<ContextMenu>
					<ContextMenuTrigger asChild>
						<Link
							href={`/dashboard/teacher/grupos/${course.id}/unidad/${unit.unit}/${assignment.id}`}
							title={`Ver entregas de ${assignment.title}`}
						>
							<motion.div
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{ delay: 0.08 }}
								exit={{ opacity: 0 }}
								onHoverStart={() => {
									if (isNew) {
										setIsNew(false);
									}
								}}
								onTapStart={() => {
									if (isNew) {
										setIsNew(false);
									}
								}}
								className={cn(
									"cursor-pointer h-16 w-full px-4 py-2 bg-background/70 flex flex-row items-center justify-between rounded-sm text-sm  tracking-wider shadow-sm border relative hover:bg-secondary/50 transition-all",
									isNew && "border-primary/30",
								)}
							>
								<AnimatePresence>
									{isNew && (
										<motion.span
											key={`${assignment.id}_isnew`}
											initial={{ opacity: 0 }}
											animate={{ opacity: 1 }}
											transition={{ delay: 0.08 }}
											exit={{ opacity: 0, transition: { duration: 0.15 } }}
											className="absolute top-4 -left-5 h-2 w-2 text-primary drop-shadow-lg shadow-primary tracking-widest z-20 -rotate-45 "
										>
											Reciente!
										</motion.span>
									)}
								</AnimatePresence>
								<div className="h-full flex flex-col gap-1 justify-between relative w-3/4 overflow-hidden text-ellipsis text-nowrap whitespace-nowrap ">
									<span className="inline-block text-ellipsis text-nowrap whitespace-nowrap overflow-hidden ">
										{assignment.title}
									</span>
									<span className="text-xs text-muted-foreground inline-block text-ellipsis text-nowrap whitespace-nowrap overflow-hidden">
										<span className="text-muted-foreground/80">
											{" "}
											{assignment.file_name}
										</span>
									</span>
								</div>

								<div className="flex flex-row gap-1 items-center justify-end h-full">
									<div
										className={cn(
											"flex flex-col justify-between items-end h-full text-xs text-muted-foreground tracking-widest",
											assignment.grade_value === 0
												? "text-red-500"
												: "text-green-500",
										)}
									>
										<span>{assignment.grade_value} pts.</span>
										<span className="text-muted-foreground">
											{course && submissions && (
												<>
													{`${submissions?.length}/${course?.current_enrollment}`}{" "}
													entr.
												</>
											)}
										</span>
									</div>
								</div>
							</motion.div>
						</Link>
					</ContextMenuTrigger>
					<ContextMenuContent>
						<ContextMenuLabel>
							<span className="leading-snug">{assignment.title}</span>
						</ContextMenuLabel>

						<ContextMenuItem
							onClick={handleDownloadFileAssignment}
							className="text-blue-500 stroke-blue-500"
						>
							Descargar
							<ContextMenuShortcut>
								<Download size="14" className="stroke-blue-500" />
							</ContextMenuShortcut>
						</ContextMenuItem>

						<DialogTrigger asChild>
							<ContextMenuItem
								className="text-violet-700 stroke-violet-700"
								onClick={() => {
									setIsOpenEditAssignmentDialog(true);
								}}
							>
								Editar
								<ContextMenuShortcut>
									<Edit size="14" className="stroke-violet-700" />
								</ContextMenuShortcut>
							</ContextMenuItem>
						</DialogTrigger>
						<AlertDialogTrigger asChild>
							<ContextMenuItem className="text-destructive stroke-destructive">
								Eliminar
								<ContextMenuShortcut>
									<Trash size="14" className="stroke-destructive" />
								</ContextMenuShortcut>
							</ContextMenuItem>
						</AlertDialogTrigger>
					</ContextMenuContent>
				</ContextMenu>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Estas seguro?</AlertDialogTitle>
						<AlertDialogDescription>
							No hay forma de deshacer esta acción. Esto borrara permanentemente
							la practica de esta unidad.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel>Cancelar</AlertDialogCancel>
						<AlertDialogAction asChild>
							<ShadcnButton onClick={handleDelete} variant="destructive">
								Eliminar
							</ShadcnButton>
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
				<AssignmentItemEdit
					assignment={assignment}
					unit_id={unit.id}
					refetch={refetch}
					closeDialog={closeEditAssignmentDialog}
				/>
			</Dialog>
		</AlertDialog>
	);
};
