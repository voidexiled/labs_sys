import { CLIENT_TYPES } from "@/data/client_types.data";

export const getType = async (type_id: number) => {
  const data = CLIENT_TYPES.find((type) => type.type_id === type_id);
  console.log(data);
  return data?.type;
};
