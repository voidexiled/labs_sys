"use server";
import { Button } from "@/components/ui/button";
import createSupabaseServer from "@/lib/supabase/server";
import { QueryClient } from "@tanstack/react-query";
import { AspectRatio } from '@/components/ui/aspect-ratio';
import Image from "next/image";
import { Suspense } from "react";

export default async function Page({ params }: { params: { courseCode: string } }) {
    const queryClient = new QueryClient();
    const supabase = await createSupabaseServer();

    const { data: courseData, error: courseError } = await supabase.from("courses").select("id, teacher_id, label, classroom_code, subject_id, subjects ( id, label )").eq("classroom_code", params.courseCode).single();

    console.log("courseData", courseData)

    const { data: { user } } = await supabase.auth.getUser();

    if (!user || !courseData) { return <></> }

    const { data: teacherData, error: teacherError } = await supabase.from("users").select("*").eq("id", courseData.teacher_id).single();

    const { data: userData, error: userError } = await supabase.from("users").select("*").eq("id", user.id).single();


    if (!teacherData) { return <></> }



    let teacherUrlImage: string | null = null;
    if (teacherData.image_url) {
        teacherUrlImage = `${supabase.storage.from("avatars").getPublicUrl(teacherData.image_url).data.publicUrl}?t=${new Date().getTime()}`;
    }

    const nameInitialsTeacher = teacherData.display_name?.split(" ").map((name) => name[0]).join("").slice(0, 1).toUpperCase();
    console.log("urlimg", teacherUrlImage)
    return (
        <div className="w-screen h-screen flex justify-center items-center ">

            <div className="m-auto flex flex-col items-center justify-center gap-8 bg-card border rounded-md p-6  shadow-lg w-[400px] max-w-md">
                <div className="flex flex-col items-center justify-center gap-1">
                    <h1 className="text-2xl font-semibold ">Has recibido una invitación!</h1>
                    <span className="text-base text-muted-foreground underline">{`${courseData.subjects?.label}  <Grupo ${courseData.label}>`}</span>
                    {/* <span className="text-xs text-muted-foreground">Ingresa a la clase con tu profesor.</span> */}
                </div>
                <div className="flex grow flex-col gap-6">
                    <div className="flex flex-row  items-center self-center bg-accent rounded-md px-3 py-2 hover:bg-accent/80 transition-all shadow-sm hover:shadow-lg ">
                        <div className="rounded-md relative h-11 w-11 shadow-inset shadow overflow-hidden">
                            {
                                teacherUrlImage ? (

                                    <Image fill alt={`${teacherData.display_name} profile photo`} src={teacherUrlImage} className="object-cover object-center" />

                                ) : (
                                    <div className="bg-muted h-full w-full justify-center items-center flex shadow shadow-inset">
                                        {
                                            teacherData.display_name ? (
                                                <span className="text-base font-semibold text-center">{nameInitialsTeacher}</span>
                                            ) : (
                                                <span className="text-base font-semibold text-center">?</span>
                                            )
                                        }
                                    </div>
                                )
                            }
                        </div>
                        <div className="flex flex-col h-full grow justify-between items-start px-2 gap-1  pl-3">
                            <span className="text-sm font-semibold ">{teacherData.display_name}</span>
                            <span className="text-sm text-muted-foreground">{courseData.subjects?.label}</span>


                        </div>
                    </div>
                    <Button className="w-full h-11 hover:shadow-[0_20px_50px] hover:shadow-primary/15 transition-all">Unirse</Button>

                </div>


            </div>
        </div>
    )
}