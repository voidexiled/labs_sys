"use client";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemeProvider } from "next-themes";
import QueryProvider from "./providers/query-provider";
import { ThemeProvider } from "./theme-provider";
import { TooltipProvider } from "./ui/tooltip";

export const Providers = async (
	props: Readonly<{ children: React.ReactNode }>,
) => {
	return (
		<QueryProvider>
			<ThemeProvider
				attribute="class"
				defaultTheme="system"
				enableSystem
				storageKey="theme"
			>
				<NextUIProvider>
					<NextThemeProvider attribute="class" defaultTheme="system">
						<TooltipProvider>{props.children}</TooltipProvider>
					</NextThemeProvider>
				</NextUIProvider>
			</ThemeProvider>
		</QueryProvider>
	);
};
