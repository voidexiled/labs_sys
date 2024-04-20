"use client";
/* React */
import { useEffect, useState } from "react";

/* NEXTJS */
import { usePathname, useRouter, useSearchParams } from "next/navigation";

/* Lib */
import { Tables } from "@/lib/types/supabase";
import { cn } from "@/lib/utils";

/* Hooks */
import { useSubjects } from "@/hooks/useSubjects"
import { useUsers } from "@/hooks/useUsers";

/* UI Components */
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
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

import Search from "@/components/users/search-input";

/* Icons */
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { File, ListFilter } from "lucide-react";
import { useUserRoles } from "@/hooks/useUserRoles";





export const UsersFilters = () => {
    const { data: roles } = useUserRoles();


    const searchParams = useSearchParams();
    const pathname = usePathname();

    const { replace } = useRouter();

    // COMBOBOX TRIGGER OPEN 
    const [openRoleComboBox, setOpenRoleComboBox] = useState(false);


    // SELECTED FILTERS
    const [selectedRole, setSelectedRole] = useState<Tables<"user_roles"> | null>(null);


    /* Este useEffect se encarga de:
        * 1. Verificar si la URL tiene el parametro "page"
        * 2. Si la URL no tiene el parametro "page", se lo agrega y le da el valor de 1
     (Se ejecuta solo una vez, al montarse el componente.)
    */
    useEffect(() => {
        if (!searchParams.has("page")) {
            replace(`${pathname}?page=1`)
        }
    });

    /* Este useEffect se encarga de:
        * 1. Verificar si hay una materia seleccionada para filtrar
        * 2. Si hay una seleccionada, agrega la clave de materia al parametro "subject"
        * 3. Si no hay una seleccionada, elimina el parametro "subject"
        * 4. Pasa los parametros a la URL
     (Se ejecuta al montarse el componente y cada que la materia cambia.)
    */
    useEffect(() => {
        const params = new URLSearchParams(searchParams)
        if (selectedRole) {
            params.set("role", selectedRole.id.toString() || "");
        } else {
            params.delete("role");
        }
        replace(`${pathname}?${params.toString()}`);
    }, [selectedRole])

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

    const _status = searchParams.get("status") || "all";
    const _role = searchParams.get("role") || "";


    return (
        <>
            <div className="flex flex-row w-full mb-4 rounded-md gap-1 py-1 justify-between lg:pr-8 flex-wrap">
                <div className="flex items-center gap-2 flex-wrap justify-center lg:justify-normal ">
                    <Search placeholder="Buscar por nombre o folio..." />
                    <Popover open={openRoleComboBox} onOpenChange={setOpenRoleComboBox}>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                role="combobox"
                                aria-expanded={openRoleComboBox}
                                className="w-[200px] justify-between"
                            >
                                {_role ? roles?.find((r) => r.id.toString() === _role)?.label : selectedRole ? selectedRole.label : "Seleccionar rango..."}
                                <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[200px] p-0">
                            <Command>
                                <CommandInput placeholder="Buscar rango..." className="h-9" />
                                <CommandEmpty>No se encontraron rangos de usuarios.</CommandEmpty>
                                <CommandList>


                                    <CommandGroup>
                                        {
                                            roles?.map((r) => {
                                                return (
                                                    <CommandItem key={r.id} value={r.label} onSelect={(value) => {
                                                        setSelectedRole(
                                                            selectedRole?.label === value ? null :
                                                                roles.find((r) => r.label === value) as Tables<"user_roles"> || null
                                                        )
                                                        setOpenRoleComboBox(false);
                                                    }}>
                                                        {r.label}
                                                        <CheckIcon
                                                            className={cn(
                                                                "ml-auto h-4 w-4",
                                                                selectedRole?.label === r.label ? "opacity-100" : "opacity-0"
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
                <div className="flex items-center gap-2 justify-center lg:justify-normal flex-wrap flex-grow lg:flex-grow-0">
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
                        <DropdownMenuContent align="center">
                            <DropdownMenuLabel>Filtrar por</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuCheckboxItem onSelect={() => handleFilter("all")} checked={_status === "all"}>
                                Mostrar todos
                            </DropdownMenuCheckboxItem>
                            <DropdownMenuCheckboxItem onSelect={() => handleFilter("busy")} checked={_status === "busy"}>
                                Ocupado
                            </DropdownMenuCheckboxItem>
                            <DropdownMenuCheckboxItem onSelect={() => handleFilter("active")} checked={_status === "active"}>
                                Disponible
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
    )

}