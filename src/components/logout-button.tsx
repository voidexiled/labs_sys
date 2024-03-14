"use client";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Suspense, useEffect, useState } from "react";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";


export const LogOutButton = (props: { title: string, children: React.ReactNode }) => {
    const pathname = usePathname()

    return (

        <Link href="" className={clsx("text-foreground/80 stroke-foreground/80 hover:text-foreground hover:stroke-foreground", " w-full px-4 py-3 flex flex-row items-center justify-start gap-4 text-sm transition-all rounded-sm active:bg-gray-700/20")}
            onClick={() => {
                // logout()
            }}>
            {props.children}
            <span>{props.title}</span>
        </Link>

    )
}