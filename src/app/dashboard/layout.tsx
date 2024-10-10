import LeftMenu from "@/components/left-side-bar/left-menu";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "ITCM - Dashboard - Gestión de laboratorios ",
	description:
		"Aplicación web para la gestión de practicas, laboratorios, alumnos, horarios y cursos del Instituto Tecnológico de Ciudad Madero.",
	icons: {
		icon: "/logo-itcm-v2.png",
	},
};

export default function AdminLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div className="flex flex-col bg-background/60 lg:flex-row">
			<LeftMenu />
			<div className="relative flex h-screen w-full">{children}</div>
		</div>
	);
}
