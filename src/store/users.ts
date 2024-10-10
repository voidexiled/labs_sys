import type { User } from "@/env";
import { create } from "zustand";

type State = {
	clients: User[];
	setClients: (client: User[]) => void;
	removeClients: (id: number) => void;
	addClient: (client: User) => void;
	updateClient: (client: User) => void;
	clearClients: () => void;
};

export const useClients = create<State>((set) => ({
	clients: [],
	setClients: (clients) => set({ clients }),
	removeClients: (id) =>
		set((state) => ({
			clients: state.clients.filter((client) => client.id !== id),
		})),
	addClient: (client) =>
		set((state) => ({
			clients: [...state.clients, client],
		})),
	updateClient: (client) =>
		set((state) => ({
			clients: state.clients.map((c) => (c.id === client.id ? client : c)),
		})),
	clearClients: () => set({ clients: [] }),
}));
