"use client";
import { Button } from "@/components/ui/button";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { toast, useToast } from "@/components/ui/use-toast";
import { createSupabaseBrowser } from "@/lib/supabase/browser";
import type { Tables } from "@/lib/types/supabase";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { DateInput } from "@nextui-org/date-input";
import { Spinner } from "@nextui-org/spinner";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { SelectGroup } from "@radix-ui/react-select";
import { CheckIcon } from "lucide-react";
import { redirect } from "next/navigation";
import { useState } from "react";
import { UseFormReturn, useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
	label: z
		.string({
			message: "Este campo debe ser una cadena de texto.",
		})
		.toUpperCase()
		.min(1, {
			message: "Este campo es requerido.",
		})
		.max(5, {
			message: "Debe tener como máximo 5 caracteres.",
		})
		.regex(/^[A-Z]+$/, { message: "Solo se permiten letras mayúsculas." }),
	classroom_code: z
		.string()
		.min(10, { message: "Ingresa un código de clase válido." })
		.max(10, { message: "Ingresa un código de clase válido." }),
	subject_id: z
		.number()
		.int()
		.positive({ message: "Este campo es requerido." }),
	teacher_id: z.string().min(1, { message: "Este campo es requerido." }),
	meeting_schedule: z.object({}).nullable(),
	enrollment_limit: z.number().int(),
	end_date: z.string().min(1, { message: "Este campo es requerido." }),
	status: z.enum(["active", "inactive"], {
		message: "Este campo es requerido.",
	}),
	type: z.enum(["presencial", "online", "mix"], {
		message: "Este campo es requerido.",
	}),
	visibility: z.enum(["private", "public"], {
		message: "Este campo es requerido.",
	}),
});
export default function GroupCreator({
	subjects,
	teachers,
}: { subjects: Tables<"subjects">[]; teachers: Tables<"users">[] }) {
	const { toast } = useToast();
	const [isOpenSubjectComboBox, setIsOpenSubjectComboBox] = useState(false);
	const [isOpenTeacherComboBox, setIsOpenTeacherComboBox] = useState(false);
	const minDate = new Date().toISOString().split("T")[0];
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			label: "",
			classroom_code: "",
			subject_id: 0,
			teacher_id: "",
			meeting_schedule: {
				Friday: {
					end_time: "11:00",
					start_time: "09:00",
				},
				Monday: {
					end_time: "11:00",
					start_time: "09:00",
				},
				Tuesday: {
					end_time: "11:00",
					start_time: "09:00",
				},
				Thursday: {
					end_time: "11:00",
					start_time: "09:00",
				},
				Wednesday: {
					end_time: "11:00",
					start_time: "09:00",
				},
			},
			enrollment_limit: 0,
			end_date: "",
			status: "inactive",
			type: "presencial",
			visibility: "private",
		},
	});

	async function revertChanges(course_id: number) {
		const supabase = createSupabaseBrowser();

		toast({
			title: "Eliminando grupo...",
			description: (
				<pre>
					<Spinner size="sm" />
				</pre>
			),
		});

		const { data: DeleteCourseData, error: DeleteCourseError } = await supabase
			.from("courses")
			.delete()
			.eq("id", course_id);
		if (DeleteCourseError) {
			console.error(DeleteCourseError);
			toast({
				title: "Error al crear grupo",
				description: `Hubo un error al eliminar el grupo, por favor intenta de nuevo. \n${DeleteCourseError.message}`,
				variant: "destructive",
			});
		}
		if (DeleteCourseData) {
			toast({
				title: "Grupo eliminado",
				description: "El grupo se ha eliminado exitosamente",
				variant: "default",
			});
		}
	}

	async function onSubmit(values: z.infer<typeof formSchema>) {
		const supabase = createSupabaseBrowser();

		toast({
			title: "Creando grupo...",
			description: (
				<pre>
					<Spinner size="sm" />
				</pre>
			),
		});

		const { data: CourseData, error: CourseError } = await supabase
			.from("courses")
			.insert([
				{
					label: values.label,
					classroom_code: values.classroom_code,
					subject_id: values.subject_id,
					teacher_id: values.teacher_id,
					meeting_schedule: values.meeting_schedule,
					enrollment_limit: values.enrollment_limit,
					end_date: values.end_date,
					status: values.status,
					type: values.type,
					visibility: values.visibility,
				},
			])
			.select("*")
			.single();
		if (CourseError) {
			console.error(CourseError);
			toast({
				title: "Error al crear grupo",
				description: `Hubo un error al crear el grupo, por favor intenta de nuevo. \n${CourseError.message}`,
				variant: "destructive",
			});
			return;
		}
		//console.log(CourseData);
		if (CourseData) {
			const { data: SubjectData, error: SubjectError } = await supabase
				.from("subjects")
				.select("*")
				.eq("id", values.subject_id)
				.single();

			if (SubjectError) {
				console.error(SubjectError);
				toast({
					title: "Error al crear grupo",
					description: `Hubo un error al obtener la materia, por favor intenta de nuevo. \n${SubjectError.message}`,
					variant: "destructive",
				});
				revertChanges(CourseData.id);
				return;
			}
			console.log(SubjectData);

			if (SubjectData) {
				const { data: SyllabusData, error: SyllabusError } = await supabase
					.from("syllabuses")
					.select("*")
					.eq("subject_id", SubjectData.id)
					.single();
				if (SyllabusError) {
					console.error(SyllabusError);
					toast({
						title: "Error al crear grupo",
						description: `Hubo un error al obtener el plan de estudios, por favor intenta de nuevo. \n${SyllabusError.message}`,
						variant: "destructive",
					});
					revertChanges(CourseData.id);
					return;
				}
				console.log(SyllabusData);
				if (SyllabusData) {
					type PartialUnit = {
						course_id: number;
						file_name: string;
						unit: number;
						visibility: "private" | "public";
					};
					const units: PartialUnit[] = [];
					Array.from(new Array(SyllabusData.units)).map(
						(unit: number, index: number) => {
							units.push({
								course_id: CourseData.id,
								file_name: "",
								unit: index + 1,
								visibility: "private",
							});
						},
					);
					console.log("Unidades", units);
					toast({
						title: "Inicializando unidades...",
						description: (
							<pre>
								<Spinner size="sm" />
							</pre>
						),
						variant: "default",
					});
					const { data: UnitsData, error: UnitsError } = await supabase
						.from("units")
						.insert(units)
						.select("*");
					if (UnitsError) {
						console.error(UnitsError);
						toast({
							title: "Error al crear grupo",
							description: `Hubo un error al crear las unidades, por favor intenta de nuevo. \n${UnitsError.message}`,
							variant: "destructive",
						});
						revertChanges(CourseData.id);
						return;
					}
					console.log("Unidades insertadas", UnitsData);
					if (UnitsData) {
						toast({
							title: "Grupo creado",
							description: "El grupo se ha creado exitosamente",
							variant: "default",
						});
						console.log("Unidades insertadas", UnitsData);
						window.location.replace("/dashboard/labadmin/grupos");
					}
				}
			}
		}

		// if (form.formState.isValid) {
		//     toast({
		//         title: "Grupo creado",
		//         description: "El grupo se ha creado exitosamente",
		//         variant: "default"
		//     });
		// } else {
		//     toast({
		//         title: "Error al crear grupo",
		//         description: "Por favor revisa los campos del formulario",
		//         variant: "destructive"
		//     });
		// }
		// // console.log(form.formState.)
	}
	// console.log(subjects)
	// console.log("mindate", minDate)
	return (
		<div className="px-8 pb-12">
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
					{/* Materia */}
					<FormField
						control={form.control}
						name="subject_id"
						render={({ field }) => (
							<FormItem className="flex flex-col">
								<FormLabel>Materia</FormLabel>
								<Popover open={isOpenSubjectComboBox}>
									<PopoverTrigger asChild>
										<FormControl>
											<Button
												variant="secondary"
												role="combobox"
												className={cn(
													"w-[200px] justify-between",
													!field.value && "text-muted-foreground",
												)}
												onClick={() =>
													setIsOpenSubjectComboBox(!isOpenSubjectComboBox)
												}
											>
												{/* Selecciona una materia */}
												{field.value
													? subjects.find(
															(subject) => subject.id === field.value,
														)?.label
													: "Selecciona una materia"}
												<CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
											</Button>
										</FormControl>
									</PopoverTrigger>
									<PopoverContent className="w-[200px] p-0">
										<Command>
											<CommandInput
												placeholder="Buscar materia..."
												className="h-9"
											/>
											<CommandEmpty>No se encontraron materias.</CommandEmpty>
											<CommandGroup>
												<CommandList
													className="max-h-[150px]"
													data-radix-scroll-area-viewport
												>
													{subjects?.map((sub) => (
														<CommandItem
															value={sub.label}
															key={sub.id}
															onSelect={() => {
																form.setValue("subject_id", sub.id);
																setIsOpenSubjectComboBox(false);
															}}
														>
															{sub.label}
															<CheckIcon
																className={cn(
																	"ml-auto h-4 w-4",
																	sub.id === field.value
																		? "opacity-100"
																		: "opacity-0",
																)}
															/>
														</CommandItem>
													))}
												</CommandList>
											</CommandGroup>
										</Command>
									</PopoverContent>
								</Popover>
								<FormDescription>Materia impartida en el curso</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
					{/* Docente */}
					<FormField
						control={form.control}
						name="teacher_id"
						render={({ field }) => (
							<FormItem className="flex flex-col">
								<FormLabel>Docente</FormLabel>
								<Popover open={isOpenTeacherComboBox}>
									<PopoverTrigger asChild>
										<FormControl>
											<Button
												variant="secondary"
												role="combobox"
												className={cn(
													"w-[300px] justify-between",
													!field.value && "text-muted-foreground",
												)}
												onClick={() =>
													setIsOpenTeacherComboBox(!isOpenTeacherComboBox)
												}
											>
												{/* Selecciona una materia */}
												{field.value
													? teachers.find(
															(teacher) => teacher.id === field.value,
														)?.display_name
													: "Selecciona un docente"}
												<CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
											</Button>
										</FormControl>
									</PopoverTrigger>
									<PopoverContent className="w-[300px] p-0">
										<Command>
											<CommandInput
												placeholder="Buscar docente..."
												className="h-9"
											/>
											<CommandEmpty>No se encontraron docentes.</CommandEmpty>
											<CommandGroup>
												<CommandList
													className="max-h-[150px]"
													data-radix-scroll-area-viewport
												>
													{teachers?.map((teacher) => (
														<CommandItem
															value={teacher.display_name!}
															key={teacher.id}
															onSelect={() => {
																form.setValue("teacher_id", teacher.id);
																setIsOpenTeacherComboBox(false);
															}}
														>
															{teacher.display_name}
															<CheckIcon
																className={cn(
																	"ml-auto h-4 w-4",
																	teacher.id === field.value
																		? "opacity-100"
																		: "opacity-0",
																)}
															/>
														</CommandItem>
													))}
												</CommandList>
											</CommandGroup>
										</Command>
									</PopoverContent>
								</Popover>
								<FormDescription>
									Docente que impartirá la materia
								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>

					{/* Horario */}
					<FormField
						control={form.control}
						name="meeting_schedule"
						render={({ field }) => (
							<FormItem className="flex flex-col">
								<FormLabel>Horario</FormLabel>
								<FormControl>
									{/* <Input placeholder="..." type="text" className="hidden" {...field} /> */}
									<Button
										type="button"
										variant="secondary"
										className="w-[200px] text-muted-foreground"
									>
										Seleccionar horario
									</Button>
								</FormControl>
								<FormDescription>Horario de clases</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
					{/* Etiqueta de Grupo (A,B,C,...)*/}
					<FormField
						control={form.control}
						name="label"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Grupo</FormLabel>
								<FormControl>
									<Input placeholder="A" {...field} className="w-[5rem]" />
								</FormControl>
								<FormDescription>Etiqueta del grupo</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>

					{/* Limite de alumnos */}
					<FormField
						control={form.control}
						name="enrollment_limit"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Máximo de alumnos</FormLabel>
								<FormControl>
									<Input
										type="number"
										placeholder="32"
										min={1}
										inputMode="numeric"
										{...field}
										className="w-[7.5rem]"
										onChange={(e) => {
											form.setValue(
												"enrollment_limit",
												Number.parseInt(e.target.value),
											);
										}}
									/>
								</FormControl>
								<FormDescription>Número máximo de alumnos</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
					{/* Fecha de finalización */}
					<FormField
						control={form.control}
						name="end_date"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Fecha de finalización del curso</FormLabel>
								<FormControl>
									<Input
										type="date"
										min={minDate}
										className="w-fit"
										{...field}
									/>
									{/* <DateInput

                                        className="w-[7.5rem]" /> */}
								</FormControl>
								{/* <FormDescription>
                                    Número máximo de alumnos
                                </FormDescription> */}
								<FormMessage />
							</FormItem>
						)}
					/>
					{/* Código de clase (XKXI1O13Z1)*/}
					<FormField
						control={form.control}
						name="classroom_code"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Código de clase</FormLabel>
								<FormControl>
									<Input
										placeholder="XXXXXXXXXX"
										{...field}
										className="w-[7.5rem]"
										maxLength={10}
									/>
								</FormControl>
								<FormDescription>
									Código de clase para invitación
								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
					{/* Estatus (active, inactive) */}
					<FormField
						control={form.control}
						name="status"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Estatus</FormLabel>
								<FormControl>
									<Select
										onValueChange={field.onChange}
										defaultValue={field.value}
									>
										<FormControl className="w-[7.5rem]">
											<SelectTrigger>
												<SelectValue placeholder="Seleccionar estatus" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											<SelectItem value="inactive">Inactivo</SelectItem>
											<SelectItem value="active">Activo</SelectItem>
											{/* <SelectItem value="completed">Completado</SelectItem> */}
										</SelectContent>
									</Select>
									{/* <Input placeholder="A" {...field} className="w-[5rem]" /> */}
								</FormControl>
								<FormDescription>
									Activo - es accesible para el docente que impartirá y alumnos
									inscritos y jefes.
									<br />
									Inactivo - solo es accesible para los jefes (departamento,
									coordinación, etc.)
									<br />
								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
					{/* Visibilidad (private, public) */}
					<FormField
						control={form.control}
						name="visibility"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Visibilidad</FormLabel>
								<FormControl>
									<Select
										onValueChange={field.onChange}
										defaultValue={field.value}
									>
										<FormControl className="w-[7.5rem]">
											<SelectTrigger>
												<SelectValue placeholder="Seleccionar visibilidad" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											<SelectItem value="private">Privado</SelectItem>
											<SelectItem value="public">Publico</SelectItem>
										</SelectContent>
									</Select>
								</FormControl>
								<FormDescription>
									Publico - es visible también para los maestros de la misma
									materia.
									<br />
									Privado - solo es visible para el maestro que impartirá y
									jefes.
								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
					{/* Modalidad (presencial, online, mix) */}
					<FormField
						control={form.control}
						name="type"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Modalidad</FormLabel>
								<FormControl>
									<Select
										onValueChange={field.onChange}
										defaultValue={field.value}
									>
										<FormControl className="w-[7.5rem]">
											<SelectTrigger>
												<SelectValue placeholder="Seleccionar modalidad" />
											</SelectTrigger>
										</FormControl>
										<SelectContent side="top">
											<SelectItem value="presencial">Presencial</SelectItem>
											<SelectItem value="online">En linea</SelectItem>
											<SelectItem value="mix">Mixto</SelectItem>
										</SelectContent>
									</Select>
								</FormControl>
								<FormDescription>Modalidad del curso</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>

					<Button type="submit" variant="default">
						Crear grupo
					</Button>
				</form>
			</Form>
		</div>
	);
}
