import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Skeleton } from "@nextui-org/react";

export function LaboratoryItemSkeleton() {
    return (<div
        className="relative grid grid-cols-laboratory-item transition-all duration-300 hover:cursor-pointer group min-h-32 rounded-md hover:bg-secondary  "
    >
        <div className="py-3 overflow-visible h-full p-4 flex items-center transition-all">
            <AspectRatio ratio={16 / 9} className="">
                <Skeleton className="rounded-md object-cover w-full h-full"
                />
            </AspectRatio>
        </div>

        <div className="lab-info py-4 px-5 flex flex-col tracking-wider text-sm group-hover:text-foreground/90 transition-all text-pretty gap-3">

            <span className="text-sm text-foreground transition-all hover:font-medium">
                <Skeleton className="rounded-full w-[190px] h-3 " /></span>

            <span className="flex flex-col transition-colors group-hover:text-foreground"><Skeleton className="rounded-full w-[90px] h-3 " /></span>

            <span className="text-primary"><Skeleton className="rounded-full w-[220px] h-3 " /></span>
            <span className="decoration-primary text-primary"><Skeleton className="rounded-full w-[250px] h-3 " /></span>

        </div>



    </div>);
}