import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";

import type { ParsedUrlQueryInput } from "node:querystring";

export const ListPagination = ({
	currentPage,
	pages,
	query,
	nextQuery,
	previousQuery,
}: {
	currentPage: number;
	pages: number[];
	query: ParsedUrlQueryInput;
	nextQuery: ParsedUrlQueryInput;
	previousQuery: ParsedUrlQueryInput;
}) => {
	// const getQueryOfCurrentPage = (page: number) => {
	// 	const queryCurrentPage = query;
	// 	queryCurrentPage.page = page;
	// 	return queryCurrentPage;
	// };

	return (
		<Pagination>
			<PaginationContent className="mb-12">
				{currentPage > 1 && (
					<PaginationItem>
						<PaginationPrevious
							href={{
								pathname: "",
								query: previousQuery,
							}}
						/>
					</PaginationItem>
				)}
				{pages.at(0)! <= currentPage - 2 && (
					<>
						<PaginationItem key={`${pages.at(0)}end`}>
							<PaginationLink
								href={{
									pathname: "",
									query: {
										...query,
										page: pages.at(0),
									},
								}}
								className={cn(
									currentPage === pages.at(0) &&
										"bg-primary text-primary-foreground hover:bg-primary/80 hover:text-primary-foreground/80",
								)}
							>
								{pages.at(0)?.toString()}
							</PaginationLink>
						</PaginationItem>
						<PaginationItem className="hidden lg:flex">
							<PaginationEllipsis />
						</PaginationItem>
					</>
				)}

				{pages.map((page) => {
					if (page > currentPage - 2 && page < currentPage + 2)
						return (
							<PaginationItem key={page.toString()}>
								<PaginationLink
									href={{
										pathname: "",
										query: {
											...query,
											page: page,
										},
									}}
									className={cn(
										currentPage === page &&
											"bg-primary text-primary-foreground hover:bg-primary/80 hover:text-primary-foreground/80",
									)}
								>
									{page.toString()}
								</PaginationLink>
							</PaginationItem>
						);
				})}

				{pages.length >= currentPage + 2 && (
					<>
						<PaginationItem className="hidden lg:flex">
							<PaginationEllipsis />
						</PaginationItem>
						<PaginationItem key={`${pages.length}end`}>
							<PaginationLink
								href={{
									pathname: "",
									query: {
										...query,
										page: pages.length,
									},
								}}
								className={cn(
									currentPage === pages.length &&
										"bg-primary text-primary-foreground hover:bg-primary/80 hover:text-primary-foreground/80",
								)}
							>
								{pages.length.toString()}
							</PaginationLink>
						</PaginationItem>
					</>
				)}

				{currentPage <= pages.length - 1 && (
					<PaginationItem>
						<PaginationNext
							href={{
								pathname: "",
								query: nextQuery,
							}}
						/>
					</PaginationItem>
				)}
			</PaginationContent>
		</Pagination>
	);
};
