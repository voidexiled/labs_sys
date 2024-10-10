import createSupabaseServer from "@/lib/supabase/server";

export const getStudentsCourses = async () => {
	const supabase = await createSupabaseServer();
	const {
		data: { user },
		error: userError,
	} = await supabase.auth.getUser();

	if (!user || userError) {
		return [];
	}

	const { data: studentsCourses, error: studentsCoursesError } = await supabase
		.from("courses_students")
		.select("*, courses(*, subjects(*))")
		.eq("student_id", user.id);

	if (!studentsCourses || studentsCoursesError) {
		return [];
	}

	return studentsCourses;
};
