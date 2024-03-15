"use client";
import Image from "next/image"
import { AspectRatio } from "./ui/aspect-ratio"
import { Client, ClientType, Laboratory } from "@/env";
import { useEffect, useState } from "react";
import { useClientsTypes } from "@/store/clients_types";
import { useClients } from "@/store/clients";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useSubjects } from "@/store/subjects";
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuSeparator, ContextMenuTrigger } from "./ui/context-menu";



export const LaboratoryItem = (props: {
    lab: Laboratory
}) => {
    const { types } = useClientsTypes();
    const { clients } = useClients();
    const { subjects } = useSubjects();
    // const supabase = createClientComponentClient();
    const [client, setClient] = useState<Client>();
    const [clientType, setClientType] = useState<string>("");
    const [subject, setSubject] = useState<string>("");

    useEffect(() => {
        const isBusy = props.lab.isBusy;
        if (isBusy) {
            const busyBy = props.lab.busyBy as number;
            if (busyBy >= 0) {
                const cli = clients.filter((c) => c.id === busyBy)[0];
                if (cli) {
                    setClient(cli);
                    const type = types.filter((t) => t.id === cli.typeId)[0];
                    if (type) {
                        setClientType(type.type);
                    }
                }

            }

        }
        if (props.lab.subjectId) {
            const sub = subjects.filter((s) => s.id === props.lab.subjectId)[0];
            if (sub) {
                setSubject(sub.label);
            }
        }
    }, [types, clients, subjects])
    return (

        <ContextMenu>
            <ContextMenuTrigger>
                <div
                    className="relative grid grid-cols-laboratory-item transition-all duration-300 hover:cursor-pointer group min-h-32  "
                    onClick={() => {

                    }}
                >
                    <div className="py-3 overflow-visible h-full p-4 flex items-center  transition-all ">
                        <AspectRatio ratio={16 / 9} className="">
                            <Image quality={45} src="/laboratory_cx1.webp" alt="" fill className="drop-shadow-lg shadow-black rounded-md object-cover " />
                        </AspectRatio>
                    </div>

                    <div className="lab-info py-3 px-5 flex flex-row lg:gap-6 tracking-wider text-sm group-hover:text-foreground/90 transition-all text-pretty group-hover:pl-6">
                        <div className="flex flex-col basis-[320px] text-muted-foreground font-normal">
                            <h3 className="text-lg text-foreground group-hover:underline transition-all">{props.lab.label}</h3>
                            <span className="">{subject}</span>

                            {
                                props.lab.isBusy
                                    ? <><span>Ocupado por <span className="">{clientType}</span></span>
                                        <span className="">{client ? `${client.firstName} ${client.lastName}` : ''}</span>
                                    </>
                                    : <span className="text-green-700 font-semibold">Disponible</span>
                            }

                        </div>
                        <div className="flex flex-col basis-[120px] text-muted-foreground">
                            <span>Capacidad: {props.lab.capacity}</span>
                        </div>
                        {/* <div className="ml-10">
                    <Button size="sm" variant="ghost" className="transition-all">Mantenimiento</Button>
                </div> */}

                    </div>



                </div>
            </ContextMenuTrigger>
            <ContextMenuContent>
                <ContextMenuItem disabled>Viendo {props.lab.label} </ContextMenuItem>
                {props.lab.isBusy ?
                    <ContextMenuItem>Desocupar</ContextMenuItem> :
                    <ContextMenuItem>Ocupar</ContextMenuItem>
                }
                <ContextMenuSeparator />
                <ContextMenuItem>Editar</ContextMenuItem>
                <ContextMenuSeparator />
                <ContextMenuItem>Más...</ContextMenuItem>
            </ContextMenuContent>
        </ContextMenu>
    )
}
