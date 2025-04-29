'use server'
import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function logout() {
  const supabase = await createClient()

  const { error } = await supabase.auth.signOut()

  if (error) {
    // Optionally handle the error
    console.error('Logout failed:', error.message)
    redirect('/error')
  }

  // After successful logout, send user to home or login
  redirect('/login')
}

export async function createBlogPost(formData: FormData) {
  const supabase = await createClient()

  const slug = formData.get('slug') as string
  const title = formData.get('title') as string
  const description = formData.get('description') as string
  const ogImage = formData.get('ogImage') as string
  const heroImage = formData.get('heroImage') as string
  const heroAlt = formData.get('heroAlt') as string
  const datePublished = formData.get('datePublished') as string

  const contentRaw = formData.get('content') as string

  const content = JSON.parse(contentRaw)

  const { error } = await supabase.from('blogs').insert({
    slug,
    title,
    description,
    ogImage,
    heroImage,
    heroAlt,
    datePublished,
    content,
  })

  if (error) {
    console.error(error)
    redirect('/error')
  }

  revalidatePath('/admin/')
}