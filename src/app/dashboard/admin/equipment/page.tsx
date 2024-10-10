"use server";
import { verifyRoleRedirect } from "@/app/auth-server-action/actions";
import { MainWrapper } from "@/components/main-wrapper";
import { MainWrapperContent } from "@/components/main-wrapper-content";
import { MainWrapperHeader } from "@/components/main-wrapper-header";
import readUserSession from "@/lib/actions";
import { redirect } from "next/navigation";

export default async function EquipmentPage() {
	await verifyRoleRedirect([1, 2]);
	return (
		<MainWrapper>
			<MainWrapperHeader title="Equipamento" />
			<MainWrapperContent />
		</MainWrapper>
	);
}
