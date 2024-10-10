"use client";
import type { Tables } from "@/lib/types/supabase";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group";
import Search from "./users/search-input";

type pages = "courses" | "users" | "laboratories";
type cursosTabs = "active" | "inactive" | "completed";
type laboratoriesTabs = "busy" | "idle";

export const Filters = ({
	page,
	tabs,
}: {
	page: pages;
	tabs: Tables<"roles">[] | cursosTabs[] | laboratoriesTabs[];
}) => {
	const searchParams = useSearchParams();
	const { replace } = useRouter();
	const pathname = usePathname();

	function handleFilterRole(term: string) {
		const params = new URLSearchParams(searchParams.toString());

		if (term) {
			params.set("role", term);
		} else {
			params.set("role", "all");
		}
		replace(`${pathname}?${params.toString()}`);
	}

	function handleFilterStatus(term: string) {
		const params = new URLSearchParams(searchParams.toString());
		if (term) {
			params.set("status", term);
		} else {
			params.set("status", "all");
		}
		replace(`${pathname}?${params.toString()}`);
	}

	return (
		<>
			<div className="mb-4 flex w-full flex-row justify-between gap-1 rounded-md py-1 ">
				<ToggleGroup
					type="single"
					defaultValue={searchParams.get("role")?.toString() || "all"}
					variant="outline"
					onValueChange={(value: string) => {
						if (page === "laboratories" || page === "courses") {
							handleFilterStatus(value);
						} else if (page === "users") {
							handleFilterRole(value);
						}
					}}
				>
					<ToggleGroupItem
						value="all"
						className="font-normal data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
					>
						Todos
					</ToggleGroupItem>
					{tabs.map((tab) => {
						if (typeof tab === "string") {
							// tabs strings
							if (page === "laboratories") {
								// laboratorios page filters
								const label = tab === "busy" ? "Ocupado" : "Disponible";
								return (
									<ToggleGroupItem
										key={tab}
										value={tab}
										className="font-normal data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
									>
										{label}
									</ToggleGroupItem>
								);
							}
							if (page === "courses") {
								// cursos page filters
								const label =
									tab === "active"
										? "Activo"
										: tab === "completed"
											? "Completado"
											: "Inactivo";
								return (
									<ToggleGroupItem
										key={tab}
										value={tab}
										className="font-normal data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
									>
										{label}
									</ToggleGroupItem>
								);
							}
						} else {
							// Object
							if (page === "users") {
								// users page filters
								const label = tab.label.toLowerCase();
								return (
									<ToggleGroupItem
										key={tab.id}
										value={label}
										className="font-normal data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
									>
										{tab.label}
									</ToggleGroupItem>
								);
							}
						}
					})}
				</ToggleGroup>
				<ToggleGroup type="single" defaultValue="all">
					<Search placeholder="Buscar usuario..." />
				</ToggleGroup>
			</div>
		</>
	);
};
