'use client';
import { useTransition } from 'react';
import { Button } from '@/components/ui/button';
import { Content, Post } from '@/lib/types';
import { getContentFromFormData } from './getContent';

type Props = {
  h2: string;
  setFormData: React.Dispatch<React.SetStateAction<Partial<Post>>>;
  index: number;
  allH2s: Content[] | undefined;
};

export default function GenerateFromH2({ h2, setFormData, index, allH2s }: Props) {
  const [isPending, startTransition] = useTransition();

  const h2Array = allH2s?.map((h2) => h2.value);

  const passedArument = JSON.stringify({
    h2Structure: h2Array,
    CurrentH2: h2
  })

  const handleSubmit = () => {
    if (!h2) return;

    startTransition(async () => {
      const response: Content[] = await getContentFromFormData(passedArument);

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