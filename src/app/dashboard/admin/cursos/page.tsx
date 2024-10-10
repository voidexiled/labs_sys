"use server";
import {
	verifyIsNotLoggedIn,
	verifyRoleRedirect,
} from "@/app/auth-server-action/actions";
import { CoursesFilters } from "@/components/courses/courses-filters";
import { CoursesList } from "@/components/courses/courses-list";
import { Filters } from "@/components/filters";
import { MainWrapper } from "@/components/main-wrapper";
import { MainWrapperContent } from "@/components/main-wrapper-content";
import { MainWrapperHeader } from "@/components/main-wrapper-header";
import readUserSession from "@/lib/actions";
import createSupabaseServer from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function CursosPage({
	searchParams,
}: {
	searchParams?: {
		q?: string;
		status?: string;
		subject?: string;
		teacher?: string;
		page?: string;
	};
}) {
	const query = searchParams?.q || "";
	const status = searchParams?.status || "";
	const subject = searchParams?.subject || "";
	const teacher = searchParams?.teacher || "";
	const currentPage = Number(searchParams?.page) || 1;
	await verifyRoleRedirect([1, 2]);

	const supabase = await createSupabaseServer();

	const { data: roles } = await supabase.from("roles").select("*");

	return (
		<MainWrapper>
			<MainWrapperHeader title="Cursos" />
			<MainWrapperContent>
				<CoursesFilters />
				<CoursesList
					q={query}
					status={status}
					subject={subject}
					teacher={teacher}
					currentPage={currentPage}
				/>
			</MainWrapperContent>
		</MainWrapper>
	);
}
