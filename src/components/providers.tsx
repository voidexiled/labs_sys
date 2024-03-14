'use client';
import { ThemeProvider } from "./theme-provider"


export const Providers = async (props: Readonly<{ children: React.ReactNode }>) => {

    return (

        <ThemeProvider attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange>

            {props.children}

        </ThemeProvider>

    )
}
