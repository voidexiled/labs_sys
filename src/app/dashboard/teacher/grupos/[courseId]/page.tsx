"use server"
import createSupabaseServer from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function Page({ params }: { params: { courseId: number } }) {

    const supabase = await createSupabaseServer();
    const { data, error } = await supabase.from("units").select("*").eq("course_id", params.courseId);
    console.log(data, error)
    if (!data || data.length === 0) {
        return redirect(`/dashboard/teacher/grupos/`)
    } else {
        return redirect(`/dashboard/teacher/grupos/${params.courseId}/unidad/1`)
    }
    // console.log(data, error)

    return (
        <></>
    )
}