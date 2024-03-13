'use client';
import { ThemeProvider } from "./theme-provider"
import { NextUIProvider } from "@nextui-org/react";

export const Providers = (props: Readonly<{ children: React.ReactNode }>) => {
    return (

        <ThemeProvider attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange>

            {props.children}

        </ThemeProvider>

    )
}
