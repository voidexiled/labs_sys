export type Laboratory = {
  id: number;
  label: string;
  subjectId: int;
  busyBy?: number;
  isBusy: boolean;
  capacity: number;
};

export type User = {
  id: number;
  noControl: string;
  firstName: string;
  lastName: string;
  typeId: number;
  createdAt: string;
  createdBy: number;
  inLab: boolean;
  labAt: number | null;
};

export type UserType = {
  id: number;
  type: string;
};

export type Subject = {
  id: number;
  label: string;
};

export type Profile = {
  email: string;
  role: number;
  loggedIn: boolean;
};


