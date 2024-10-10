"use client";
import { createSupabaseBrowser } from "@/lib/supabase/browser";
import { Tables } from "@/lib/types/supabase";
import { useQuery } from "@tanstack/react-query";

import { getStudentsWithProfiles } from "@/app/actions/teachers";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Link } from "lucide-react";
import { useEffect } from "react";
import { GroupUserListItem } from "./group_user_list_item";

export const GroupUserList = ({ courseId }: { courseId: number }) => {
	const {
		data: courseStudents,
		error: errorCourseStudents,
		refetch: refetchCourseStudents,
	} = useQuery({
		queryKey: ["students_course", courseId],
		queryFn: () => getStudentsWithProfiles({ params: { courseId: courseId } }),
	});

	return (
		<motion.div
			className="flex h-full w-full flex-col justify-start"
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ delay: 0.08 }}
		>
			<div className="flex w-full flex-row flex-wrap items-center justify-center gap-2 py-3 text-lg md:justify-between">
				<Button variant="link" className="gap-3">
					<Link width={16} height={16} />
					Compartir enlace de grupo
				</Button>
			</div>
			<div className="flex w-full flex-col gap-3">
				{courseStudents ? (
					courseStudents.map(async (course_student) => {
						const user = course_student.users;
						if (!user) {
							return null;
						}
						return (
							<GroupUserListItem
								key={user.id}
								refetchCourseStudents={refetchCourseStudents}
								student={course_student}
								user={user}
							/>
						);
					})
				) : (
					<>Cargando</>
				)}
			</div>
		</motion.div>
	);
};
