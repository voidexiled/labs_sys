"use client";
import { SchoolIcon } from "@/icons/school-icon"

import Link from "next/link"
import { HomeIcon } from "@/icons/home-icon"
import { NavItem } from "./nav-item"
import { LaboratoriesIcon } from "@/icons/laboratories-icon"
import { TeachersIcon } from "@/icons/teachers-icon"
import { AnalyticsIcon } from "@/icons/analytics-icon"
import { ModeToggle } from "./theme-toggle"
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Input } from "./ui/input";
import { LogOutButton } from "./logout-button";
import { ExitIcon } from "@/icons/exit-icon";
export default function LeftMenu() {

    return (
        <aside className="absolute left-0 top-0 h-full w-[0%] overflow-hidden z-50 bg-background xl:relative xl:h-full xl:w-full border-r flex flex-col">
            {/* LOGO SIDE */}
            <div className="flex flex-row items-center justify-between pt-9 pb-5 px-8 border-b  stroke-foreground ">
                <Link href="/dashboard" >
                    <div className="logo flex flex-row gap-4 items-center justify-start">
                        <SchoolIcon width={22} height={22} />
                        <h1 className="font-medium">Gestión Académica</h1>
                    </div>
                </Link>
                <ModeToggle />

            </div>
            {/* NAV SIDE */}
            <nav
                className="flex flex-col items-start justify-start px-4 py-5 w-full h-full"
            >
                <NavItem href="/dashboard" title="Panel de administración" >
                    <HomeIcon width={20} height={20} />
                </NavItem>
                <NavItem href="/laboratorios" title="Laboratorios" >
                    <LaboratoriesIcon width={20} height={20} />
                </NavItem>
                <NavItem href="/clientes" title="Clientes" >
                    <TeachersIcon width={20} height={20} />
                </NavItem>
                {/* <NavItem href="/materias" title="Materias">
                    <TeachersIcon width={20} height={20} />
                </NavItem> */}
                <NavItem href="/estadisticas" title="Estadisticas" >
                    <AnalyticsIcon width={20} height={20} />
                </NavItem>
                <LogOutButton title="Cerrar sesión" >
                    <ExitIcon width={20} height={20} />
                </LogOutButton>


            </nav>

        </aside>
    )
}