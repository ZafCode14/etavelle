export type User = {
  createdAt: string;
  updatedAt: string;
  id: string;
  name: string;
  prifile_pic: string;
  role: string;
  url: string;
}

export type Content = {
  type: string;
  value: string | { 
    fileUrl: string; 
    uniqueKey: string ;
    altText: string;
  };
}

export type Post = {
  title: string;
  description: string;
  slug: string;
  updated_at: string;
  created_at: string;
  id: number;
  hero_image: {
    fileUrl: string;
    uniqueKey: string;
    alt: string;
  };
  og_image: {
    fileUrl: string;
    uniqueKey: string;
  };
  user: User;
  content: Content[];
  active: boolean;
}