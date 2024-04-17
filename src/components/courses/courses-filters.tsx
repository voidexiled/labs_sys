"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import Search from "@/components/users/search-input";
import { Tables } from "@/lib/types/supabase";

import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";

import { Select } from "../ui/select";

import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { useSubjects } from "@/hooks/useSubjects";

import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { File, ListFilter } from "lucide-react";
import { useUsers } from "@/hooks/useUsers";

type cursosTabs = "active" | "inactive" | "completed";

export const CoursesFilters = () => {
    const { data: subjects } = useSubjects();
    const { data: users } = useUsers();
    const searchParams = useSearchParams();
    const { replace } = useRouter();
    const pathname = usePathname();

    const [openSubjectComboBox, setOpenSubjectComboBox] = useState(false)
    const [openUserComboBox, setOpenUserComboBox] = useState(false)
    const [selectedSubject, setSelectedSubject] = useState<Tables<"subjects"> | null>()
    const [selectedTeacher, setSelectedTeacher] = useState<Tables<"users_profile"> | null>()

    const [teachers, setTeachers] = useState<Tables<"users_profile">[]>([])

    useEffect(() => {
        if (!searchParams.has("page")) {
            replace(`${pathname}?page=1`)
        }
    });

    useEffect(() => {
        if (users) {
            const _teachers = users.filter((user) => user.role_id === 4);
            setTeachers(_teachers);
        }

    }, [users])

    useEffect(() => {
        const params = new URLSearchParams(searchParams)
        if (selectedSubject) {
            params.set("subject", selectedSubject.key || "");
        } else {
            params.delete("subject");
        }
        replace(`${pathname}?${params.toString()}`);
    }, [selectedSubject])

    useEffect(() => {
        const params = new URLSearchParams(searchParams)
        if (selectedTeacher) {
            params.set("teacher", selectedTeacher.id);
        } else {
            params.delete("teacher");
        }
        replace(`${pathname}?${params.toString()}`);
    }, [selectedTeacher])




    function handleFilter(term: string) {
        console.log(term);
        const params = new URLSearchParams(searchParams)
        if (term) {
            params.set("status", term);
        } else {
            params.set("status", "all");
        }
        replace(`${pathname}?${params.toString()}`);
    }

    const status = searchParams.get("status") || "all";
    const _subject = searchParams.get("subject") || "";
    const _teacher = searchParams.get("teacher") || "";

    return <>
        <div className="flex flex-row w-full mb-4 rounded-md gap-1 py-1 justify-between pr-8">
            <div className="flex items-center gap-2">
                <Search placeholder="Buscar por codigo de clase..." />
                <Popover open={openSubjectComboBox} onOpenChange={setOpenSubjectComboBox}>
                    <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={openSubjectComboBox}
                            className="w-[200px] justify-between"
                        >
                            {_subject ? subjects?.find((s) => s.key === _subject)?.label : selectedSubject ? selectedSubject.label : "Seleccionar materia..."}
                            <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                        <Command>
                            <CommandInput placeholder="Buscar materia..." className="h-9" />
                            <CommandEmpty>No se encontraron materias.</CommandEmpty>
                            <CommandList>


                                <CommandGroup>
                                    {
                                        subjects?.map((subject) => {
                                            return (
                                                <CommandItem key={subject.id} value={subject.label} onSelect={(value) => {
                                                    setSelectedSubject(
                                                        selectedSubject?.label === value ? null :
                                                            subjects.find((s) => s.label === value) as Tables<"subjects"> || null
                                                    )
                                                    setOpenSubjectComboBox(false);
                                                }}>
                                                    {subject.label}
                                                    <CheckIcon
                                                        className={cn(
                                                            "ml-auto h-4 w-4",
                                                            selectedSubject?.label === subject.label ? "opacity-100" : "opacity-0"
                                                        )}
                                                    />
                                                </CommandItem>
                                            )

                                        })
                                    }
                                </CommandGroup>
                            </CommandList>
                        </Command>
                    </PopoverContent>
                </Popover>

                <Popover open={openUserComboBox} onOpenChange={setOpenUserComboBox}>
                    <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={openUserComboBox}
                            className="w-[300px] justify-between"
                        >
                            {_teacher ? teachers?.find((t) => t.id === _teacher)?.display_name : selectedTeacher ? selectedTeacher.display_name : "Seleccionar docente..."}
                            <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[300px] p-0">
                        <Command>
                            <CommandInput placeholder="Buscar docente..." className="h-9" />
                            <CommandEmpty>No se encontraron docentes.</CommandEmpty>
                            <CommandList>


                                <CommandGroup>
                                    {
                                        teachers?.map((teacher) => {
                                            return (
                                                <CommandItem key={teacher.id} value={teacher.display_name || ""} onSelect={(value) => {
                                                    setSelectedTeacher(
                                                        selectedTeacher?.display_name === value ? null :
                                                            teachers.find((s) => s.display_name === value) as Tables<"users_profile"> || null
                                                    )
                                                    setOpenUserComboBox(false);
                                                }}>
                                                    {teacher.display_name}
                                                    <CheckIcon
                                                        className={cn(
                                                            "ml-auto h-4 w-4",
                                                            selectedTeacher?.display_name === teacher.display_name ? "opacity-100" : "opacity-0"
                                                        )}
                                                    />
                                                </CommandItem>
                                            )

                                        })
                                    }
                                </CommandGroup>
                            </CommandList>
                        </Command>
                    </PopoverContent>
                </Popover>

            </div>
            <div className=" flex items-center gap-2">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="outline"
                            size="sm"
                            className="h-7 gap-1 text-sm"
                        >
                            <ListFilter className="h-3.5 w-3.5" />
                            <span className="sr-only sm:not-sr-only">Filtros</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Filtrar por</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuCheckboxItem onSelect={() => handleFilter("all")} checked={status === "all"}>
                            Mostrar todos
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem onSelect={() => handleFilter("active")} checked={status === "active"}>
                            En clase
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem onSelect={() => handleFilter("inactive")} checked={status === "inactive"}>
                            Inactivos
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem onSelect={() => handleFilter("completed")} checked={status === "completed"}>
                            Completados
                        </DropdownMenuCheckboxItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                <Button
                    size="sm"
                    variant="outline"
                    className="h-7 gap-1 text-sm"
                >
                    <File className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only">Exportar</span>
                </Button>
            </div>
        </div>
    </>
}