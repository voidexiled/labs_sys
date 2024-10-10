"use server";

import { getSyllabusWithCourse } from "@/app/actions/teachers";
import { verifyRoleRedirect } from "@/app/auth-server-action/actions";
import { SyllabusItem } from "@/components/teacher/groups/syllabus-item";
import {
	HydrationBoundary,
	QueryClient,
	dehydrate,
} from "@tanstack/react-query";

export default async function GeneralPage({
	params,
}: {
	params: { courseId: number };
}) {
	const queryClient = new QueryClient();
	const courseId = params.courseId;
	await verifyRoleRedirect([4]);

	await queryClient.prefetchQuery({
		queryKey: ["course", courseId],
		queryFn: () => getSyllabusWithCourse({ params: { courseId: courseId } }),
	});

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<div className="flex h-full w-full flex-col items-start justify-start px-6 py-5">
				<SyllabusItem courseId={courseId} />
			</div>
		</HydrationBoundary>
	);
}
