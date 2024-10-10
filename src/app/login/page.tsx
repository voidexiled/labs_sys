"use server";
import { MainWrapper } from "@/components/main-wrapper";
import { MainWrapperContent } from "@/components/main-wrapper-content";
import { MainWrapperHeader } from "@/components/main-wrapper-header";
import { redirect } from "next/navigation";

import { LoginForm } from "@/components/login/LoginForm";
import readUserSession from "@/lib/actions";
import "../globals.css";
import createSupabaseServer from "@/lib/supabase/server";

export default async function LoginPage() {
	const {
		data: { user },
	} = await readUserSession();

	if (user) {
		const supabase = await createSupabaseServer();
		const { data: roles } = await supabase.from("roles").select("*");
		const { data: currUser } = await supabase
			.from("users")
			.select("*")
			.eq("id", user.id)
			.single();
		const role = roles?.find((r) => r.id === currUser?.role_id);
		if (role) {
			if (role.id === 1 || role.id === 2) {
				return redirect("/dashboard/admin/panel");
			}
			if (role.id === 3) {
				return redirect("/dashboard/labadmin/home");
			}
			if (role.id === 4) {
				return redirect("/dashboard/teacher/home");
			}
			if (role.id === 5) {
				return redirect("/dashboard/student/home");
			}
		}
	}

	return <LoginForm />;
}
