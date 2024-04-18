import { ReactNode } from "react";
import { ScrollArea } from "./ui/scroll-area";
import clsx from "clsx";



export const ScrollAreaDashboard = ({ className, children }: { className?: string, children?: ReactNode }) => {
    return (
        <ScrollArea className={clsx("max-h-[420px] 2xl:max-h-[600px] pr-8 ", className)}>
            {children}
        </ScrollArea>
    )
}