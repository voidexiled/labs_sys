"use client";

// UI
import { AspectRatio } from "@/components/ui/aspect-ratio";
import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuSeparator,
    ContextMenuSub,
    ContextMenuSubContent,
    ContextMenuSubTrigger,
    ContextMenuTrigger,
} from "@/components/ui/context-menu";
import Image from "next/image";
// React

// Supabase & hooks
import { Tables } from "@/lib/types/supabase";
// Skeletons

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
export const LaboratoryItem = (props: {
    lab: Tables<"laboratories">;
    subject: Tables<"subjects">;
    type: Tables<"user_roles">
    user: Tables<"users_profile">;
    isBusy: boolean;
}) => {

    // DECOMPOSING PROPS
    const { lab, subject, type, user, isBusy } = props;

    // LOCAL VARS

    // const user = users.filter((user) => user.id === lab.busy_by)[0];
    // const subject = subjects.filter((subject) => subject.id === lab.subject_id)[0];
    // const userRole = types.filter((type) => isBusy ? type.id === user.role_id : false)[0];

    return (
        <ContextMenu>
            <ContextMenuTrigger>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="group relative grid min-h-32 grid-cols-laboratory-item rounded-md transition-all duration-300 hover:cursor-pointer hover:bg-secondary  "
                >
                    <div className="flex h-full items-center overflow-visible p-4 py-3 transition-all">
                        <AspectRatio ratio={16 / 9} className="">
                            <Image
                                loading="lazy"
                                quality={45}
                                src="/laboratory_cx1.webp"
                                alt=""
                                fill
                                className="duration-[2s] rounded-md object-cover opacity-0 shadow-black drop-shadow-lg transition-all group-hover:opacity-100 group-hover:[box-shadow:0_0_12px_1px_rgba(0,0,0,0.08)] "
                                onLoadingComplete={(image) => {
                                    image.classList.remove("opacity-0");
                                    image.classList.add("opacity-80");
                                }}
                            />
                        </AspectRatio>
                    </div>

                    <div className="lab-info flex flex-row text-pretty px-5 py-4 text-sm tracking-wider transition-all group-hover:text-foreground/90 lg:gap-6 ">
                        <div className="flex basis-[320px] flex-col gap-1 text-sm font-normal text-muted-foreground ">
                            <h3 className="text-sm text-foreground ">
                                <span className="">{lab.label}</span>{" "}
                                <span className="text-sm text-muted-foreground transition-colors group-hover:text-foreground">
                                    {" "}
                                    &middot; {subject && subject.label}
                                </span>{" "}
                            </h3>
                            <div className="flex flex-col gap-1 transition-all group-hover:pl-2">
                                <span className="flex flex-col transition-colors group-hover:text-foreground">
                                    Capacidad: {lab.capacity}
                                </span>

                                {isBusy ? (
                                    <>
                                        <span className="text-primary">
                                            Ocupado por <span className="">{type.label}</span>
                                        </span>
                                        <span className="text-primary decoration-primary">
                                            {user ? user.display_name : "???"}
                                        </span>
                                    </>
                                ) : (
                                    <span className="font-semibold text-green-700">
                                        Disponible
                                    </span>
                                )}
                            </div>
                        </div>
                        {/* <div className="flex flex-col basis-[120px] text-muted-foreground">
                            
                        </div> */}
                        {/* <div className="ml-10">
                    <Button size="sm" variant="ghost" className="transition-all">Mantenimiento</Button>
                </div> */}
                    </div>
                </motion.div>
            </ContextMenuTrigger>
            <ContextMenuContent>
                <ContextMenuItem disabled>Viendo {lab.label} </ContextMenuItem>
                {isBusy ? (
                    <>
                        <ContextMenuItem disabled>
                            Ocupando {user && user.display_name}{" "}
                        </ContextMenuItem>
                        <ContextMenuItem disabled>{type.label}</ContextMenuItem>
                        <ContextMenuItem>Desocupar</ContextMenuItem>
                    </>
                ) : (
                    <ContextMenuSub>
                        <ContextMenuSubTrigger>Ocupar</ContextMenuSubTrigger>
                        <ContextMenuSubContent>
                            <ContextMenuItem>Agendar</ContextMenuItem>
                            <ContextMenuItem>Ahora</ContextMenuItem>
                        </ContextMenuSubContent>
                    </ContextMenuSub>
                )}
                <ContextMenuSeparator />
                <ContextMenuSub>
                    <ContextMenuSubTrigger>Ver</ContextMenuSubTrigger>
                    <ContextMenuSubContent>
                        <ContextMenuItem>Agenda</ContextMenuItem>
                        <ContextMenuItem>Historial</ContextMenuItem>
                        <ContextMenuItem>Ultima sesión</ContextMenuItem>
                    </ContextMenuSubContent>
                </ContextMenuSub>
                <ContextMenuItem>Editar</ContextMenuItem>
                <ContextMenuSeparator />
                <ContextMenuItem>Más...</ContextMenuItem>
            </ContextMenuContent>
        </ContextMenu>
    );
};
