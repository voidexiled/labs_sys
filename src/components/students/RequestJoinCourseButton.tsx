"use client";

import { createSupabaseBrowser } from "@/lib/supabase/browser";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";

type RequestJoinCourseButtonProps = {
	courseId: number;
	studentId: string;
};

export const RequestJoinCourseButton = ({
	courseId,
	studentId,
}: RequestJoinCourseButtonProps) => {
	const { toast } = useToast();

	const handleRequestJoinCourse = async () => {
		const supabase = createSupabaseBrowser();

		const { data: verifyExistsRequest, error: verifyExistsRequestError } =
			await supabase
				.from("courses_join_requests")
				.select("*")
				.eq("course_id", courseId)
				.eq("student_id", studentId)
				.single();
		if (verifyExistsRequest) {
			toast({
				title: "Solicitud de unirse ya existe",
				description: "Solicitud de unirse ya existe",
				variant: "default",
			});
			return;
		}

		const { data: joinRequestData, error: joinRequestError } = await supabase
			.from("courses_join_requests")
			.insert({
				course_id: courseId,
				student_id: studentId,
			})
			.select("*, courses(*, subjects(*)), users(*, roles(*))");

		if (joinRequestError) {
			console.error(joinRequestError.message);
			return;
		}
		console.log("joinRequestData", joinRequestData);
		toast({
			title: "Solicitud de unirse creada",
			description: "Solicitud de unirse creada correctamente",
			variant: "default",
		});
	};
	return (
		<Button
			className="h-11 w-full transition-all hover:shadow-[0_20px_50px] hover:shadow-primary/15"
			onClick={handleRequestJoinCourse}
		>
			Unirse
		</Button>
	);
};
