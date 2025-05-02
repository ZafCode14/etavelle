"use server";
import { createClient } from "@/utils/supabase/server";

export async function getAllSlugs() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('posts') // Replace with your table name
    .select('slug')
    .eq('active', true); // Assuming there's an "active" column for published posts

  if (error) {
    console.error('Error fetching slugs:', error);
    return [];
  }

  // Return the array of slugs
  return data.map(post => post.slug); // map the result to an array of slugs
}