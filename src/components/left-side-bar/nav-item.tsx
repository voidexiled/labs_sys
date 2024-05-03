"use client";
import Link from "next/link";
import clsx from "clsx";
import { usePathname } from "next/navigation";


export const NavItem = (props: Readonly<{ href: string; title: string, children?: React.ReactNode }>) => {
    const pathname = usePathname()
    const isActive = pathname.startsWith(props.href)

    return (

        <Link href={props.href} className={clsx(isActive ? "bg-accent text-accent-foreground stroke-accent-foreground hover:text-accent-foreground hover:stroke-accent-foreground" : "text-foreground/80 stroke-foreground/80 hover:text-foreground hover:stroke-foreground hover:bg-secondary/30", " w-full px-4 py-2 flex flex-row items-center lg:justify-start justify-center gap-4 text-lg lg:text-sm transition-all rounded-sm active:bg-gray-700/20")}>
            {props.children}
            <span >{props.title}</span>
        </Link>

    )
}