import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import { cn } from "@/lib/utils";

import { ParsedUrlQueryInput } from "querystring";



export const ListPagination = (
    {
        currentPage,
        pages,
        query,
        nextQuery,
        previousQuery
    }:
        {
            currentPage: number;
            pages: number[];
            query: ParsedUrlQueryInput;
            nextQuery: ParsedUrlQueryInput;
            previousQuery: ParsedUrlQueryInput;

        }
) => {


    const getQueryOfCurrentPage = (page: number) => {
        const queryCurrentPage = query;
        queryCurrentPage.page = page;
        return queryCurrentPage;
    }

    return <Pagination>
        <PaginationContent>
            {
                currentPage > 1 && (
                    <PaginationItem>
                        <PaginationPrevious href={{
                            pathname: ``,
                            query: previousQuery
                        }} />
                    </PaginationItem>
                )
            }

            {
                pages.map((page) => (
                    <PaginationItem key={page.toString()}

                    >
                        <PaginationLink href={{
                            pathname: ``,
                            query: {
                                ...query,
                                page: page
                            }
                        }}
                            className={cn(currentPage === page && "bg-primary text-primary-foreground hover:bg-primary/80 hover:text-primary-foreground/80")}>
                            {page.toString()}
                        </PaginationLink>
                    </PaginationItem>
                ))
            }
            <PaginationItem>
                <PaginationEllipsis />
            </PaginationItem>
            {
                currentPage <= pages.length - 1 && (
                    <PaginationItem>
                        <PaginationNext href={{
                            pathname: ``,
                            query: nextQuery
                        }} />
                    </PaginationItem>
                )
            }

        </PaginationContent>
    </Pagination>
}