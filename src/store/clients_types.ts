import { create } from "zustand";
import { type ClientType } from "@/env";

type State = {
  types: ClientType[];
  setTypes: (client: ClientType[]) => void;
  removeTypes: (id: number) => void;
  addType: (client: ClientType) => void;
  updateTypes: (client: ClientType) => void;
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
