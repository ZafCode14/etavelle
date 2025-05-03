'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { getBaseFromKeyword } from './getBaseFromKeyword'

export default function CreatePostForm() {
  const [keyword, setKeyword] = useState('');
  const [slug, setSlug] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [generating, setGenerating] = useState(false);

  const router = useRouter();
  const supabase = createClient();

  const handleGenerate = async () => {
    if (!keyword.trim()) return;
    setGenerating(true);

    try {
      const res = await getBaseFromKeyword(keyword);

      setSlug(res.slug);
      setTitle(res.title);
      setDescription(res.description);
    } catch (err) {
      console.error('Error generating post metadata:', err);
      alert('Failed to generate metadata');
    } finally {
      setGenerating(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.from('posts').insert([
      {
        slug,
        title,
        description,
        content: [],
      },
    ]);

    setLoading(false);

    if (error) {
      console.error('Error creating post:', error);
      alert('Failed to create post');
    } else {
      setKeyword('');
      setSlug('');
      setTitle('');
      setDescription('');
      router.refresh();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-10 mx-5">
      <div className="flex gap-2">
        <Input
          type="text"
          placeholder="Enter keyword"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <Button type="button" onClick={handleGenerate} disabled={generating}>
          {generating ? 'Generating...' : 'Generate'}
        </Button>
      </div>

      <Input
        type="text"
        placeholder="Slug"
        value={slug}
        onChange={(e) => setSlug(e.target.value)}
        required
      />
      <Input
        type="text"
        placeholder="Post Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <Textarea
        placeholder="Post Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
        rows={3}
      />

      <Button type="submit" disabled={loading}>
        {loading ? 'Publishing...' : 'Publish Post'}
      </Button>
    </form>
  );
}