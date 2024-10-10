import type { UserType } from "@/env";
import { create } from "zustand";

type State = {
	types: UserType[];
	setTypes: (client: UserType[]) => void;
	removeTypes: (id: number) => void;
	addType: (client: UserType) => void;
	updateTypes: (client: UserType) => void;
	clearTypes: () => void;
};

export const useClientsTypes = create<State>((set) => ({
	types: [],
	setTypes: (types) => set({ types }),
	removeTypes: (id) =>
		set((state) => ({
			types: state.types.filter((client) => client.id !== id),
		})),
	addType: (client) =>
		set((state) => ({
			types: [...state.types, client],
		})),
	updateTypes: (client) =>
		set((state) => ({
			types: state.types.map((c) => (c.id === client.id ? client : c)),
		})),
	clearTypes: () => set({ types: [] }),
}));
