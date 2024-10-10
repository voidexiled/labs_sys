import type { Profile } from "@/env";
import { create } from "zustand";

type State = {
	user: Profile;
	setUser: (user: Profile) => void;
	removeUser: () => void;
};

export const useAuth = create<State>((set) => ({
	user: { email: "", loggedIn: false, role: 5 },
	setUser: (user) => set({ user }),
	removeUser: () => set({ user: { email: "", loggedIn: false, role: 5 } }),
}));
