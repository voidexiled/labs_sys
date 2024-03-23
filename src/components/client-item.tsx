import { Client, ClientType } from "@/env"
import { ContextMenu, ContextMenuContent, ContextMenuTrigger } from "./ui/context-menu"
import { AspectRatio } from "./ui/aspect-ratio"
import Image from "next/image"
import { useClientsTypes } from "@/store/clients_types"
import { useEffect, useState } from "react"
import { useLabs } from "@/store/labs"


export const ClientItem = (props: { client: Client }) => {
    const { laboratories } = useLabs();
    const { firstName, lastName, noControl, typeId, id, inLab, labAt } = props.client;
    const { types } = useClientsTypes();
    const [type, setType] = useState("???");


    useEffect(() => {
        const type = types.filter((t) => t.id === typeId)[0];
        console.log(type);
        if (type) {
            setType(type.type);
        }
    }, [typeId])

    const getLabNameById = (id: number) => {

        const lab = laboratories.filter((lab) => lab.id === id)[0];
        if (lab) {
            return lab.label;
        } else {
            return "not found";
        }
    }



    return <ContextMenu>
        <ContextMenuTrigger>
            <div
                className="relative grid grid-cols-client-item transition-all duration-300 hover:cursor-pointer group min-h-24 max-h-24 hover:bg-secondary rounded-md "

            >
                <div className=" flex items-center transition-all h-full w-full p-4 ">
                    <AspectRatio ratio={1 / 1} className="bg-zinc-400/80 rounded-md">
                        <Image loading="lazy" quality={45} src="/laboratory_cx1.webp" alt="" fill className="drop-shadow-lg shadow-black rounded-md object-cover transition-all opacity-0 duration-[2s] group-hover:opacity-100 group-hover:[box-shadow:0_0_6px_1px_rgba(0,0,0,0.08)] "
                            onLoadingComplete={(image) => {
                                image.classList.remove("opacity-0")
                                image.classList.add("opacity-80")
                            }}
                        />
                    </AspectRatio>
                </div>
                <div className="py-4 px-5 flex flex-col justify-between tracking-wider text-sm text-muted-foreground transition-all text-pretty">
                    <span className="text-foreground group-hover:font-medium transition-all">{firstName + " " + lastName}</span>
                    <div className="flex flex-row gap-3 text-sm transition-all group-hover:pl-2 group-hover:text-foreground">
                        <span>{noControl}</span>
                    </div>
                    <div className="flex flex-row gap-3 text-sm transition-all group-hover:pl-2 group-hover:text-foreground">
                        <span className="">{type}</span>
                        {
                            inLab ? (<>
                                <span> 	&middot; </span>
                                <span className="text-primary">  {labAt ? getLabNameById(labAt) : "not found"}</span>
                            </>) :
                                (<>

                                </>)
                        }
                    </div>

                </div>
            </div>

        </ContextMenuTrigger>
        <ContextMenuContent>

        </ContextMenuContent>
    </ContextMenu>
}