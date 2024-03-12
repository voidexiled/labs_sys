import { Laboratory } from "@/env";
import { LABORATORIES } from "@/data/lab_data.data";

export const getLaboratories = async () => {
  //   const response = await fetch(
  //     `${process.env.NEXT_PUBLIC_API_URL}/laboratories`
  //   );
  //   const data = await response.json();
  const data: Laboratory[] = LABORATORIES;

  return data;
};

export const getLaboratory = async (id: number) => {
  //   const response = await fetch(
  //     `${process.env.NEXT_PUBLIC_API_URL}/laboratories/${id}`
  //   );
  //   const data = await response.json();
  if (!id) {
    return null;
  }
  const data = LABORATORIES.find((lab) => lab.lab_id === id);

  return data;
};

export const getLaboratoryBySubject = async (subject: string) => {
  //   const response = await fetch(
  //     `${process.env.NEXT_PUBLIC_API_URL}/laboratories?subject=${subject}`
  //   );
  //   const data = await response.json();
  const data = LABORATORIES.filter((lab) => lab.lab_subject === subject);

  return data;
};
export const getLaboratoryByStatus = async (status: boolean) => {
  //   const response = await fetch(
  //     `${process.env.NEXT_PUBLIC_API_URL}/laboratories?status=${status}`
  //   );
  //   const data = await response.json();
  const data = LABORATORIES.filter((lab) => lab.is_busy === status);

  return data;
};

export const removeLaboratory = async (id: number) => {
  //   const response = await fetch(
  //     `${process.env.NEXT_PUBLIC_API_URL}/laboratories/${id}`,
  //     {
  //       method: "DELETE",
  //     }
  //   );
  //   const data = await response.json();
  const data = LABORATORIES.filter((lab) => lab.lab_id !== id);

  return data;
};
export const updateLaboratory = async (lab: Laboratory) => {
  //   const response = await fetch(
  //     `${process.env.NEXT_PUBLIC_API_URL}/laboratories/${lab.lab_id}`,
  //     {
  //       method: "PUT",
  //       body: JSON.stringify(lab),
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     }
  //   );
  //   const data = await response.json();
  const data = LABORATORIES.map((l) => {
    if (l.lab_id === lab.lab_id) {
      return lab;
    }
    return l;
  });

  return data;
};
export const createLaboratory = async (lab: Laboratory) => {
  //   const response = await fetch(
  //     `${process.env.NEXT_PUBLIC_API_URL}/laboratories`,
  //     {
  //       method: "POST",
  //       body: JSON.stringify(lab),
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     }
  //   );
  //   const data = await response.json();
  const data = [...LABORATORIES, lab];

  return data;
};
