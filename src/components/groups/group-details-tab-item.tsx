import { cn } from "@/lib/utils";
import Link from "next/link"
import { usePathname } from "next/navigation";

export const GroupDetailsTabItem = ({ title, href }: { title: string, href: string }) => {
    const pathname = usePathname()
    const isActive = pathname.startsWith(href)
    console.log(pathname)
    console.log(href)

    return (
        <Link href={href} title={title}
            className={cn("px-4 items-center flex flex-col h-full justify-center transition-all group hover:bg-accent border border-transparent hover:border-primary hover:text-accent-foreground/80", isActive && "bg-primary text-primary-foreground hover:bg-primary/80 hover:text-primary-foreground")}>
            <span className="rounded-sm whitespace-nowrap text-sm tracking-wider transition-all">{title}</span>
        </Link>
    )
}