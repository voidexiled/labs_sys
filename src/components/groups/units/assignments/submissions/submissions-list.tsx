"use client";

import { getAssignmentSubmissionsFrom } from "@/app/actions/teachers";
import { LoadingUnit } from "@/components/teacher/groups/loading_unit";
import { createSupabaseBrowser } from "@/lib/supabase/browser";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { SubmissionItem } from "./submission-item";
export const SubmissionsList = ({ assignmentId }: { assignmentId: number }) => {
	const {
		data: submissionsData,
		error: submissionsError,
		refetch: refetchSubmissions,
		isFetching: isFetchingSubmissions,
	} = useQuery({
		queryKey: ["assignments", assignmentId, "submissions"],
		queryFn: () => getAssignmentSubmissionsFrom({ params: { assignmentId } }),
	});

	if (submissionsError || isFetchingSubmissions) {
		return null;
	}
	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.32 }}
			className="flex w-full grow flex-col gap-2 border"
		>
			{
				<div>
					{submissionsData?.submissions?.map((submission) => (
						<SubmissionItem key={submission.id} submission={submission} />
					))}
				</div>
			}
		</motion.div>
	);
};
