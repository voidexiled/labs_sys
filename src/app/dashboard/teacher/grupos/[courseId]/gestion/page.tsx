"use server";
import { getStudentsWithProfiles } from "@/app/actions/teachers";
import { GroupUserList } from "@/components/teacher/groups/group_user_list";
import createSupabaseServer from "@/lib/supabase/server";
import type { Tables } from "@/lib/types/supabase";
import {
	HydrationBoundary,
	QueryClient,
	dehydrate,
} from "@tanstack/react-query";

// switch to useQueryClient hook . prefetchQuery
// So can load easy

export default async function GestionPage({
	params,
}: {
	params: { courseId: number };
}) {
	const queryClient = new QueryClient();

	await queryClient.prefetchQuery({
		queryKey: ["students_course", params.courseId],
		queryFn: () =>
			getStudentsWithProfiles({ params: { courseId: params.courseId } }),
	});

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<div className="flex h-full w-full flex-col items-start justify-start px-6 py-5">
				<GroupUserList courseId={params.courseId} />
			</div>
		</HydrationBoundary>
	);
}
