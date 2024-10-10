import { verifyRoleRedirect } from "@/app/auth-server-action/actions";

export default async function StudentHomePage() {
	await verifyRoleRedirect([5]);
	return <></>;
}
