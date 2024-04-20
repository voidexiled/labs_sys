import { ReactNode } from "react";
import { ScrollArea } from "./ui/scroll-area";
import clsx from "clsx";



export const ScrollAreaDashboard = ({ className, children }: { className?: string, children?: ReactNode }) => {
    return (
        <ScrollArea className={clsx(" xl:max-h-[500px] 2xl:max-h-[600px] px-6 lg:pr-8 lg:pl-0 ", className)}>
            {children}
        </ScrollArea>
    )
}