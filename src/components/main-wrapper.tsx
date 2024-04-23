"use client"

import { ScrollArea } from "./ui/scroll-area"
import { motion } from "framer-motion";
export const MainWrapper = (props: { children: React.ReactNode }) => {
    return (
        <ScrollArea className="h-full w-full ">


            <motion.main
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="h-full w-full grid min-h-screen">
                <div className="m-auto relative rounded-sm  w-full h-full flex flex-col">
                    {props.children}
                </div>
            </motion.main>
        </ScrollArea>
    )
}