import { verifyRoleRedirect } from "@/app/auth-server-action/actions";
import { GroupDetails } from "@/components/groups/group-details";
import { GroupDetailsHeader } from "@/components/groups/group-details-header";
import { GroupWrapper } from "@/components/groups/group-wrapper";
import readUserSession from "@/lib/actions";
import createSupabaseServer from "@/lib/supabase/server";
import type { Metadata } from "next";
import { useEffect } from "react";

export const metadata: Metadata = {
	title: "ITCM - Dashboard - Gestión de laboratorios ",
	description:
		"Aplicación web para la gestión de practicas, laboratorios, alumnos, horarios y cursos del Instituto Tecnológico de Ciudad Madero.",
	icons: {
		icon: "/logo-itcm-v2.png",
	},
};

export default function AdminLayout({
	params,
	children,
}: Readonly<{
	params: { courseId: number; unitId: number };
	children: React.ReactNode;
}>) {
	return (
		<GroupWrapper>
			<GroupDetailsHeader params={params} />
			{/* <GroupDetails course={course} subject={subject} units={units} /> */}
			{children}
		</GroupWrapper>
	);
}
