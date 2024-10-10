"use client";
import { cn } from "@/lib/utils";
// import { Input } from "@nextui-org/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Input } from "../ui/input";

export default function Search({
	placeholder,
	className,
}: { placeholder: string; className?: string }) {
	const searchParams = useSearchParams();
	const { replace } = useRouter();
	const pathname = usePathname();

	function handleSearch(term: string) {
		const params = new URLSearchParams(searchParams.toString());

		if (term) {
			params.set("q", term);
		} else {
			params.delete("q");
		}
		replace(`${pathname}?${params.toString()}`);

		// searchParams.set("page", 1);
		// searchParams.set("per_page", 10);
		// searchParams.set("order_by", "id");
		// searchParams.set("order_dir", "desc");
		// searchParams.set("filter_by", "all");
	}
	return (
		<Input
			className={cn("w-80", className)}
			placeholder={placeholder}
			defaultValue={searchParams.get("q")?.toString()}
			onChange={(e) => {
				// setSearchQuery(e.target.value); // old
				handleSearch(e.target.value);
			}}
		/>
	);
}
