'use client';

import { useTransition } from 'react';
import { Button } from '@/components/ui/button';
import { getStructureFromTitle } from './getStructureFromTitle';
import { Post } from '@/lib/types';

type Props = {
  title: string | undefined;
  setFormData: React.Dispatch<React.SetStateAction<Partial<Post>>>;
}
export default function GenerateH2s({ title, setFormData }: Props) {
  const [isPending, startTransition] = useTransition();

  const handleSubmit = () => {
    if (!title) return;

    startTransition(async () => {
      try {
        const response = await getStructureFromTitle(title);
        setFormData(prev => ({
          ...prev,
          content: [...prev.content || [], ...response],
        }));
      } catch (error) {
        console.error(error);
      }
    });
  }

  return (
    <Button onClick={handleSubmit} disabled={isPending}>
      {isPending ? 'Generating...' : 'Generate H2s'}
    </Button>
  );
}