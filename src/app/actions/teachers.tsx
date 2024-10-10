"use server";
import createSupabaseServer from "@/lib/supabase/server";

export const getUnitAssignments = async ({
	params,
}: {
	params: { courseId: number; unitId: number };
}) => {
	const supabase = await createSupabaseServer();

	const { data: unitData, error: unitError } = await supabase
		.from("units")
		.select("*, assignments(*)")
		.eq("course_id", params.courseId)
		.eq("unit", params.unitId)
		.single();

	return unitData;
};

export const getAssignmentSubmissionsFrom = async ({
	params,
}: {
	params: { assignmentId: number };
}) => {
	const supabase = await createSupabaseServer();
	const { data: assignment } = await supabase
		.from("assignments")
		.select("*, submissions(*, users(*))")
		.eq("id", params.assignmentId)
		.single();
	return assignment;
};

export const getRequestsByCourseId = async ({
	params,
}: {
	params: { courseId: number };
}) => {
	const supabase = await createSupabaseServer();
	const { data: requests } = await supabase
		.from("courses_join_requests")
		.select("*, users(*)")
		.eq("course_id", params.courseId);
	return requests;
};

export const getSyllabusWithCourse = async ({
	params,
}: {
	params: { courseId: number };
}) => {
	console.log("params", params);
	const supabase = await createSupabaseServer();
	const { data: course } = await supabase
		.from("courses")
		.select("*, subjects(*, syllabuses(*))")
		.eq("id", params.courseId)
		.single();
	console.log("course", course);
	return course;
};

export const getStudentsWithProfiles = async ({
	params,
}: {
	params: { courseId: number };
}) => {
	const supabase = await createSupabaseServer();
	const { data: students } = await supabase
		.from("courses_students")
		.select("*, users(*)")
		.eq("course_id", params.courseId);
	return students;
};
