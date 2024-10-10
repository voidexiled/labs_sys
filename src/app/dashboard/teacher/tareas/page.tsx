"use server";
import { verifyRoleRedirect } from "@/app/auth-server-action/actions";
import { MainWrapper } from "@/components/main-wrapper";
import { MainWrapperContent } from "@/components/main-wrapper-content";
import { MainWrapperHeader } from "@/components/main-wrapper-header";

export default async function TareasPage() {
	await verifyRoleRedirect([4]);

	return (
		<MainWrapper>
			<MainWrapperHeader title="Tareas" />
			<MainWrapperContent />
		</MainWrapper>
	);
}
