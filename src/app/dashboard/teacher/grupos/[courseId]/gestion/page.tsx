import { MainWrapper } from "@/components/main-wrapper";
import { MainWrapperContent } from "@/components/main-wrapper-content";
import { MainWrapperHeader } from "@/components/main-wrapper-header";
import createSupabaseServer from "@/lib/supabase/server";

export default async function GestionPage({ params }: { params: { courseId: number } }) {
    const supabase = await createSupabaseServer();
    const { data, error } = await supabase.from("courses_students").select("*").eq("course_id", params.courseId);
    if (error) {
        console.log(error)
        return <></>
    }
    if (!data || data.length === 0) {
        return <></>
    }

    return (
        <MainWrapper>
            <MainWrapperHeader title="Gestión de Grupos" />
            <MainWrapperContent>
                <div>
                    {data && data.map(async (course_student) => {
                        const { data: user, error: EUser } = await supabase.from("users").select("*").eq("id", course_student.student_id).single();
                        return (
                            <>
                                <span key={course_student.id}>{user?.display_name} - {user?.email} - {user?.no_identificador}</span>
                                <br></br>
                            </>
                        )
                    })}
                </div>
            </MainWrapperContent>
        </MainWrapper>
    )
}