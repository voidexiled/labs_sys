import { ReactNode } from "react";
import { ScrollArea } from "./ui/scroll-area";
import clsx from "clsx";



export const ScrollAreaDashboard = ({ className, children }: { className?: string, children?: ReactNode }) => {
    return (
        <ScrollArea className={clsx("h-[340px] 2xl:h-[630px] pr-8 ", className)}>
            {children}
        </ScrollArea>
    )
}