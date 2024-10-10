"use client";

import { getRequestsByCourseId } from "@/app/actions/teachers";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { AcceptRequestButton } from "./accept-request-button";
import { DeclineRequestButton } from "./decline-request-button";

export const RequestsList = ({ courseId }: { courseId: number }) => {
	const {
		data: requestsData,
		error: requestsError,
		isFetching: isFetchingRequests,
		refetch: refetchRequests,
	} = useQuery({
		queryKey: ["join_requests", courseId],
		queryFn: () => getRequestsByCourseId({ params: { courseId: courseId } }),
	});

	return (
		<div className="flex h-full w-full flex-col justify-start">
			{isFetchingRequests ? (
				<div>Loading...</div>
			) : (
				requestsData?.map((request) => {
					return (
						<div key={request.id}>
							<div className="flex flex-row items-center gap-2">
								<div className="flex flex-col">
									<span className="text-sm font-semibold">
										{request.users?.display_name}
									</span>
									<span className="text-xs text-muted-foreground">
										{request.users?.email}
									</span>
								</div>
								<div className="flex flex-col">
									<AcceptRequestButton
										refetchRequests={refetchRequests}
										requestId={request.id}
										courseId={courseId}
									/>
									<DeclineRequestButton
										requestId={request.id}
										courseId={courseId}
									/>
								</div>
							</div>
						</div>
					);
				})
			)}
		</div>
	);
};
