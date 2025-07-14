export type Lead = {
  id: string;
  created_at: string;
  updated_at: string;
  country: string;
  type: string;
  name: string;
  phone: string;
  website: string;
  linkedin: string;
  instagram: string;
  facebook: string;
  email: string;
  favorite: boolean;
  description: string;
  actions: Action[];
}

export type Action = {
  id: string;
  created_at: string;
  updated_at: string;
  name: string;
  status: string;
  description: string;
  alarm: number;
}