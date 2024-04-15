
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import LeftMenu from "@/components/left-menu";
import { Providers } from "@/components/providers";
import { Toaster } from "@/components/ui/toaster"


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
        <div className="flex flex-row flex-nowrap flex-shrink flex-grow-0">
            <LeftMenu />
            <div className="relative flex w-full h-screen">
                {children}
            </div>
        </div>

    );
}
