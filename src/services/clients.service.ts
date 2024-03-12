import { CLIENTS } from "@/data/clients.data";
import { Client } from "@/env";

export const getClients = async () => {
  return CLIENTS;
};

export const getClient = async (id: number) => {
  const data = CLIENTS.find((client) => client.client_id === id);
  if (data) return data;
};

export const getClientByControl = async (control: string) => {
  const data = CLIENTS.find((client) => client.no_control === control);

  return data;
};

export const removeClient = async (id: number) => {
  const data = CLIENTS.filter((client) => client.client_id !== id);

  return data;
};

export const updateClient = async (client: Client) => {
  const data = CLIENTS.map((c) =>
    c.client_id === client.client_id ? client : c
  );

  return data;
};

export const addClient = async (client: Client) => {
  const data = [...CLIENTS, client];

  return data;
};
