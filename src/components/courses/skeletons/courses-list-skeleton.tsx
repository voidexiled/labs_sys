import { CourseItemSkeleton } from "./course-item-skeleton";



export function CoursesListSkeleton(props: { len: number }) {
    return (
        <>
            {
                Array.from({ length: props.len }, (_, i) => (
                    <CourseItemSkeleton key={i} />
                ))
            }
        </>);
}