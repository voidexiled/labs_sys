"use client";

import { useUser } from "@/hooks/useUser";
import { AnalyticsIcon } from "@/icons/analytics-icon";
import { AssignmentsIcon } from "@/icons/assignments-icon";
import { HomeIcon } from "@/icons/home-icon";
import { NotebookIcon } from "@/icons/notebook-icon";
import { NotesIcon } from "@/icons/notes-icon";
import { SubmissionsIcon } from "@/icons/submissions-icon";
import { TeachersIcon } from "@/icons/teachers-icon";
import { TeachingIcon } from "@/icons/teaching-icon";
import Image from "next/image";
import Link from "next/link";
import { DesktopNavItemList } from "./desktop-nav-item-list";
import { MobileNavItemList } from "./mobile-nav-item-list";
import { ModeToggle } from "./theme-toggle";

const defaultIconSize = {
	width: 20,
	height: 20,
};

type navItemsType = {
	admin: Array<{ href: string; title: string; icon: React.ReactNode }>;
	labadmin: Array<{ href: string; title: string; icon: React.ReactNode }>;
	teacher: Array<{ href: string; title: string; icon: React.ReactNode }>;
	student: Array<{ href: string; title: string; icon: React.ReactNode }>;
};

const navItems: navItemsType = {
	admin: [
		{
			href: "/dashboard/admin/panel",
			title: "Panel de administración",
			icon: <HomeIcon {...defaultIconSize} />,
		},
		{
			href: "/dashboard/admin/usuarios",
			title: "Usuarios",
			icon: <TeachersIcon {...defaultIconSize} />,
		},
		{
			href: "/dashboard/admin/laboratorios",
			title: "Laboratorios",
			icon: <TeachingIcon {...defaultIconSize} />,
		},
		{
			href: "/dashboard/admin/cursos",
			title: "Cursos",
			icon: <NotebookIcon {...defaultIconSize} />,
		},
		{
			href: "/dashboard/admin/practicas",
			title: "Prácticas",
			icon: <NotesIcon {...defaultIconSize} />,
		},
		{
			href: "/dashboard/admin/estadisticas",
			title: "Estadísticas",
			icon: <AnalyticsIcon {...defaultIconSize} />,
		},
	],
	labadmin: [
		{
			href: "/dashboard/labadmin/home",
			title: "Inicio",
			icon: <HomeIcon {...defaultIconSize} />,
		},
		{
			href: "/dashboard/labadmin/grupos",
			title: "Grupos",
			icon: <TeachersIcon {...defaultIconSize} />,
		},
	],
	teacher: [
		{
			href: "/dashboard/teacher/home",
			title: "Inicio",
			icon: <HomeIcon {...defaultIconSize} />,
		},
		{
			href: "/dashboard/teacher/grupos",
			title: "Grupos",
			icon: <TeachersIcon {...defaultIconSize} />,
		},
		// {
		//   href: "/dashboard/teacher/tareas",
		//   title: "Tareas",
		//   icon: <AssignmentsIcon {...defaultIconSize} />,
		// },
		// {
		//   href: "/dashboard/teacher/entregas",
		//   title: "Entregas",
		//   icon: <SubmissionsIcon {...defaultIconSize} />,
		// },
	],
	student: [
		{
			href: "/dashboard/student/home",
			title: "Inicio",
			icon: <HomeIcon {...defaultIconSize} />,
		},
		{
			href: "/dashboard/student/grupos",
			title: "Grupos",
			icon: <TeachersIcon {...defaultIconSize} />,
		},
	],
};

export default function LeftMenu() {
	const { isFetching: isFetchingUser, data: user } = useUser();

	if (!user) return <></>;
	const roleId = user.role_id;

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
							: "student";

	return (
		<aside className="sticky z-50 flex h-[60px] w-full flex-row items-center justify-between overflow-hidden border-r bg-background shadow-sm lg:relative lg:h-screen lg:w-[320px] lg:flex-col lg:items-start lg:justify-normal">
			{user && (
				<>
					<div className="hidden h-[90px] w-full flex-row items-center justify-between stroke-foreground px-8 pb-5 pt-9 lg:flex ">
						<Link href="/dashboard/panel">
							<div className="logo flex flex-row items-center justify-start gap-4">
								<Image
									width={150}
									height={150}
									alt="ITCM Logo"
									src="/logo-itcm-full-resolution.webp"
									className="h-[32px] w-[32px]"
								/>
								<h1 className="hidden lg:flex">ITCM Laboratorios</h1>
							</div>
						</Link>
					</div>
					<DesktopNavItemList items={navItems[userRole]} user={user} />
					<div className="hidden w-full px-4 py-6 lg:flex ">
						<ModeToggle />
					</div>
					<MobileNavItemList items={navItems[userRole]} user={user} />
				</>
			)}
		</aside>
	);
}
