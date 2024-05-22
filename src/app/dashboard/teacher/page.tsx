import { verifyRoleRedirect } from "@/app/auth-server-action/actions";


export default async function Page() {
    await verifyRoleRedirect([4]);
    return (
        <></>
    )
}