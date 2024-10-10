"use server";
import readUserSession from "@/lib/actions";
import createSupabaseServer from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function signInWithEmaildAndPassword(data: {
	email: string;
	password: string;
}) {}

export async function verifyRoleRedirect(expectedRoles?: number[]) {
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
			if (expectedRoles) {
				if (!expectedRoles.includes(role.id)) {
					return redirect("/dashboard/");
				}
			} else {
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
	} else {
		return redirect("/login");
	}
}

export async function verifyIsNotLoggedIn() {
	const {
		data: { user },
	} = await readUserSession();
	if (!user) {
		return redirect("/login");
	}
}
