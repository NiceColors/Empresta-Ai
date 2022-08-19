import { useMemo } from "react";
import { useInfiniteQuery, useQuery, UseQueryOptions } from "react-query";
import { setupAPIClient } from "../services/api";
import { api } from "../services/apiClient";

type IBook = {
    author: string;
    title: string;
    releaseYear: Date;
    rent: number;
    synopsis: string;
    pages: number;
    publisher: string;
    isbn: string;
    bannerUrl: string;
}


export async function getBooks(ctx: any): Promise<IBook[] | null> {


    const { data } = await api.get('http://localhost:3333/books');

    const books = data.books

    return books;
}


export const useBooks = (ctx: any, options?: any) => {
    return useQuery('books', () => getBooks(ctx), {
        staleTime: 1000 * 5, // 5 
        ...options
    })
}


// const books = useMemo(() => data?.pages.reduce((prev, page) => {
//     return {
//         info: page.info,
//         results: [...prev.results, ...page.results]
//     }
// }), [data])
