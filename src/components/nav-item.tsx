"use client";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import clsx from "clsx";
import { usePathname } from "next/navigation";


export const NavItem = (props: Readonly<{ href: string; title: string, children: React.ReactNode }>) => {
    const pathname = usePathname()
    const isActive = pathname.startsWith(props.href)

    return (
        <Link href={props.href} className={clsx(isActive ? "text-primary stroke-primary  " : "text-foreground stroke-foreground", " w-full px-4 py-3 flex flex-row items-center justify-start gap-4 text-sm transition-all rounded-sm hover:bg-muted active:bg-secondary/80")}>
            {props.children}
            <span>{props.title}</span>
        </Link>
    )
}