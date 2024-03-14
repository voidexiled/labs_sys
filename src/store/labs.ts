import { create } from "zustand";
import { type Laboratory } from "@/env";

// BORRAR CONSTANTES -> REEMPLAZAR POR FETCH..
import { LABORATORIES } from "@/data/lab_data.data";

type State = {
  laboratories: Laboratory[];
  setLaboratories: (labs: Laboratory[]) => void;
  removeLaboratory: (lab_id: number) => void;
  addLaboratory: (lab: Laboratory) => void;
  updateLaboratory: (lab: Laboratory) => void;
};

export const useLabs = create<State>((set) => ({
  laboratories: [],
  setLaboratories: (labs) => set({ laboratories: labs }),
  removeLaboratory: (lab_id) =>
    set((state) => ({
      laboratories: state.laboratories.filter((lab) => lab.lab_id !== lab_id),
    })),
  addLaboratory: (lab) =>
    set((state) => ({
      laboratories: [...state.laboratories, lab],
    })),
  updateLaboratory: (lab) =>
    set((state) => ({
      laboratories: state.laboratories.map((l) =>
        l.lab_id === lab.lab_id ? lab : l
      ),
    })),
}));
