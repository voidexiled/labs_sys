"use client";
import { getSyllabusWithCourse } from "@/app/actions/teachers";
import { useQuery } from "@tanstack/react-query";
import { LoadingUnit } from "./loading_unit";

export const SyllabusItem = ({ courseId }: { courseId: number }) => {
	const {
		data: courseData,
		error: courseError,
		isFetching: isFetchingCourse,
		refetch: refetchCourse,
	} = useQuery({
		queryKey: ["course", courseId],
		queryFn: () => getSyllabusWithCourse({ params: { courseId: courseId } }),
	});

	if (courseError || isFetchingCourse || !courseData) {
		return <LoadingUnit />;
	}

	return (
		<div className="flex h-full w-full flex-col items-start justify-start px-6 py-5" />
	);
};
