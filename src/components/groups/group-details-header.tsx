"use server";

import { verifyRoleRedirect } from "@/app/auth-server-action/actions";
import readUserSession from "@/lib/actions";
import createSupabaseServer from "@/lib/supabase/server";
import { GroupWrapper } from "./group-wrapper";
import { GroupDetails } from "./group-details";
import { redirect } from "next/navigation";

export const GroupDetailsHeader = async ({
  params,
}: {
  params: { courseId: number; unitId: number };
}) => {
  await verifyRoleRedirect([4]);
  const {
    data: { user },
  } = await readUserSession();

  if (!user) {
    return <></>;
  }
  const supabase = await createSupabaseServer();
  const { data: _user } = await supabase
    .from("users")
    .select("*")
    .eq("id", user.id)
    .single();
  const { data: course } = await supabase
    .from("courses")
    .select("*")
    .eq("id", params.courseId)
    .single();

  if (course?.teacher_id !== _user?.id) {
    return redirect("/dashboard/teacher/grupos");
  }

  if (!course) {
    return <></>;
  }
  const { data: subject } = await supabase
    .from("subjects")
    .select("*")
    .eq("id", course.subject_id)
    .single();
  const { data: units } = await supabase
    .from("units")
    .select("*")
    .eq("course_id", params.courseId);

  return <GroupDetails course={course} subject={subject} units={units} />;
};
