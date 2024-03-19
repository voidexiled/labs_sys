import { create } from "zustand";
import type { User } from "@/env";

type State = {
  user: User;
  setUser: (user: User) => void;
  removeUser: () => void;
};

export const useAuth = create<State>((set) => ({
  user: { email: "", loggedIn: false, role: 5 },
  setUser: (user) => set({ user }),
  removeUser: () => set({ user: { email: "", loggedIn: false, role: 5 } }),
}));
