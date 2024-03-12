import { SUBJECTS } from "@/data/subjects.data";
export const getSubject = async (subject_id: number) => {
  return SUBJECTS.find((subject) => subject.subject_id === subject_id)
    ?.subject_label;
};
