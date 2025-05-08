'use client';
import { useTransition } from 'react';
import { Button } from '@/components/ui/button';
import { Post } from '@/lib/types';
import { getH1andP } from './getH1andP';

type Props = {
  title: string | undefined;
  setFormData: React.Dispatch<React.SetStateAction<Partial<Post>>>;
}
export default function GenerateH1({ title, setFormData }: Props) {
  const [isPending, startTransition] = useTransition();

  const handleSubmit = () => {
    if (!title) return;

    startTransition(async () => {
      try {
        const response = await getH1andP(title);
        setFormData(prev => ({
          ...prev,
          content: response,
        }));
      } catch (error) {
        console.error(error);
      }
    });
  }

  return (
    <Button onClick={handleSubmit} disabled={isPending} className='mr-5'>
      {isPending ? 'Generating...' : 'Generate H1'}
    </Button>
  );
}