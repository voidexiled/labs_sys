import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "ITCM - Iniciar sesión - Gestión de laboratorios",
	description:
		"Aplicación web para la gestión de practicas, laboratorios, alumnos, horarios y cursos del Instituto Tecnológico de Ciudad Madero.",
	icons: {
		icon: "/logo-itcm-v2.png",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return <>{children}</>;
}
