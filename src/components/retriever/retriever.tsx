"use client";
import { ClientsRetriever } from './clients-retriever';
import { ClientsTypesRetriever } from './clients-types-retriever';
export const Retriever = () => {
    return (
        <>
            <h1>hola</h1>
            <ClientsRetriever />
            <ClientsTypesRetriever />
        </>
    )
}

// TODO: - Pasar los retrievers a funciones de utilidad para ejecutarlas al re-renderizar la aplicacion (root page.tsx)