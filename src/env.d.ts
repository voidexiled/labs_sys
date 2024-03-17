export type Laboratory = {
  id: number;
  label: string;
  subjectId: int;
  busyBy?: number;
  isBusy: boolean;
  capacity: number;
};

export type Client = {
  id: number;
  noControl: string;
  firstName: string;
  lastName: string;
  typeId: number;
  createdAt: string;
  createdBy: number;
};

export type ClientType = {
  id: number;
  type: string;
};

export type Subject = {
  id: number;
  label: string;
};

export type User = {
  email: string;
  role: number;
  loggedIn: boolean;
};
