import { Tables } from "@/lib/types/supabase"
import { Button } from "@nextui-org/react"
import { Delete, DeleteIcon, Download, Edit, Trash } from "lucide-react"
import { motion } from "framer-motion"
import { createSupabaseBrowser } from "@/lib/supabase/browser"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Button as ShadcnButton } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"

export const AssignmentItem = ({
    assignment,
    refetch
}:
    {
        assignment: Tables<"assignments">,
        refetch: () => void
    }
) => {
    const { toast } = useToast()

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
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.08 }}
                exit={{ opacity: 0 }}
                className="h-15 w-full px-4 py-2 bg-accent/40 flex flex-row items-center justify-between rounded-sm text-sm border dark:border-none tracking-wider">
                <div className="h-full flex flex-col gap-1">

                    <span className="">
                        {assignment.title}
                    </span>
                    <span className="text-xs  text-muted-foreground">
                        Archivo: <span className="text-muted-foreground/80"> {assignment.file_name}</span>
                    </span>
                </div>

                <div className="flex flex-row gap-1 items-center justify-end">



                    <Button variant="light"
                        size="sm" color="primary" className="flex flex-row gap-3 cursor-pointer " isIconOnly
                        onClick={() => {
                            window.open(publicUrl)
                        }}
                    >


                        <Download size="18" />
                    </Button>

                    <AlertDialogTrigger asChild>

                        <Button variant="light"
                            size="sm" color="danger" className="flex flex-row gap-3 cursor-pointer" isIconOnly
                        >
                            <Trash size="18" />
                        </Button>
                    </AlertDialogTrigger>
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
                </div>

            </motion.div >
        </AlertDialog>
    )
}