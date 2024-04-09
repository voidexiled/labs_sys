'use client';
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider } from "./theme-provider"
import QueryProvider from "./providers/query-provider";
import { TooltipProvider } from "./ui/tooltip";


export const Providers = async (props: Readonly<{ children: React.ReactNode }>) => {

    return (
        <QueryProvider>
            <ThemeProvider attribute="class"
                defaultTheme="system"
                enableSystem
                storageKey="theme"
            >
                <NextUIProvider>
                    <TooltipProvider>

                        {props.children}
                    </TooltipProvider>
                </NextUIProvider>
            </ThemeProvider>
        </QueryProvider>

    )
}
