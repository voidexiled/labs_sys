import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "@/components/ui/drawer";
import type { Tables } from "@/lib/types/supabase";
import { MenuIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { LogOutButton } from "./logout-button";
import { NavItem } from "./nav-item";
import { ModeToggle } from "./theme-toggle";

export const MobileNavItemList = (props: {
	items: Array<{ href: string; title: string; icon: React.ReactNode }>;
	user: Tables<"users">;
}) => {
	const [isOpen, setIsOpen] = useState(false);
	const pathname = usePathname();

	useEffect(() => {
		setIsOpen(false);
	}, [pathname]);

	const roleId = props.user?.role_id;

	const userRole =
		roleId === 5
			? "student"
			: roleId === 4
				? "teacher"
				: roleId === 3
					? "labadmin"
					: roleId === 2
						? "admin"
						: roleId === 1
							? "admin"
							: "unknown";

	return (
		<Drawer open={isOpen} onOpenChange={setIsOpen}>
			<div className="flex w-full flex-row items-center justify-between px-8 lg:hidden">
				<DrawerTrigger asChild>
					<Button
						onClick={() => setIsOpen(!isOpen)}
						className="flex flex-row items-center justify-center rounded-sm stroke-foreground/80 p-2 text-sm  font-normal text-foreground/80 transition-all hover:bg-inherit"
						variant="ghost"
					>
						<MenuIcon width={20} height={20} />
					</Button>
				</DrawerTrigger>

				<Link href="/dashboard/">
					<div className="logo flex flex-row items-center justify-start gap-4">
						<Image
							width={150}
							height={150}
							alt="ITCM Logo"
							src="/logo-itcm-full-resolution.webp"
							className="h-[32px] w-[32px]"
						/>
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
					<nav className="flex h-full w-full flex-col items-center justify-center px-1 pb-8 lg:px-4">
						{props.items.map((item) => {
							return (
								<NavItem key={item.href} href={item.href} title={item.title} />
							);
						})}

						<NavItem href="/dashboard/configuracion" title="Configuración" />
						<LogOutButton title="Cerrar sesión" />
					</nav>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	);
};
