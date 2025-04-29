'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { MoveUp, MoveDown, Trash2 } from 'lucide-react'

type Block = {
  type: string;
  text: string;
};

export default function CreatePostForm() {
  const [slug, setSlug] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState<Block[]>([]);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const supabase = createClient();

  const handleBlockChange = (index: number, value: string) => {
    const updated = [...content];
    updated[index].text = value;
    setContent(updated);
  };

  const handleDeleteBlock = (index: number) => {
    setContent((prev) => prev.filter((_, i) => i !== index));
  };

  const handleMoveUp = (index: number) => {
    if (index === 0) return;
    const updated = [...content];
    const temp = updated[index - 1];
    updated[index - 1] = updated[index];
    updated[index] = temp;
    setContent(updated);
  };

  const handleMoveDown = (index: number) => {
    if (index === content.length - 1) return;
    const updated = [...content];
    const temp = updated[index + 1];
    updated[index + 1] = updated[index];
    updated[index] = temp;
    setContent(updated);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.from('posts').insert([
      {
        slug,
        title,
        description,
        content, // will be saved as JSON
      },
    ]);

    setLoading(false);

    if (error) {
      console.error('Error creating post:', error);
      alert('Failed to create post');
    } else {
      setSlug('');
      setTitle('');
      setDescription('');
      setContent([]);
      router.refresh();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-10 mx-5">
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

      {content.map((block, index) => (
        <div key={index} className="flex flex-col gap-2 border rounded-xl p-4 relative">
          <div className="absolute top-2 right-2 flex gap-1">
            <Button variant="outline" size="icon" type="button" onClick={() => handleMoveUp(index)}>
              <MoveUp className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" type="button" onClick={() => handleMoveDown(index)}>
              <MoveDown className="h-4 w-4" />
            </Button>
            <Button variant="destructive" size="icon" type="button" onClick={() => handleDeleteBlock(index)}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
          <label className="text-sm font-semibold capitalize mb-2">{block.type}</label>
          {block.type === 'heading' ? (
            <Input
              type="text"
              placeholder="Heading Text"
              value={block.text}
              onChange={(e) => handleBlockChange(index, e.target.value)}
            />
          ) : (
            <Textarea
              placeholder={block.type === 'list' ? 'Enter list items separated by new lines' : 'Text content'}
              value={block.text}
              onChange={(e) => handleBlockChange(index, e.target.value)}
              rows={block.type === 'text' ? 4 : 6}
            />
          )}
        </div>
      ))}

      <Button type="submit" disabled={loading}>
        {loading ? 'Publishing...' : 'Publish Post'}
      </Button>
    </form>
  );
}