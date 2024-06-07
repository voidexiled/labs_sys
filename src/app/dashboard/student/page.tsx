"use server";

import { verifyRoleRedirect } from "@/app/auth-server-action/actions";

export default async function StudentPage() {

    await verifyRoleRedirect([5]);
    return (
        <></>
    )
}