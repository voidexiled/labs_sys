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
import UserPreview from "./user-preview"
import Image from "next/image"
import { Button } from "../ui/button"
import { MenuIcon, TagIcon } from "lucide-react"
import { useEffect, useState } from "react"
import clsx from "clsx"
import { useTheme } from "next-themes"
import { SunIcon } from "@/icons/sun-icon"
import { MoonIcon } from "@/icons/moon-icon"
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "../ui/drawer"
import { usePathname } from "next/navigation"


export default function LeftMenu() {
    const [isOpen, setIsOpen] = useState(false);
    const { theme, resolvedTheme, setTheme } = useTheme()
    const pathname = usePathname()

    useEffect(() => {
        setIsOpen(false)
    }, [pathname])

    return (

        <aside className={clsx("sticky lg:relative h-[60px] w-full lg:w-[320px] lg:h-screen border-r overflow-hidden z-50 bg-background flex flex-row lg:flex-col items-center justify-between lg:items-start lg:justify-normal shadow-sm ")}
        >
            {/* TODO: MOBILE ASIDE */}
            {/* LOGO SIDE */}
            <div className="hidden lg:flex flex-row w-full items-center justify-between pt-9 pb-5 px-8 border-b stroke-foreground ">
                <Link href="/dashboard/panel" >
                    <div className="logo flex flex-row gap-4 items-center justify-start">
                        <Image width={150} height={150} alt="ITCM Logo" src="/logo-itcm-full-resolution.webp" className="h-[32px] w-[32px]"></Image>
                        <h1 className="hidden xl:flex">ITCM Laboratorios</h1>
                    </div>
                </Link>


            </div>
            {/* NAV SIDE */}
            <nav className="hidden lg:flex flex-row lg:flex-col items-start justify-center lg:justify-start px-1 lg:px-4 py-5 w-full h-full"
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

            <div className="hidden lg:flex px-1 lg:px-4 py-6 ">
                <ModeToggle />
            </div>
            <Drawer open={isOpen} onOpenChange={setIsOpen}>
                <div className="flex px-8 lg:hidden flex-row items-center justify-between w-full">

                    <DrawerTrigger asChild>

                        <Button onClick={() => setIsOpen(!isOpen)} className=" flex flex-row items-center justify-center p-0 text-sm transition-all rounded-sm  stroke-foreground/80 text-foreground/80 font-normal hover:bg-inherit" variant="ghost">
                            <MenuIcon />
                        </Button>

                    </DrawerTrigger>


                    <Link href="/dashboard/panel" >
                        <div className="logo flex flex-row gap-4 items-center justify-start">
                            <Image width={150} height={150} alt="ITCM Logo" src="/logo-itcm-full-resolution.webp" className="h-[32px] w-[32px]"></Image>

                        </div>
                    </Link>
                    <ModeToggle />
                </div>
                <DrawerContent className=" lg:hidden">
                    <DrawerHeader>
                        <DrawerTitle>Instituto Tecnológico de Ciudad Madero</DrawerTitle>
                        <DrawerDescription>Gestor de laboratorios</DrawerDescription>
                    </DrawerHeader>
                    <DrawerFooter>
                        <nav className="flex flex-col items-center justify-center px-1 lg:px-4 pb-8 w-full h-full">
                            <NavItem href="/dashboard/panel" title="Panel de administración" />
                            <NavItem href="/dashboard/usuarios" title="Usuarios" />
                            <NavItem href="/dashboard/laboratorios" title="Laboratorios" />
                            <NavItem href="/dashboard/cursos" title="Cursos" />
                            <NavItem href="/dashboard/practicas" title="Prácticas" />
                            <NavItem href="/dashboard/horario" title="Horario" />
                            <NavItem href="/dashboard/estadisticas" title="Estadísticas" />
                            <NavItem href="/dashboard/configuracion" title="Configuración" />
                            <LogOutButton title="Cerrar sesión" />
                        </nav>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>


        </aside>
    )
}