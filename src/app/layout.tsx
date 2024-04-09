
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Lato, Roboto } from "next/font/google";
import { Providers } from "@/components/providers";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const roboto = Roboto({
  weight: ["100", "300", "400", "500", "700", "900"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
})
const lato = Lato({
  weight: ["100", "300", "400", "700", "900"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
})
  // Add CSS imports for specific routes
  ;

export const metadata: Metadata = {
  title: "ITCM - Gestión de laboratorios",
  description: "Aplicación web para la gestión de practicas, laboratorios, alumnos, horarios y cursos del Instituto Tecnológico de Ciudad Madero.",
  icons: {
    icon: "/logo-itcm-v2.png",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>

      <body className={"min-h-screen bg-background text-foreground " + roboto.className}>
        <Providers>
          <main className="h-full w-full relative">
            {children}
            <Toaster />
          </main>
        </Providers>
      </body>
    </html>
  );
}
