"use client";

import { useClients } from "@/store/clients";
import { ScrollArea } from "./ui/scroll-area";
import { ClientItem } from "./client-item";
import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { useEffect, useState } from "react";
import { Client } from "@/env";
import { useClientsTypes } from "@/store/clients_types";

export const ClientsList = () => {
    const { clients } = useClients()
    const { types } = useClientsTypes();
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredClients, setFilteredClients] = useState(clients)

    useEffect(() => {
        if (searchQuery.length > 0) {
            // Filter by NoControl or first name or second name
            setFilteredClients(clients.filter((c) => c.firstName.toLowerCase().includes(searchQuery.toLowerCase()) || c.lastName.toLowerCase().includes(searchQuery.toLowerCase()) || c.noControl.includes(searchQuery)))
        } else {
            setFilteredClients(clients)
        }
    }, [searchQuery]);

    const merge = (arr1: Client[], arr2: Client[]) => {
        const newArr: Client[] = [...arr1];
        for (let i = 0; i < arr2.length; i++) {
            const item = arr2[i];
            if (newArr.includes(item)) continue;
            newArr.push(item);
        }
        return newArr;
    }


    const handleFilter = (type: number, value: string) => {
        let cls: Client[] = []
        const typesId = types.map((t) => t.id);

        console.log("outside")
        if (value.length === 0) return;
        if (type === 0) {
            console.log("into")
            let clients0: Client[] = [];
            if (value === "all") {
                clients0 = clients.filter((client) => {
                    if (typesId.includes(client.typeId)) {
                        return true;
                    }
                })
            } else if (value === "docente") {
                clients0 = clients.filter((client) => {
                    if (client.typeId === 1) {
                        return true;
                    }
                })

            } else if (value === "alumno") {
                clients0 = clients.filter((client) => {
                    if (client.typeId === 2) {
                        return true;
                    }
                })
            } else if (value === "tercero") {
                clients0 = clients.filter((client) => {
                    if (client.typeId === 3) {
                        return true;
                    }
                })

            }

            cls = merge(cls, clients0);
        }
        setFilteredClients(cls);
    }


    return <div className="">
        <div className="flex flex-row w-full mb-4 rounded-md gap-1 py-1 justify-between">
            <ToggleGroup type="single" defaultValue="all"
                onValueChange={(value) => handleFilter(0, value)}>
                <ToggleGroupItem value="all" >
                    Todos
                </ToggleGroupItem>
                <ToggleGroupItem value="docente" >
                    Docentes
                </ToggleGroupItem>
                <ToggleGroupItem value="alumno">
                    Alumnos
                </ToggleGroupItem>
                <ToggleGroupItem value="tercero">
                    Terceros
                </ToggleGroupItem>

            </ToggleGroup>
            <ToggleGroup type="single" defaultValue="all">
                {/* <Button variant="destructive" size="default">Reload <ReloadIcon className="ml-2 h-4 w-4" /> </Button> */}
                <Label htmlFor="search">Buscar</Label>
                <Input
                    className="w-80"
                    placeholder="Cliente..."
                    value={searchQuery}

                    onChange={(e) => {
                        setSearchQuery(e.target.value);
                    }}

                />
            </ToggleGroup>
        </div>
        <ScrollArea className="h-[600px] ">
            {filteredClients.map((client) => {
                return <ClientItem client={client} key={client.id} />
            })}
        </ScrollArea>
    </div>
}