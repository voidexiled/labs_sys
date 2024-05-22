import { verifyRoleRedirect } from "@/app/auth-server-action/actions";

export default async function AdminPage() {
    await verifyRoleRedirect([1, 2]);
    return (
        <></>
    )
}