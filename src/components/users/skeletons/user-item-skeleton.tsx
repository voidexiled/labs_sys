import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Skeleton } from "@nextui-org/react";

export function UserItemSkeleton() {
	return (
		<div className="relative flex flex-row transition-all duration-300 hover:cursor-pointer group min-h-24 max-h-24 rounded-md border mb-3">
			<div className="hidden xs:flex xs:h-full xs:w-[100px] items-center overflow-visible p-4 py-3 transition-all self-center">
				<AspectRatio ratio={1 / 1} className=" rounded-md">
					<Skeleton className=" rounded-full object-cover w-full h-full" />
				</AspectRatio>
			</div>
			<div className="py-4 px-5 flex flex-col justify-between tracking-wider text-sm text-muted-foreground transition-all text-pretty">
				<span className="text-foreground group-hover:font-medium transition-all">
					<Skeleton className="w-[230px] h-3 rounded-full " />
				</span>
				<div className="flex flex-row gap-3 text-sm transition-all group-hover:pl-2 group-hover:text-foreground">
					<span>
						<Skeleton className="w-[100px] h-3 rounded-full " />
					</span>
				</div>
				<div className="flex flex-row gap-3 text-sm transition-all group-hover:pl-2 group-hover:text-foreground">
					<span>
						<Skeleton className="w-[190px] h-3 rounded-full " />
					</span>
				</div>
			</div>
		</div>
	);
}
