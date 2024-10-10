"use client";
import { Button } from "@/components/ui/button";
import { toast, useToast } from "@/components/ui/use-toast";
import { createSupabaseBrowser } from "@/lib/supabase/browser";

export const AcceptRequestButton = ({
	requestId,
	courseId,
	refetchRequests,
}: {
	requestId: number;
	courseId: number;
	refetchRequests: () => void;
}) => {
	const { toast } = useToast();

	const displayErrorMessage = (message: string) => {
		toast({
			title: "Error",
			description: message,
			variant: "destructive",
		});
	};

	const handleAcceptRequest = async () => {
		const supabase = createSupabaseBrowser();

		const { data: requestData, error: requestError } = await supabase
			.from("courses_join_requests")
			.select("*")
			.eq("id", requestId)
			.single();

		if (requestError || !requestData) {
			console.error(requestError.message);
			displayErrorMessage("Error al obtener la solicitud");
			return;
		}

		const { data: studentData, error: studentError } = await supabase
			.from("users")
			.select("*")
			.eq("id", requestData.student_id)
			.single();

		if (studentError || !studentData) {
			console.error(studentError.message);
			displayErrorMessage("Error al obtener al estudiante");
			return;
		}

		const { data: addStudentToCourseData, error: addStudentToCourseError } =
			await supabase
				.from("courses_students")
				.insert({
					course_id: courseId,
					student_id: studentData.id,
				})
				.select("*")
				.single();

		if (addStudentToCourseError || !addStudentToCourseData) {
			console.error(addStudentToCourseError.message);
			displayErrorMessage("Error al agregar al curso");
			return;
		}

		const { error: removeRequestError } = await supabase
			.from("courses_join_requests")
			.delete()
			.eq("id", requestId);

		if (removeRequestError) {
			console.error(removeRequestError.message);
			displayErrorMessage("Error al eliminar la solicitud");
			return;
		}

		toast({
			title: "Solicitud aceptada",
			description: `La solicitud de ${studentData.display_name} ha sido aceptada`,
			variant: "default",
		});
		refetchRequests();
	};

	return (
		<Button variant="outline" onClick={handleAcceptRequest}>
			Aceptar
		</Button>
	);
};
