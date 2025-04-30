import { createClient } from '@/utils/supabase/server';
import Link from 'next/link';
import ActivateBlog from './[slug]/ActivateBlog';

export default async function Posts() {
  const supabase = await createClient();

  const { data: posts, error } = await supabase
    .from('posts')
    .select('*, user:users(*)') // Fetch all fields from the 'users' table

  if (error) {
    console.error('Error fetching posts:', error.message);
    return <div>Failed to load posts.</div>;
  }

  console.log('Fetched posts:', posts);

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4">Posts</h1>
      <div className="flex flex-col gap-4">
        {posts?.map((post) => (
          <Link href={`/admin/${post.slug}`} key={post.id} className="p-4 border rounded shadow relative">
            <div className='absolute right-5 top-5'>
              <ActivateBlog postSlug={post.slug} isActive={post.active}/>
            </div>
            <h3 className='text-gray-400'>{post.slug}</h3>
            <h2 className='!mb-0'>{post.title}</h2>
          </Link>
        ))}
      </div>
    </div>
  );
}