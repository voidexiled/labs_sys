'use client';
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider } from "./theme-provider"


export const Providers = async (props: Readonly<{ children: React.ReactNode }>) => {

    return (

        <ThemeProvider attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange>
            <NextUIProvider>

                {props.children}
            </NextUIProvider>
        </ThemeProvider>

    )
}
