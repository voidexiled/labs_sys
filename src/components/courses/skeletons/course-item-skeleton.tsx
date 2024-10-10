import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Skeleton } from "@nextui-org/react";
import Image from "next/image";

export function CourseItemSkeleton() {
	return (
		<div className="relative flex flex-row min-h-28 max-h-28 rounded-md mb-3 border">
			<Skeleton className=" mx-3 flex items-center justify-center h-[64px] w-[64px] rounded-full self-center border " />
			<div className="py-4 px-5 flex flex-col justify-between tracking-wider text-sm text-muted-foreground transition-all text-pretty">
				<Skeleton className="w-[200px] h-3 rounded-full " />

				<Skeleton className="w-[160px] h-3 rounded-full " />
				<Skeleton className="w-[100px] h-3 rounded-full " />
			</div>
		</div>
	);
}
