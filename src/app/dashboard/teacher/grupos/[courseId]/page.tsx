
import { verifyRoleRedirect } from "@/app/auth-server-action/actions";
import { GroupDetails } from "@/components/groups/group-details";
import { GroupWrapper } from "@/components/groups/group-wrapper";
import { ScrollArea } from "@/components/ui/scroll-area";
import readUserSession from "@/lib/actions";
import createSupabaseServer from "@/lib/supabase/server";
import { Tab, Tabs } from "@nextui-org/react";


export default async function Page({ params }: { params: { courseId: number } }) {

    await verifyRoleRedirect([4]);
    const { data: { user } } = await readUserSession();

    if (!user) { return <></> }
    const supabase = await createSupabaseServer();
    const { data: _user } = await supabase.from("users").select("*").eq("id", user.id).single();
    const { data: course } = await supabase.from("courses").select("*").eq("id", params.courseId).single();



    if (course?.teacher_id !== _user?.id) {
        return <div className="flex justify-center items-center text-3xl w-full">
            <span>ERROR: You are not the teacher of this course</span>

        </div>
    }

    if (!course) { return <></> }
    const { data: subject } = await supabase.from("subjects").select("*").eq("id", course.subject_id).single();
    const { data: units } = await supabase.from("units").select("*").eq("course_id", params.courseId);

    return (
        <GroupWrapper>
            <GroupDetails course={course} subject={subject} units={units} />
        </GroupWrapper>
    )
}