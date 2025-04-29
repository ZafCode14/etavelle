"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function togglePostActive(postSlug: string, newActiveStatus: boolean) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("posts")
    .update({ active: newActiveStatus })
    .eq("slug", postSlug);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath('/admin');
}
