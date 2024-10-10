import { getAssignmentSubmissionsFrom } from "@/app/actions/teachers";
import { SubmissionsHeader } from "@/components/groups/units/assignments/submissions/submissions-header";
import { SubmissionsList } from "@/components/groups/units/assignments/submissions/submissions-list";
import { GroupUnitContainer } from "@/components/groups/units/group-unit-container";
import { Button } from "@/components/ui/button";
import createSupabaseServer from "@/lib/supabase/server";
import { QueryClient } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default async function Page({
	params,
}: { params: { courseId: string; unitId: string; assignmentId: string } }) {
	const courseId: number = Number(params.courseId);
	const unitId: number = Number(params.unitId);
	const assignmentId: number = Number(params.assignmentId);

	const queryClient = new QueryClient();

	queryClient.prefetchQuery({
		queryKey: ["unit_assignments", courseId, unitId],
		queryFn: () => getAssignmentSubmissionsFrom({ params: { assignmentId } }),
	});

	return (
		<>
			<SubmissionsHeader
				assignmentId={assignmentId}
				courseId={courseId}
				unitId={unitId}
			/>
			<GroupUnitContainer courseId={courseId} unitId={unitId}>
				<SubmissionsList assignmentId={assignmentId} />
			</GroupUnitContainer>
		</>
	);
}
