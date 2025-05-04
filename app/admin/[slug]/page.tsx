import { createClient } from "@/utils/supabase/server";
import { notFound } from "next/navigation";
import PostOrForm from "./PostOrForm";

export default async function AdminBlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const supabase = await createClient();

  const prms = await params;

  const { data: post, error } = await supabase
    .from('posts')
    .select('*, user:users(*)') // Fetch all fields from the 'users' table
    .eq('slug', prms.slug)
    .single();


  if (error) {
    console.error('Error fetching posts:', error.message);
    return <div>Failed to load posts.</div>;
  }

  if (!post) return notFound();

  return (
    <main className="mx-auto px-4 py-10 pt-20 flex flex-col">
      <PostOrForm post={post}/>
    </main>
  );
}