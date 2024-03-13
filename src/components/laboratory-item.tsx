"use client";
import Image from "next/image"
import { AspectRatio } from "./ui/aspect-ratio"
import { Button } from "./ui/button";
import { Client, Laboratory } from "@/env";
import { getType } from "@/services/clients_types.service";
import { getClient } from "@/services/clients.service";
import { useEffect, useState } from "react";
import { getSubject } from "@/services/subjects.service";


export const LaboratoryItem = (props: {
    lab: Laboratory
}) => {
    const [clientType, setClientType] = useState("");
    const [clientName, setClientName] = useState("");
    const [client, setClient] = useState<Client>();
    const [subject, setSubject] = useState("");

    useEffect(() => {

        const busyBy = props.lab.busy_by as number;
        if (busyBy >= 0) {


            getType(busyBy).then((type) => {
                if (typeof type === "string") {
                    setClientType(type);
                }
            }).catch((e) => console.log(e));
            getClient(busyBy).then((c) => {
                if (c) {
                    setClient(c);
                    setClientName(`${c.first_name} ${c.last_name}`);
                }

            }
            ).catch((e) => console.log(e));
        }
        if (props.lab.lab_subject >= 0) {
            console.log(props.lab.lab_subject);
            getSubject(props.lab.lab_subject).then((s) => {
                if (s) {
                    setSubject(s);
                }
            }).catch((e) => console.log(e));
        }
    }, [])

    return (


        <div
            className="relative grid grid-cols-laboratory-item transition-all duration-300 hover:pl-2 hover:cursor-pointer group min-h-32  "
            onClick={() => {

            }}
        >
            <div className="py-3 overflow-visible h-full p-4 flex items-center ">
                <AspectRatio ratio={16 / 9} className="">
                    <Image src="/laboratory_cx1.webp" alt="" fill className="drop-shadow-lg shadow-black rounded-md object-cover " />
                </AspectRatio>
            </div>

            <div className="lab-info py-3 px-5 flex flex-row lg:gap-6 tracking-wider text-sm group-hover:text-foreground/90 transition-all text-pretty">
                <div className="flex flex-col basis-[320px] text-muted-foreground font-normal">
                    <h3 className="text-lg text-foreground">{props.lab.lab_label}</h3>
                    <span className="">{subject}</span>

                    {
                        props.lab.is_busy
                            ? <><span>Ocupado por <span className="">{clientType}</span></span>
                                <span className="">{clientName}</span>
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

    )
}
