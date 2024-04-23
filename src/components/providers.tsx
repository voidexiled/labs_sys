'use client';
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider } from "./theme-provider"
import QueryProvider from "./providers/query-provider";
import { TooltipProvider } from "./ui/tooltip";
import { ThemeProvider as NextThemeProvider } from "next-themes";

export const Providers = async (props: Readonly<{ children: React.ReactNode }>) => {

    return (
        <QueryProvider>
            <ThemeProvider attribute="class"
                defaultTheme="system"
                enableSystem
                storageKey="theme"
            >

                <NextUIProvider>
                    <NextThemeProvider attribute="class" defaultTheme="system">
                        <TooltipProvider>

                            {props.children}
                        </TooltipProvider>
                    </NextThemeProvider>
                </NextUIProvider>
            </ThemeProvider>
        </QueryProvider>

    )
}
