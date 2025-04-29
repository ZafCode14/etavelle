"use server";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function addHeroImageToPost(postSlug: string, fileUrl: string, uniqueKey: string) {
  const supabase = await createClient();

  const { error } = await supabase
    .from('posts')
    .update({ hero_image: {fileUrl, uniqueKey, alt: ""} })
    .eq('slug', postSlug);

  if (error) {
    console.error("Failed to update hero image:", error.message);
    throw new Error(error.message);
  }

  revalidatePath('/admin');

  return { success: true };
}

export async function addOgImageToPost(postSlug: string, fileUrl: string, uniqueKey: string) {
  const supabase = await createClient();

  const { error } = await supabase
    .from('posts')
    .update({ og_image: {fileUrl, uniqueKey} })
    .eq('slug', postSlug);

  if (error) {
    console.error("Failed to update og image:", error.message);
    throw new Error(error.message);
  }

  revalidatePath('/admin');

  return { success: true };
}
