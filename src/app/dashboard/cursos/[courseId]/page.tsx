"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation"

export default function CourseItemPage({ params }: { params: { courseId: string } }) {
    const searchParams = useSearchParams();
    console.log(searchParams.get("prev"))
    return (
        <div>
            <h1>Course {params.courseId}</h1>
            {searchParams.get("prev") && <Link href={`/dashboard/cursos?${searchParams.get("prev")?.toString()}`}>Volver</Link>}
        </div>
    )
}