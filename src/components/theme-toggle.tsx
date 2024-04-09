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

export function ModeToggle() {
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
        <Button variant="ghost"
            className="w-full px-4 py-3 flex flex-row items-center justify-start gap-4 text-sm transition-all rounded-sm  stroke-foreground/80 text-foreground/80 font-normal hover:bg-inherit"
            onClick={() => {
                setTheme(resolvedTheme === "dark" ? "light" : "dark")

            }}
        >

            <SunIcon width={20} height={20} className="rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <MoonIcon width={20} height={20} className="absolute stroke-1 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span>Cambiar a {currentTheme}</span>


        </Button>


    )

}
