"use server";

import { getRequestsByCourseId } from "@/app/actions/teachers";
import { RequestsList } from "@/components/teacher/groups/requests/requests-list";
import { QueryClient } from "@tanstack/react-query";

export default async function Page({
  params,
}: {
  params: { courseId: number };
}) {
  const courseId = params.courseId;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["join_requests", courseId],
    queryFn: () => getRequestsByCourseId({ params: { courseId: courseId } }),
  });

  return (
    <div className="flex h-full w-full flex-col items-start justify-start px-6 py-5">
      <RequestsList courseId={courseId} />
    </div>
  );
}
