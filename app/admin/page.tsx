import { redirect } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { logout } from './actions'
import { createClient } from '@/utils/supabase/server';
import CreatePostForm from './CreaatePostForm';
import Posts from './Posts';
import Link from 'next/link';

export default async function AdminPage() {
  const supabase = await createClient();

  const { data: { user }, error: userError } = await supabase.auth.getUser();

  if (userError || !user) {
    redirect('/login');
  }

  return (
    <main className='pt-20 flex flex-col max-w-4xl mx-auto'>
      <div className='flex gap-3'>
        <Link href={'/admin/finance'}>
          <Button>Finance</Button>
        </Link>
        <Link href={'/admin/leads'}>
          <Button>Leads</Button>
        </Link>
      </div>
      <Button variant="destructive" className='self-end mx-5' onClick={logout}>Log Out</Button>
      <h1>Admin Page</h1>
      <CreatePostForm/>
      <Posts/>
    </main>
  )
}
