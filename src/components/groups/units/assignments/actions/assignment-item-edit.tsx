import { ContextMenuItem, ContextMenuShortcut } from "@/components/ui/context-menu";
import { Tables } from "@/lib/types/supabase";
import { Edit } from "lucide-react";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Spinner } from "@nextui-org/spinner";
import { createSupabaseBrowser } from "@/lib/supabase/browser";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { formatDate } from "@/lib/utils";

const formSchema = z.object({
    title: z.string(),
    description: z.string(),
    grade_value: z.number().positive(),
    end_date: z.string(),
    visibility: z.enum(["private", "public"], { message: "Este campo es requerido." }),
})
export const AssignmentItemEdit = ({ assignment, unit_id, refetch, closeDialog }: { assignment: Tables<"assignments">, unit_id: number, refetch: () => void, closeDialog: () => void }) => {
    const { toast } = useToast()
    const minDate = new Date().toISOString().split("T")[0];
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: assignment.title,
            description: assignment.description,
            grade_value: assignment.grade_value,
            end_date: assignment.end_date || "",
            visibility: assignment.visibility as "private" | "public",
        },
    })

    async function onSubmit(data: z.infer<typeof formSchema>) {
        const supabase = createSupabaseBrowser();
        const { data: assignmentData, error } = await supabase.from("assignments").update({
            title: data.title,
            description: data.description,
            grade_value: data.grade_value,
            end_date: data.end_date !== "" ? data.end_date : null,
            visibility: data.visibility,
            updated_at: formatDate(new Date()),
        }).eq("id", assignment.id).select().single()
        if (error) {
            console.log(error)
            toast({
                title: "Error",
                description: error.message,
                variant: "destructive",
            })
        } else {
            toast({
                title: "Practica actualizada",
                description: "La practica " + assignmentData.title + " ha sido actualizada.",
                variant: "default",
            })
            refetch()
            closeDialog()
        }
    }

    return (

        <DialogContent className="lg:max-w-screen-lg overflow-y-auto max-h-screen">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} >
                    <DialogHeader>
                        <DialogClose />
                        <DialogTitle className="tracking-wider">Editar <span>{"\'"}{assignment.title}{"\'"}</span></DialogTitle>
                        <DialogDescription className="space-y-7 text-start">
                            {/* Visibilidad (private, public) */}
                            <FormField
                                control={form.control}
                                name="visibility"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Visibilidad</FormLabel>
                                        <FormControl >
                                            <Select onValueChange={field.onChange} defaultValue={field.value}  >
                                                <FormControl className="w-[7.5rem]">
                                                    <SelectTrigger >
                                                        <SelectValue placeholder="Seleccionar visibilidad" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent >
                                                    <SelectItem value="private">Privado</SelectItem>
                                                    <SelectItem value="public">Publico</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormDescription>
                                            Publico - es visible para los maestros de la misma materia
                                            <br />
                                            Privado - solo es visible para el maestro asignado
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Titulo de la practica */}
                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Titulo</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Practica n..." {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            Titulo de la práctica
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            {/* Descripcion de la practica */}
                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Descripción</FormLabel>
                                        <FormControl>
                                            <Textarea placeholder="Realizar y enviar..." className="resize-y" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            Descripción de la práctica
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            {/* Valor de la practica */}
                            <FormField
                                control={form.control}
                                name="grade_value"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Valor</FormLabel>
                                        <FormControl>
                                            <Input placeholder="100" type="number" inputMode="numeric"
                                                {...field}
                                                onChange={(e) => {
                                                    form.setValue("grade_value", parseInt(e.target.value))
                                                }} />
                                        </FormControl>
                                        <FormDescription>
                                            Valor de la práctica en puntos
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            {/* Fecha de entrega */}
                            <FormField
                                control={form.control}
                                name="end_date"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Fecha de entrega</FormLabel>
                                        <FormControl>
                                            <Input type="date" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            Fecha de entrega de la práctica
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />




                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="pt-4">
                        <Button type="submit" >Save changes</Button>
                    </DialogFooter>
                </form>
            </Form >
        </DialogContent>


    )

}