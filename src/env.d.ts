export type Laboratory = {
  lab_id: number;
  lab_label: string;
  lab_subject: int;
  busy_by?: number;
  is_busy: boolean;
  capacity: number;
};

export type Client = {
  client_id: number;
  no_control: string;
  first_name: string;
  last_name: string;
  type_id: number;
  created_at: string;
  created_by: number;
};

export type ClientType = {
  type_id: number;
  type: string;
};

export type Subject = {
  subject_id: number;
  subject_label: string;
};
