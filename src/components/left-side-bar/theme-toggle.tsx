"use client"



import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { SunIcon } from "@/icons/sun-icon"
import { MoonIcon } from "@/icons/moon-icon"
import Link from "next/link"
import clsx from "clsx"
import { useEffect, useState } from "react"

export function ModeToggle({isSmall}: {isSmall?: boolean}) {
    const { setTheme, theme, resolvedTheme } = useTheme()
    const [currentTheme, setCurrentTheme] = useState("")

    useEffect(() => {
        if (resolvedTheme) {
            if (resolvedTheme === "dark") {
                setCurrentTheme("claro")
            } else {
                setCurrentTheme("oscuro")
            }
        }
    }, [resolvedTheme])


    return (
        <>
        {isSmall ? (
        <Button variant="ghost" 
        className="absolute top-[15px] right-[15px]  stroke-foreground/80 text-foreground/80 z-10"
        onClick={() => {
            setTheme(resolvedTheme === "dark" ? "light" : "dark")
        }}
        >
            

    <SunIcon width={20} height={20} className="rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <MoonIcon width={20} height={20} className="absolute stroke-1 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        </Button>
        ) : (
        <Button variant="ghost"
            className={"lg:w-full lg:px-4 lg:py-3 flex flex-row items-center lg:justify-start justify-center lg:gap-4 p-0 text-sm transition-all rounded-sm  stroke-foreground/80 text-foreground/80 font-normal hover:bg-inherit"}
            onClick={() => {
                setTheme(resolvedTheme === "dark" ? "light" : "dark")

            }}
        >

            <SunIcon width={20} height={20} className="rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <MoonIcon width={20} height={20} className="absolute stroke-1 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="hidden lg:flex">Cambiar a {currentTheme}</span>


        </Button>
    )
        }
        </>
    )

}
