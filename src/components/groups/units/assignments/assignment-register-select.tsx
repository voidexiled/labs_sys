"use client"

import { Button } from "@/components/ui/button";
import { Button as NextButton } from "@nextui-org/react"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Tables } from "@/lib/types/supabase";
import { cn, getPeriodFromDate } from "@/lib/utils";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { CheckIcon } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";
import { GroupAdd } from "@/icons/group-add";
import { AddFile } from "@/icons/file-add-icon";
import { useMediaQuery } from "usehooks-ts"
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { createSupabaseBrowser } from "@/lib/supabase/browser";
import { useToast } from "@/components/ui/use-toast";
export const AssignmentRegisterSelect = ({ assignments, refetch, unit }: { refetch: () => void, unit: Tables<"units">, assignments: Tables<"assignments">[] }) => {
    const { toast } = useToast()
    const isDesktop = useMediaQuery("(min-width: 640px)")
    const [open, setOpen] = useState(false);

    const [selected, setSelected] = useState<Tables<"assignments"> | null>(null);


    const handleAddSelected = async () => {
        if (selected) {
            const supabase = createSupabaseBrowser()
            const { data: assignmentData, error: assignmentError } = await supabase.from("assignments").insert(
                {
                    title: selected.title,
                    description: selected.description,
                    file_name: selected.file_name,
                    visibility: "private",
                    grade_value: 0,
                    end_date: null,
                    unit_id: unit.id,
                }).select("*").single();
            if (assignmentError) {
                console.error(assignmentError.message);
                toast({
                    title: "Error",
                    description: assignmentError.message,
                    variant: "destructive",
                });
                return;

            } else {
                toast({
                    title: "Practica clonada",
                    description: "La practica " + assignmentData.title + " ha sido creada.",
                    variant: "default",
                })
            }
            refetch()
            setOpen(false)
        }
    }

    console.log(unit)
    console.log(assignments)
    if (isDesktop) {
        return (
            <>
                <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                        <Button

                            variant="outline"
                            role="combobox"
                            aria-expanded={open}
                            className=" flex-grow min-w-[400px] justify-between"
                        >
                            {selected ? selected.title : "Seleccionar práctica..."}
                            <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="min-w-[400px] p-0">
                        <List isDesktop={isDesktop} assignments={assignments.filter((ass) => ass.visibility === "public" && ass.unit_id != unit.id)} setSelected={setSelected} selected={selected} open={open} setOpen={setOpen} />
                    </PopoverContent>
                </Popover>
                <Button variant="outline" size="icon" className="stroke-primary border-primary" onClick={handleAddSelected}
                    disabled={!selected}
                >
                    <AddFile width={20} height={20} />
                </Button>
            </>
        )
    }
    return (
        <>
            <Drawer>
                <DrawerTrigger asChild>
                    <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className=" flex-grow min-w-[250px] justify-between"
                    >
                        {selected ? selected.title : "Seleccionar práctica..."}
                        <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                </DrawerTrigger>
                <DrawerContent className="border-t">
                    <List isDesktop={isDesktop} assignments={assignments.filter((ass) => ass.visibility === "public" && ass.unit_id != unit.id)} setSelected={setSelected} selected={selected} open={open} setOpen={setOpen} />

                </DrawerContent>
            </Drawer>
            <Button variant="outline" size="icon" className="stroke-primary border-primary" onClick={handleAddSelected}
                disabled={!selected}
            >
                <AddFile width={20} height={20} />
            </Button>
        </>
    )

}

type ListProps = {
    isDesktop: boolean;
    assignments: Tables<"assignments">[];
    selected: Tables<"assignments"> | null;
    setSelected: Dispatch<SetStateAction<{
        created_at: string;
        description: string;
        end_date: string | null;
        file_name: string | null;
        grade_value: number;
        id: number;
        title: string;
        unit_id: number;
        updated_at: string;
        visibility: string;
    } | null>>;
    setOpen: Dispatch<SetStateAction<boolean>>;
    open: boolean;
}

const List = ({
    assignments,
    selected,
    setSelected,
    setOpen,
    isDesktop
}: ListProps) => {
    return (
        <Command>
            <CommandInput placeholder="Buscar practica..." className={cn(isDesktop ? "text-xs h-9" : "text-base h-12")} />
            <CommandEmpty>No se encontraron practicas.</CommandEmpty>
            <CommandList className={cn(isDesktop && "max-h-[130px]")} data-radix-scroll-area-viewport>


                <CommandGroup>


                    {
                        assignments?.map((assignment) => {
                            return (
                                <CommandItem key={assignment.id} value={assignment.title || ""} onSelect={(value) => {
                                    setSelected(selected && selected.id === assignment.id ? null : assignment)
                                    setOpen(false)
                                }}
                                    className={cn(isDesktop ? "text-xs" : "text-base py-4 ", "relative")}
                                >
                                    <div className="flex flex-row justify-between gap-2 relative flex-grow pr-2">
                                        <div className="flex flex-col justify-between w-7/12 gap-1">
                                            <span className="font-bold inline-block text-ellipsis text-nowrap whitespace-nowrap overflow-hidden">{assignment.title}</span>
                                            <span className="text-xs inline-block text-ellipsis text-nowrap whitespace-nowrap overflow-hidden">{assignment.file_name}</span>
                                        </div>
                                        <div className="flex flex-col justify-between w-5/12 gap-1 items-end">

                                            <span className="text-xs inline-block text-ellipsis text-nowrap whitespace-nowrap overflow-hidden">{assignment.grade_value} pts</span>
                                            <span className="text-xs inline-block text-ellipsis text-nowrap whitespace-nowrap overflow-hidden">{getPeriodFromDate(new Date(assignment.created_at))}</span>
                                        </div>

                                    </div>

                                    <CheckIcon
                                        className={cn(
                                            "ml-auto h-4 w-4",
                                            selected?.title === assignment.title ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                </CommandItem>
                            )

                        })
                    }

                </CommandGroup>





            </CommandList>
        </Command>
    )
}
