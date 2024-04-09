"use client";
import { useUser } from "@/hooks/useUser";

export function BodyPanel() {
    const { isFetching, data } = useUser();
    return (<>
        {isFetching ? <div>Loading...</div> : <div>Hello {data?.email}</div>}
    </>);
}