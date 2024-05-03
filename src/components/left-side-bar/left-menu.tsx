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
import Image from "next/image"
import { Button } from "../ui/button"
import { MenuIcon } from "lucide-react"
import { useEffect, useState } from "react"
import clsx from "clsx"
import { useTheme } from "next-themes"
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "../ui/drawer"
import { usePathname } from "next/navigation"
import { useUser } from "@/hooks/useUser"
import { AssignmentsIcon } from "@/icons/assignments-icon"
import { SubmissionsIcon } from "@/icons/submissions-icon"


export default function LeftMenu() {
    const [isOpen, setIsOpen] = useState(false);
    const { theme, resolvedTheme, setTheme } = useTheme()
    const pathname = usePathname()
    const { isFetching: isFetchingUser, data: user } = useUser()
    const [isUser, setIsUser] = useState(false);

    console.log("user roleId", user?.role_id)
    console.log(user?.role_id === 1 || user?.role_id === 2)
    useEffect(() => {
        setIsOpen(false)
    }, [pathname])

    useEffect(() => {
        setIsUser(!!user);
    }, [user])

    return (

        <aside className={clsx("sticky lg:relative h-[60px] w-full  lg:w-[320px] lg:h-screen overflow-hidden z-50 bg-background flex flex-row lg:flex-col items-center justify-between lg:items-start lg:justify-normal shadow-sm border-r ")}
        >
            {
                user &&
                (

                    <>
                        <div className="hidden lg:flex flex-row w-full items-center justify-between h-[90px] pt-9 pb-5 px-8 stroke-foreground ">
                            <Link href="/dashboard/panel" >
                                <div className="logo flex flex-row gap-4 items-center justify-start">
                                    <Image width={150} height={150} alt="ITCM Logo" src="/logo-itcm-full-resolution.webp" className="h-[32px] w-[32px]"></Image>
                                    <h1 className="hidden lg:flex">ITCM Laboratorios</h1>
                                </div>
                            </Link>


                        </div>
                        <nav className="hidden lg:flex flex-row lg:flex-col items-start justify-center lg:justify-start px-1 lg:px-4 py-5 w-full h-full gap-1"
                        >

                            {
                                /* JEFE DE DEPARTAMENTO */
                                user && (user.role_id === 1 || user.role_id === 2) && (
                                    <>
                                        <NavItem href="/dashboard/admin/panel" title="Panel de administración" >
                                            <HomeIcon width={20} height={20} />
                                        </NavItem>

                                        <NavItem href="/dashboard/admin/usuarios" title="Usuarios" >
                                            <TeachersIcon width={20} height={20} />
                                        </NavItem>
                                        <NavItem href="/dashboard/admin/laboratorios" title="Laboratorios" >
                                            <TeachingIcon width={20} height={20} />
                                        </NavItem>
                                        <NavItem href="/dashboard/admin/cursos" title="Cursos" >
                                            <NotebookIcon width={20} height={20} />
                                        </NavItem>
                                        <NavItem href="/dashboard/admin/practicas" title="Prácticas" >
                                            <NotesIcon width={20} height={20} />
                                        </NavItem>
                                        <NavItem href="/dashboard/admin/estadisticas" title="Estadísticas" >
                                            <AnalyticsIcon width={20} height={20} />
                                        </NavItem>


                                    </>
                                )
                            }
                            {
                                /* JEFE DE LABORATORIO */
                                user && (user.role_id === 3) && (
                                    <>
                                        <NavItem href={"/dashboard/labadmin/home"} title="Inicio" >
                                            <HomeIcon width={20} height={20} />
                                        </NavItem>
                                        <NavItem href={"/dashboard/labadmin/grupos"} title="Grupos" >
                                            <TeachersIcon width={20} height={20} />
                                        </NavItem>
                                    </>
                                )
                            }
                            {
                                /* DOCENTE */
                                user && (user.role_id === 4) && (
                                    <>
                                        <NavItem href={"/dashboard/teacher/home"} title="Inicio" >
                                            <HomeIcon width={20} height={20} />
                                        </NavItem>
                                        <NavItem href={"/dashboard/teacher/grupos"} title="Grupos" >
                                            <TeachersIcon width={20} height={20} />
                                        </NavItem>
                                        <NavItem href={"/dashboard/teacher/tareas"} title="Tareas" >
                                            <AssignmentsIcon width={20} height={20} />
                                        </NavItem>
                                        <NavItem href={"/dashboard/teacher/entregas"} title="Entregas" >
                                            <SubmissionsIcon width={20} height={20} />
                                        </NavItem>
                                    </>
                                )
                            }

                            <NavItem href="/dashboard/configuracion" title="Configuración" >
                                <SettingsIcon width={20} height={20} />
                            </NavItem>
                            <LogOutButton title="Cerrar sesión" >
                                <LogOutIcon width={20} height={20} />
                            </LogOutButton>
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


                                <Link href="/dashboard/" >
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
                                        {
                                            user && (user.role_id === 1 || user.role_id === 2) && (
                                                <>
                                                    <NavItem href="/dashboard/admin/panel" title="Panel de administración" />
                                                    <NavItem href="/dashboard/admin/usuarios" title="Usuarios" />
                                                    <NavItem href="/dashboard/admin/laboratorios" title="Laboratorios" />
                                                    <NavItem href="/dashboard/admin/cursos" title="Cursos" />
                                                    <NavItem href="/dashboard/admin/practicas" title="Prácticas" />
                                                    {/* <NavItem href="/dashboard/admin/horario" title="Horario" /> */}
                                                    <NavItem href="/dashboard/admin/estadisticas" title="Estadísticas" />
                                                </>
                                            )

                                        }
                                        {
                                            user && (user.role_id === 4) && (
                                                <>
                                                    <NavItem href={"/dashboard/teacher/home"} title="Inicio" />
                                                    <NavItem href={"/dashboard/teacher/grupos"} title="Grupos" />
                                                    <NavItem href={"/dashboard/teacher/tareas"} title="Tareas" />
                                                    <NavItem href={"/dashboard/teacher/entregas"} title="Entregas" />
                                                </>
                                            )
                                        }

                                        <NavItem href="/dashboard/configuracion" title="Configuración" />
                                        <LogOutButton title="Cerrar sesión" />
                                    </nav>
                                </DrawerFooter>
                            </DrawerContent>
                        </Drawer>
                    </>
                )

            }



        </aside>
    )
}