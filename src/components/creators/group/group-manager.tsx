import { CoursesFilters } from "@/components/courses/courses-filters";
import { CoursesList } from "@/components/courses/courses-list";
import { Button } from "@/components/ui/button";
import type { Tables } from "@/lib/types/supabase";
import Link from "next/link";

type GroupManagerProps = {
	className?: string;
	courses: Tables<"courses">[] | null;
	students: Tables<"users">[] | null;
	courses_students: Tables<"courses_students">[] | null;
	searchParams: {
		query: string;
		status: string;
		subject: string;
		teacher: string;
		page: number;
	};
};

export const GroupManager = ({
	searchParams,
	className,
	courses,
	courses_students,
	students,
}: GroupManagerProps) => {
	return (
		<div>
			<CoursesFilters />
			<CoursesList
				currentPage={searchParams.page}
				q={searchParams.query}
				status={searchParams.status}
				subject={searchParams.subject}
				teacher={searchParams.teacher}
			/>
		</div>
	);
};
