"use server";
import { verifyRoleRedirect } from "@/app/auth-server-action/actions";
import GroupCreator from "@/components/creators/group/group-creator";
import { MainWrapper } from "@/components/main-wrapper";
import { MainWrapperContent } from "@/components/main-wrapper-content";
import { MainWrapperHeader } from "@/components/main-wrapper-header";
import readUserSession from "@/lib/actions";
import createSupabaseServer from "@/lib/supabase/server";
import type { Tables } from "@/lib/types/supabase";

export default async function RegistrarGruposPage() {
	await verifyRoleRedirect([3]);

	const supabase = await createSupabaseServer();
	const {
		data: { user },
	} = await readUserSession();

	const { data: dataSubjects, error: SError } = await supabase
		.from("subjects")
		.select("*");
	const { data: dataTeachers, error: TError } = await supabase
		.from("users")
		.select("*")
		.eq("role_id", 4);
	if (!dataSubjects || !dataTeachers) {
		return <></>;
	}
	return (
		<MainWrapper>
			<MainWrapperHeader title="Nuevo grupo" />
			<MainWrapperContent>
				<GroupCreator
					subjects={dataSubjects as Tables<"subjects">[]}
					teachers={dataTeachers as Tables<"users">[]}
				/>
			</MainWrapperContent>
		</MainWrapper>
	);
}
