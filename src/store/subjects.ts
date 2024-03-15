import { create } from "zustand";
import type { Subject } from "@/env";

type State = {
  subjects: Subject[];
  setSubjects: (client: Subject[]) => void;
  removeSubject: (id: number) => void;
  addSubject: (client: Subject) => void;
  updateSubject: (client: Subject) => void;
  clearSubjects: () => void;
};

export const useSubjects = create<State>((set) => ({
  subjects: [],
  setSubjects: (subjects) => set({ subjects }),
  removeSubject: (id) =>
    set((state) => ({
      subjects: state.subjects.filter((client) => client.id !== id),
    })),
  addSubject: (subject) =>
    set((state) => ({
      subjects: [...state.subjects, subject],
    })),
  updateSubject: (subject) =>
    set((state) => ({
      subjects: state.subjects.map((c) => (c.id === subject.id ? subject : c)),
    })),
  clearSubjects: () => set({ subjects: [] }),
}));
