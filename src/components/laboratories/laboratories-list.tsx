"use client";

import { useEffect, useState } from "react";
import { LaboratoryItem } from "./laboratory-item";
import { useLaboratories } from "@/hooks/useLaboratories";
import { useSubjects } from "@/hooks/useSubjects";
import { useUserRoles } from "@/hooks/useUserRoles";
import { useUsers } from "@/hooks/useUsers";
import { Tables } from "@/lib/types/supabase";
import { LaboratoriesListSkeleton } from "./skeletons/laboratories-list-skeleton";
import { ScrollAreaDashboard } from "../scroll-area-dashboard";

export default function LaboratoriesList({ q, status, currentPage }: { q: string, status: string, currentPage: number }) {
    // Fetching 
    const { isFetching: isFetchingLaboratories, refetch: refetchLabs, data: laboratories } = useLaboratories();
    const { isFetching: isFetchingSubjects, data: subjects } = useSubjects();
    const { isFetching: isFetchingTypesUsers, data: types } = useUserRoles();
    const { isFetching: isFetchingUsers, data: users } = useUsers();
    const [filteredLaboratories, setFilteredLaboratories] = useState(laboratories)

    useEffect(() => {
        const filtered = filterLaboratories();
        setFilteredLaboratories(filtered);
    }, [laboratories, q, currentPage, status])

    const filterLaboratories = () => {
        if (!laboratories) return [];
        return laboratories.filter((lab) => {
            const _q = q.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

            // const { noIdentificador, display_name, role_id } = user;
            const { busy_by, capacity, id, label, subject_id } = lab

            const normalized_display_name = label?.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

            const search = normalized_display_name?.toLowerCase().includes(_q);

            if (status === "all") {
                return search;
            } else {
                if (status === "busy") {
                    return lab.busy_by !== null && search;
                } else {
                    return lab.busy_by === null && search;
                }
            }
        });
    }

    if (!filteredLaboratories) return <></>
    return (
        <ScrollAreaDashboard>
            {
                isFetchingLaboratories || isFetchingSubjects || isFetchingTypesUsers || isFetchingUsers
                    ? <LaboratoriesListSkeleton len={filteredLaboratories.length} />
                    : filteredLaboratories.map((lab) => {

                        const user = users?.filter((user) => user.id === lab.busy_by)[0];
                        const subject = subjects?.filter((subject) => subject.id === lab.subject_id)[0];
                        const userRole = types?.filter((type) => lab.busy_by ? type.id === user?.role_id : false)[0];
                        const isBusy = lab.busy_by !== null;

                        // return <LaboratoryItem key={lab.id} lab={lab as Tables<"laboratories">} subjects={subjects as Tables<"subjects">[]} types={types as Tables<"user_roles">[]} users={users as Tables<"users_profile">[]} />
                        console.log(lab);
                        return <LaboratoryItem key={lab.id} lab={lab as Tables<"laboratories">} subject={subject as Tables<"subjects">} type={userRole as Tables<"user_roles">} user={user as Tables<"users_profile">} isBusy={isBusy} />



                    })

            }
        </ScrollAreaDashboard>
    )
}
