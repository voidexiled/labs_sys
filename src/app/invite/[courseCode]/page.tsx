"use server";
import { RequestJoinCourseButton } from "@/components/students/RequestJoinCourseButton";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import createSupabaseServer from "@/lib/supabase/server";
import { QueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { Suspense } from "react";

export default async function Page({
	params,
}: {
	params: { courseCode: string };
}) {
	const queryClient = new QueryClient();
	const supabase = await createSupabaseServer();

	const { data: courseData, error: courseError } = await supabase
		.from("courses")
		.select(
			"id, teacher_id, label, classroom_code, subject_id, subjects ( id, label )",
		)
		.eq("classroom_code", params.courseCode)
		.single();

	console.log("courseData", courseData);

	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (!user || !courseData) {
		return <></>;
	}

	const { data: teacherData, error: teacherError } = await supabase
		.from("users")
		.select("*")
		.eq("id", courseData.teacher_id)
		.single();

	const { data: userData, error: userError } = await supabase
		.from("users")
		.select("*")
		.eq("id", user.id)
		.single();

	if (!teacherData) {
		return <></>;
	}

	let teacherUrlImage: string | null = null;
	if (teacherData.image_url) {
		teacherUrlImage = `${
			supabase.storage.from("avatars").getPublicUrl(teacherData.image_url).data
				.publicUrl
		}?t=${new Date().getTime()}`;
	}

	const nameInitialsTeacher = teacherData.display_name
		?.split(" ")
		.map((name) => name[0])
		.join("")
		.slice(0, 1)
		.toUpperCase();
	console.log("urlimg", teacherUrlImage);

	return (
		<div className="flex h-screen w-screen items-center justify-center ">
			<div className="m-auto flex w-[400px] max-w-md flex-col items-center justify-center gap-8 rounded-md border  bg-card p-6 shadow-lg">
				<div className="flex flex-col items-center justify-center gap-1">
					<h1 className="text-2xl font-semibold ">
						Has recibido una invitación!
					</h1>
					<span className="text-base text-muted-foreground underline">{`${courseData.subjects?.label}  <Grupo ${courseData.label}>`}</span>
					{/* <span className="text-xs text-muted-foreground">Ingresa a la clase con tu profesor.</span> */}
				</div>
				<div className="flex grow flex-col gap-6">
					<div className="flex flex-row  items-center self-center rounded-md bg-accent px-3 py-2 shadow-sm transition-all hover:bg-accent/80 hover:shadow-lg ">
						<div className="shadow-inset relative h-11 w-11 overflow-hidden rounded-md shadow">
							{teacherUrlImage ? (
								<Image
									fill
									alt={`${teacherData.display_name} profile photo`}
									src={teacherUrlImage}
									className="object-cover object-center"
								/>
							) : (
								<div className="shadow-inset flex h-full w-full items-center justify-center bg-muted shadow">
									{teacherData.display_name ? (
										<span className="text-center text-base font-semibold">
											{nameInitialsTeacher}
										</span>
									) : (
										<span className="text-center text-base font-semibold">
											?
										</span>
									)}
								</div>
							)}
						</div>
						<div className="flex h-full grow flex-col items-start justify-between gap-1 px-2  pl-3">
							<span className="text-sm font-semibold ">
								{teacherData.display_name}
							</span>
							<span className="text-sm text-muted-foreground">
								{courseData.subjects?.label}
							</span>
						</div>
					</div>
					<RequestJoinCourseButton
						courseId={courseData.id}
						studentId={user.id}
					/>
				</div>
			</div>
		</div>
	);
}
