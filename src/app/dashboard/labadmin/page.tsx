import { verifyRoleRedirect } from "@/app/auth-server-action/actions";

export default async function LabAdminPage() {
    await verifyRoleRedirect([3]);
    return (
        <></>
    )
}