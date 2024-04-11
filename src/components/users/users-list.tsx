"use client";

import { memo, useEffect, useState } from "react";
import { Input } from "../ui/input";
import { ScrollArea } from "../ui/scroll-area";
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";
import ClientItem from "./user-item";


import { useUsers } from "@/hooks/useUsers";

import { useLaboratories } from "@/hooks/useLaboratories";
import { useUserRoles } from "@/hooks/useUserRoles";
import { Tables } from "@/lib/types/supabase";
import { UsersListSkeleton } from "./skeletons/users-list-skeleton";


const UsersList = () => {
    const { isFetching: isFetchingUsers, refetch: refetchUsers, data: users } = useUsers();
    const { isFetching: isFetchingUserRoles, data: roles } = useUserRoles();
    const { isFetching: isFetchingLaboratories, data: laboratories } = useLaboratories();


    const [searchQuery, setSearchQuery] = useState("");
    const [filteredClients, setFilteredClients] = useState<typeof users>([]);
    const [filterBy, setFilterBy] = useState<string>("all");

    useEffect(() => {
        if (users && roles && filterBy) {
            let filtered = users;
            if (searchQuery.length > 0) {
                // Filter by NoControl or first name or second name
                const _filtered = users.filter((user) => user.display_name?.toLowerCase().includes(searchQuery.toLowerCase()) || user.noIdentificador?.toLowerCase().includes(searchQuery.toLowerCase()));
                filtered = _filtered as typeof users;
            }

            if (filterBy === "all") {

                filtered = filtered as typeof users;
            } else if (filterBy === "administrador") {
                const role = roles.find((role) => role.id === 1);
                if (role?.id) {
                    const _filtered = users.filter((user) => user.role_id === role.id);
                    filtered = _filtered as typeof users;
                }
            } else if (filterBy === "jefedepartamento") {
                const role = roles.find((role) => role.id === 2);
                if (role) {
                    const _filtered = users.filter((user) => user.role_id === role.id);
                    filtered = _filtered as typeof users;
                }
            } else if (filterBy === "recepcionista") {
                const role = roles.find((role) => role.id === 3);
                if (role) {
                    const _filtered = users.filter((user) => user.role_id === role.id);
                    filtered = _filtered as typeof users;
                }
            } else if (filterBy === "docente") {
                const role = roles.find((role) => role.id === 4);
                if (role) {
                    const _filtered = users.filter((user) => user.role_id === role.id);
                    filtered = _filtered as typeof users;
                }
            } else if (filterBy === "alumno") {
                const role = roles.find((role) => role.id === 5);
                if (role) {
                    const _filtered = users.filter((user) => user.role_id === role.id);
                    filtered = _filtered as typeof users;
                }
            }

            setFilteredClients(filtered);
        }
    }, [searchQuery, filterBy, users, roles]);

    const merge = (arr1: Tables<"users_profile">[], arr2: Tables<"users_profile">[]) => {
        const newArr: Tables<"users_profile">[] = [...arr1];
        for (let i = 0; i < arr2.length; i++) {
            const item = arr2[i];
            if (newArr.includes(item)) continue;
            newArr.push(item);
        }
        return newArr;
    }

    if (!filteredClients) return <></>

    return <div className="">
        <div className="flex flex-row w-full mb-4 rounded-md gap-1 py-1 justify-between ">
            <ToggleGroup type="single" defaultValue="all" variant="outline"
                onValueChange={(value: string) => {
                    setFilterBy(value);
                }}>

                {/* onValueChange={(value) => handleFilter(0, value)}> */}
                <ToggleGroupItem value="all" className="font-normal">
                    Todos
                </ToggleGroupItem>
                <ToggleGroupItem value="administrador" className="font-normal">
                    Administrador
                </ToggleGroupItem>
                <ToggleGroupItem value="jefedepartamento" className="font-normal">
                    Jefe Departamento
                </ToggleGroupItem>
                <ToggleGroupItem value="recepcionista" className="font-normal">
                    Recepcionista
                </ToggleGroupItem>
                <ToggleGroupItem value="docente" className="font-normal">
                    Docente
                </ToggleGroupItem>
                <ToggleGroupItem value="alumno" className="font-normal">
                    Alumno
                </ToggleGroupItem>

            </ToggleGroup>
            <ToggleGroup type="single" defaultValue="all">
                {/* <Button variant="destructive" size="default">Reload <ReloadIcon className="ml-2 h-4 w-4" /> </Button> */}

                <Input
                    className="w-80"
                    placeholder="Buscar usuario..."
                    value={searchQuery}

                    onChange={(e) => {
                        setSearchQuery(e.target.value);
                    }}

                />
            </ToggleGroup>
        </div>
        <ScrollArea className="h-[600px] ">
            {
                isFetchingUsers || isFetchingUserRoles || isFetchingLaboratories
                    ? <UsersListSkeleton len={filteredClients.length} />
                    : filteredClients.sort((a, b) => a.display_name?.localeCompare(b.display_name!, undefined, { numeric: true })! | 0).map((user) => {
                        return <ClientItem key={user.id} user={user as Tables<"users_profile">} laboratories={laboratories as Tables<"laboratories">[]} types={roles as Tables<"user_roles">[]} refetchUsers={refetchUsers} />
                    })
            }

        </ScrollArea>
    </div>
}

export default memo(UsersList);