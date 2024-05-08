"use client"
import { Tables } from "@/lib/types/supabase"
import { Button } from "@nextui-org/react"
import { Delete, DeleteIcon, Download, Edit, Trash } from "lucide-react"
import { motion } from "framer-motion"
import { createSupabaseBrowser } from "@/lib/supabase/browser"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Button as ShadcnButton } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { DropdownMenu, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuLabel, ContextMenuShortcut, ContextMenuTrigger } from "@/components/ui/context-menu"
import { useSubmissionsByAssignment } from "@/hooks/teacher/useSubmissionsByAssignment"
import { useCourseById } from "@/hooks/teacher/useCourseByUnit"
import { AssignmentItemEdit } from "./actions/assignment-item-edit"
import { Dialog, DialogTrigger } from "@/components/ui/dialog"
import { useState } from "react"

export const AssignmentItem = ({
    course,
    assignment,
    unit,
    refetch
}:
    {
        course: Tables<"courses">,
        assignment: Tables<"assignments">,
        unit: Tables<"units">,
        refetch: () => void
    }
) => {
    const { toast } = useToast()
    const [isOpenEditAssignmentDialog, setIsOpenEditAssignmentDialog] = useState(false)

    const { isFetching: isFetchingSubmissions, data: submissions } = useSubmissionsByAssignment({ assignment_id: assignment?.id })
    // const { isFetching: isFetchingCourse, data: course } = useCourseById({ course_id: unit?.course_id })
    const supabase = createSupabaseBrowser()

    const { data: { publicUrl } } = supabase.storage.from("assignments").getPublicUrl(assignment.file_name!)

    const handleDelete = async () => {
        const supabase = createSupabaseBrowser()


        const { error } = await supabase.from("assignments").delete().eq("id", assignment.id)
        if (error) {
            toast({
                title: "Error",
                description: error.message,
                variant: "destructive",
            })
        } else {
            toast({
                title: "Practica eliminada",
                description: "La practica " + assignment.title + " ha sido eliminada.",
                variant: "default",
            })
            // window.location.reload()
            refetch()
        }
    }

    function handleDownloadFileAssignment() {
        window.open(publicUrl)
    }


    function closeEditAssignmentDialog() {
        setIsOpenEditAssignmentDialog(false)
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
            <Dialog open={isOpenEditAssignmentDialog} onOpenChange={setIsOpenEditAssignmentDialog}>
                <ContextMenu>
                    <ContextMenuTrigger asChild>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.08 }}
                            exit={{ opacity: 0 }}
                            className="cursor-pointer h-16 w-full px-4 py-2 bg-accent/40 flex flex-row items-center justify-between rounded-sm text-sm  tracking-wider shadow-medium border relative hover:bg-accent/80 transition-all">
                            <div className="h-full flex flex-col gap-1 justify-between relative w-3/4 overflow-hidden text-ellipsis text-nowrap whitespace-nowrap ">
                                <span className="inline-block text-ellipsis text-nowrap whitespace-nowrap overflow-hidden ">
                                    {assignment.title}
                                </span>
                                <span className="text-xs text-muted-foreground inline-block text-ellipsis text-nowrap whitespace-nowrap overflow-hidden">
                                    <span className="text-muted-foreground/80"> {assignment.file_name}</span>
                                </span>
                            </div>

                            <div className="flex flex-row gap-1 items-center justify-end h-full">
                                <div className="flex flex-col justify-between items-end h-full text-xs text-muted-foreground tracking-widest">
                                    <span>{assignment.grade_value} pts.</span>
                                    <span>
                                        {
                                            course && submissions && (
                                                <>
                                                    {`${submissions?.length}/${course?.current_enrollment}`} entr.
                                                </>
                                            )
                                        }
                                    </span>
                                </div>
                            </div>
                        </motion.div >
                    </ContextMenuTrigger>
                    <ContextMenuContent>
                        <ContextMenuLabel>
                            <span className="leading-snug">{assignment.title}</span>
                        </ContextMenuLabel>

                        <ContextMenuItem onClick={handleDownloadFileAssignment} className="text-blue-500 stroke-blue-500">
                            Descargar
                            <ContextMenuShortcut>
                                <Download size="14" className="stroke-blue-500" />
                            </ContextMenuShortcut>
                        </ContextMenuItem>

                        <DialogTrigger asChild>
                            <ContextMenuItem className="text-violet-700 stroke-violet-700" onClick={() => { setIsOpenEditAssignmentDialog(true) }}>
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
                            No hay forma de deshacer esta acción. Esto borrara permanentemente la practica de esta unidad.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction asChild>
                            <ShadcnButton
                                onClick={handleDelete}
                                variant="destructive">Eliminar</ShadcnButton>
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
                <AssignmentItemEdit assignment={assignment} unit_id={unit.id} refetch={refetch} closeDialog={closeEditAssignmentDialog} />
            </Dialog>
        </AlertDialog>

    )
}