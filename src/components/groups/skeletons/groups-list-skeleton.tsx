import { GroupItemSkeleton } from "./group-item-skeleton"

export const GroupsListSkeleton = ({ len }: { len: number }) => {
    return (
        <div className="flex flex-wrap flex-row gap-3 justify-center md:justify-normal">
            {
                Array.from({ length: len }, (_, i) => (
                    <GroupItemSkeleton key={i} />
                ))
            }

        </div>
    )
}