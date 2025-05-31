export type Payment = {
  id: string;
  type: string;
  amount: number;
  currency: string;
  until: string | null;
  project_id: string | null;
  created_at: string;
  rate: number;
  projects: Project;
}

export type Project = {
  id: string;
  payments: Payment[];
  created_at: string;
  project_name: string;
  client_name: string;
  start_date: string | null;
  end_date: string | null;
  premium: boolean;
}