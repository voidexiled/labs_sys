"use server";
import { verifyRoleRedirect } from "@/app/auth-server-action/actions";
import { CoursesFilters } from "@/components/courses/courses-filters";
import { GroupsList } from "@/components/groups/groups-list";
import { MainWrapper } from "@/components/main-wrapper";
import { MainWrapperContent } from "@/components/main-wrapper-content";
import { MainWrapperHeader } from "@/components/main-wrapper-header";
import readUserSession from "@/lib/actions";
import createSupabaseServer from "@/lib/supabase/server";
import {
	HydrationBoundary,
	QueryClient,
	dehydrate,
} from "@tanstack/react-query";

export default async function GruposPage() {
	const queryClient = new QueryClient();
	await verifyRoleRedirect([4]);

	const {
		data: { user },
	} = await readUserSession();

	await queryClient.prefetchQuery({
		queryKey: ["courses", user?.id],
		queryFn: async () => {
			const supabase = await createSupabaseServer();
			const { data: coursesData, error } = await supabase
				.from("courses")
				.select("*")
				.eq("teacher_id", user?.id!);

			return coursesData;
		},
		retry: true,
	});

	await queryClient.prefetchQuery({
		queryKey: ["subjects"],
		queryFn: async () => {
			const supabase = await createSupabaseServer();
			const { data: subjectsData, error } = await supabase
				.from("subjects")
				.select("*");

			return subjectsData;
		},
	});

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<MainWrapper>
				<MainWrapperHeader title="Grupos" />
				<MainWrapperContent>
					{/* <CoursesFilters /> */}
					<GroupsList teacher_user={user} />
				</MainWrapperContent>
			</MainWrapper>
		</HydrationBoundary>
	);
}
