'use client';
import { useTransition } from 'react';
import { Button } from '@/components/ui/button';
import { Content, Post } from '@/lib/types';
import { getContentFromFormData } from './getContent';

type Props = {
  h2: string;
  setFormData: React.Dispatch<React.SetStateAction<Partial<Post>>>;
  index: number;
};

export default function GenerateFromH2({ h2, setFormData, index }: Props) {
  const [isPending, startTransition] = useTransition();

  const handleSubmit = () => {
    if (!h2) return;

    startTransition(async () => {
      const response: Content[] = await getContentFromFormData(JSON.stringify(h2));

      setFormData((prev) => {
        const existingContent = prev.content || [];
        const before = existingContent.slice(0, index + 1);
        const after = existingContent.slice(index + 1);

        return {
          ...prev,
          content: [...before, ...response, ...after],
        };
      });
    });
  };

  return (
    <Button onClick={handleSubmit} disabled={isPending}>
      {isPending ? 'Generating...' : 'Generate From H2'}
    </Button>
  );
}