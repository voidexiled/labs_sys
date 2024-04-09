import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Skeleton } from "@nextui-org/react";
import Image from "next/image";


export function UserItemSkeleton() {
    return (<div
        className="relative grid grid-cols-client-item transition-all duration-300 hover:cursor-pointer group min-h-24 max-h-24 hover:bg-secondary rounded-md "

    >
        <div className=" flex items-center transition-all h-full w-full p-4 ">
            <AspectRatio ratio={1 / 1} className=" rounded-md">
                <Skeleton className=" rounded-md object-coverw-full h-full" />
            </AspectRatio>
        </div>
        <div className="py-4 px-5 flex flex-col justify-between tracking-wider text-sm text-muted-foreground transition-all text-pretty">
            <span className="text-foreground group-hover:font-medium transition-all">
                <Skeleton className="w-[240px] h-3 rounded-full " />
            </span>
            <Skeleton className=""></Skeleton>
            <div className="flex flex-row gap-3 text-sm transition-all group-hover:pl-2 group-hover:text-foreground">
                <span><Skeleton className="w-[100px] h-3 rounded-full " /></span>
            </div>
            <div className="flex flex-row gap-3 text-sm transition-all group-hover:pl-2 group-hover:text-foreground">
                <span><Skeleton className="w-[190px] h-3 rounded-full " /></span>


            </div>

        </div>
    </div>);
}