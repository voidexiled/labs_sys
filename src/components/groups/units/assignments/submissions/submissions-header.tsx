"use client";

import { getAssignmentSubmissionsFrom } from "@/app/actions/teachers";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export const SubmissionsHeader = ({
	assignmentId,
	courseId,
	unitId,
}: {
	assignmentId: number;
	courseId: number;
	unitId: number;
}) => {
	const {
		isFetching: isFetchingAssignments,
		data: assignments,
		error: assignmentsError,
		refetch: refetchAssignments,
	} = useQuery({
		queryKey: ["unit_assignments", courseId, unitId],
		queryFn: () => getAssignmentSubmissionsFrom({ params: { assignmentId } }),
	});

	return (
		<div className="flex h-[80px] w-full flex-row items-center justify-between border-b bg-background px-8 lg:px-6">
			<Link
				href={`/dashboard/teacher/grupos/${courseId}/unidad/${unitId}`}
				className="flex flex-row items-center gap-6"
			>
				<Button variant="ghost" size="icon">
					<ArrowLeft width={20} height={20} />
					<span className="sr-only">Volver a prácticas</span>
				</Button>
				<h4>{assignments?.title}</h4>
			</Link>
		</div>
	);
};
