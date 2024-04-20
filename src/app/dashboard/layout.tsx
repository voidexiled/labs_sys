
import type { Metadata } from "next";
import LeftMenu from "@/components/left-side-bar/left-menu";



export const metadata: Metadata = {
    title: "ITCM - Dashboard - Gestión de laboratorios ",
    description: "Aplicación web para la gestión de practicas, laboratorios, alumnos, horarios y cursos del Instituto Tecnológico de Ciudad Madero.",
    icons: {
        icon: "/logo-itcm-v2.png",
    }
};

export default function AdminLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {


    return (
        <div className="flex flex-col lg:flex-row ">
            <LeftMenu />
            <div className="relative flex w-full h-screen">
                {children}
            </div>
        </div>

    );
}
