import { LaboratoryItemSkeleton } from "./laboratory-item-skeleton";

export function LaboratoriesListSkeleton(props: { len: number }) {
    return (
        <>
            {
                Array.from({ length: props.len }, (_, i) => (
                    <LaboratoryItemSkeleton key={i} />
                ))
            }
        </>);
}