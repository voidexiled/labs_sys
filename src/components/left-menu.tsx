"use client"
import { SchoolIcon } from "@/icons/school-icon"

import Link from "next/link"
import { HomeIcon } from "@/icons/home-icon"
import { NavItem } from "./nav-item"
import { LaboratoriesIcon } from "@/icons/laboratories-icon"
import { TeachersIcon } from "@/icons/teachers-icon"
import { AnalyticsIcon } from "@/icons/analytics-icon"
import { ModeToggle } from "./theme-toggle"
import { useEffect, useState } from "react";
import { redirect, usePathname, useRouter } from "next/navigation";
import { Input } from "./ui/input";
import { LogOutButton } from "./logout-button";
import { LogOutIcon } from "@/icons/logout-icon";
import { createClientComponentClient, createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { useAuth } from "@/store/auth"
import { LogInIcon } from "@/icons/login-icon"
import { ServicesIcon } from "@/icons/services-icon"
import { EquipmentIcon } from "@/icons/equipment-icon"
import { ScheduleIcon } from "@/icons/schedule-icon"
export default function LeftMenu() {
    const { user, setUser, removeUser } = useAuth();
    const router = useRouter();
    const pathname = usePathname();
    const supabase = createClientComponentClient();

    const verifyIsInDB = async (email: string) => {
        let user: {
            email: string;
            roleId: number;
            uuid: string;
        } = {
            email: email,
            roleId: 5,
            uuid: "",

        };
        // Verify if exist in db Users
        const { data, error } = await supabase.from('users').select('*').eq('email', email);
        // Getting UUID by cookies
        const uuid = (await supabase.auth.getUser()).data.user?.id;


        if (uuid) {
            user = { email: email, uuid: uuid, roleId: 5 }
        }
        if (data) {

            if (data.length === 0) {

                // console.log(uuid);
                if (uuid) {
                    // const createdAt = Date();
                    // const lastLoginAt = Date.now().valueOf();
                    // console.log(createdAt, lastLoginAt);

                    // insert the user row in users table if not exists
                    await supabase.from('users').insert(user);
                }
            } else {
                if (data[0]) {
                    user = { email: email, uuid: data[0].uuid, roleId: data[0].roleId }
                }
            }
        }
        if (error) {

            // console.log(error?.message)
        }

        return user;
    }

    const validateSession = () => {

        const isLogged = async () => {

            const { data, error } = await supabase.auth.getUser();
            if (error) {

            } else {
                console.log(data);
                if (data.user) {
                    if (data.user.email) {
                        const userInDb = await verifyIsInDB(data.user.email);
                        setUser({ email: data.user.email, loggedIn: true, role: userInDb.roleId });
                    }
                }
            }
        }
        isLogged().then(() => {
            console.log("then")
        }).catch(err => {
            console.log(err);
        }).finally(() => {
            // TODO: CHECK REDIRECT BUG (IF NEEDED) TO MANAGE AUTH WHEN ENTERING THE PAGE
            /* I THINK THIS IS BUGGING THE REDIRECTS !!  */
            // if (user.loggedIn) {
            //     if (pathname === "login") {
            //         router.replace("/");
            //     }
            // } else {
            //     if (pathname !== "/login") {
            //         router.replace("/login");
            //     }
            // }
        });


    }



    useEffect(() => {
        validateSession();
    }, [user.loggedIn]);


    const handleSignOut = async () => {
        await supabase.auth.signOut().then(() => {
            removeUser();
            router.replace("/login");
        }).catch((err: any) => {

        });
        router.refresh();
    }


    return (

        <aside className="absolute left-0 top-0 h-full w-[0%] overflow-hidden z-50 bg-background xl:relative xl:h-full xl:w-full border-r flex flex-col">
            {/* TODO: MOBILE ASIDE */}
            {/* LOGO SIDE */}
            <div className="flex flex-row items-center justify-between pt-9 pb-5 px-8 border-b  stroke-foreground ">
                <Link href="/dashboard" >
                    <div className="logo flex flex-row gap-4 items-center justify-start">
                        <SchoolIcon width={22} height={22} />
                        <h1 className="font-medium">Gestión de Laboratorios</h1>
                    </div>
                </Link>
                <ModeToggle />

            </div>
            {/* NAV SIDE */}
            <nav
                className="flex flex-col items-start justify-start px-4 py-5 w-full h-full"
            >
                {user.loggedIn ? (
                    <>
                        <NavItem href="/dashboard" title="Panel de administración" >
                            <HomeIcon width={20} height={20} />
                        </NavItem>

                        <NavItem href="/clientes" title="Clientes" >
                            <TeachersIcon width={20} height={20} />
                        </NavItem>
                        <NavItem href="/laboratorios" title="Laboratorios" >
                            <LaboratoriesIcon width={20} height={20} />
                        </NavItem>

                        <NavItem href="/servicios" title="Servicios" >
                            <ServicesIcon width={20} height={20} />
                        </NavItem>
                        <NavItem href="/equipment" title="Equipamento" >
                            <EquipmentIcon width={20} height={20} />
                        </NavItem>
                        <NavItem href="/estadisticas" title="Estadisticas" >
                            <AnalyticsIcon width={20} height={20} />
                        </NavItem>
                        <NavItem href="/horario" title="Horario" >
                            <ScheduleIcon width={20} height={20} />
                        </NavItem>


                        <LogOutButton title="Cerrar sesión" handleSignOut={handleSignOut}>
                            <LogOutIcon width={20} height={20} />
                        </LogOutButton>
                    </>
                ) :
                    <>
                        <NavItem href="/login" title="Iniciar sesión" >
                            <LogInIcon width={20} height={20} />
                        </NavItem>
                    </>
                }



            </nav>

        </aside>
    )
}