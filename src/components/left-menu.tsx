"use client"



// ICONS 
import { SchoolIcon } from "@/icons/school-icon"
import { HomeIcon } from "@/icons/home-icon"
import { TeachersIcon } from "@/icons/teachers-icon"
import { AnalyticsIcon } from "@/icons/analytics-icon"
import { LogOutIcon } from "@/icons/logout-icon"
import { LogOutButton } from "./logout-button"
import { ScheduleIcon } from "@/icons/schedule-icon"
import { SettingsIcon } from "@/icons/settings-icon"
import { NotesIcon } from "@/icons/notes-icon"
import { NotebookIcon } from "@/icons/notebook-icon"
import { TeachingIcon } from "@/icons/teaching-icon"

// Local Components
import { NavItem } from "./nav-item"
import { ModeToggle } from "./theme-toggle"

// Shadcn Components

// Next Components
import Link from "next/link"
import UserPreview from "./left-side-bar/user-preview"
import Image from "next/image"
import { Button } from "./ui/button"
import { TagIcon } from "lucide-react"
import { useState } from "react"
import clsx from "clsx"
import { useTheme } from "next-themes"
import { SunIcon } from "@/icons/sun-icon"
import { MoonIcon } from "@/icons/moon-icon"


export default function LeftMenu() {
    const [isOpen, setIsOpen] = useState(false);
    const { theme, resolvedTheme, setTheme } = useTheme()

    return (

        <aside className={clsx("relative w-[350px] max-w-[350px] h-screen border-r overflow-hidden z-50 bg-background flex flex-col items-start shadow-sm ")}
        >
            {/* TODO: MOBILE ASIDE */}
            {/* LOGO SIDE */}
            <div className="flex flex-row w-full items-center justify-between pt-9 pb-5 px-8 border-b stroke-foreground ">
                <Link href="/dashboard/panel" >
                    <div className="logo flex flex-row gap-4 items-center justify-start">
                        <Image width={150} height={150} alt="ITCM Logo" src="/logo-itcm-full-resolution.webp" className="h-[32px] w-[32px]"></Image>
                        <h1 className="text-pretty">Gestión de Laboratorios</h1>
                    </div>
                </Link>


            </div>
            {/* NAV SIDE */}
            <nav
                className="flex flex-col items-start justify-start px-4 py-5 w-full h-full"
            >

                <NavItem href="/dashboard/panel" title="Panel de administración" >
                    <HomeIcon width={20} height={20} />
                </NavItem>

                <NavItem href="/dashboard/usuarios" title="Usuarios" >
                    <TeachersIcon width={20} height={20} />
                </NavItem>
                <NavItem href="/dashboard/laboratorios" title="Laboratorios" >
                    <TeachingIcon width={20} height={20} />
                </NavItem>
                <NavItem href="/dashboard/cursos" title="Cursos" >
                    <NotebookIcon width={20} height={20} />
                </NavItem>

                <NavItem href="/dashboard/practicas" title="Prácticas" >
                    <NotesIcon width={20} height={20} />
                </NavItem>

                {/* <NavItem href="/dashboard/equipment" title="Equipamento" >
                    <EquipmentIcon width={20} height={20} />
                </NavItem> */}

                <NavItem href="/dashboard/horario" title="Horario" >
                    <ScheduleIcon width={20} height={20} />
                </NavItem>

                <NavItem href="/dashboard/estadisticas" title="Estadísticas" >
                    <AnalyticsIcon width={20} height={20} />
                </NavItem>



                <NavItem href="/dashboard/configuracion" title="Configuración" >
                    <SettingsIcon width={20} height={20} />
                </NavItem>



                <LogOutButton title="Cerrar sesión" >
                    <LogOutIcon width={20} height={20} />
                </LogOutButton>

                {/* <NavItem href="/login" title="Iniciar sesión" >
                    <LogInIcon width={20} height={20} />
                </NavItem> */}





            </nav>
            {/* <ModeToggle /> */}

            <div className="px-4 py-6 ">
                <ModeToggle />
            </div>


        </aside>
    )
}