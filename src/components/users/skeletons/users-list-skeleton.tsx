import { UserItemSkeleton } from "./user-item-skeleton";


export function UsersListSkeleton(props: { len: number }) {
    return (
        <>
            {
                Array.from({ length: props.len }, (_, i) => (
                    <UserItemSkeleton key={i} />
                ))
            }
        </>);
}