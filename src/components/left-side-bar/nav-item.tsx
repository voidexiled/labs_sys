"use client";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const NavItem = (
	props: Readonly<{ href: string; title: string; children?: React.ReactNode }>,
) => {
	const pathname = usePathname();
	const isActive = pathname.startsWith(props.href);

	return (
		<Link
			href={props.href}
			className={clsx(
				isActive
					? "bg-primary text-primary-foreground stroke-primary-foreground hover:text-primary-foreground/80 hover:stroke-primary-foreground/80 hover:bg-primary/80"
					: "text-secondary-foreground/80 stroke-secondary-foreground/80 hover:text-secondary-foreground hover:stroke-secondary-foreground hover:bg-secondary",
				"w-full px-4 py-2 flex flex-row items-center lg:justify-start justify-center gap-4 text-lg lg:text-sm transition-all rounded-sm active:bg-gray-700/20 ",
			)}
		>
			{props.children}
			<span>{props.title}</span>
		</Link>
	);
};
