import { create } from "zustand";
import { type Client } from "@/env";

type State = {
  clients: Client[];
  setClients: (client: Client[]) => void;
  removeClients: (id: number) => void;
  addClient: (client: Client) => void;
  updateClient: (client: Client) => void;
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
