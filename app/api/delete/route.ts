import { NextResponse } from 'next/server';
import { DeleteObjectCommand } from '@aws-sdk/client-s3';
import { s3Client } from '@/lib/r2';
import { revalidatePath } from 'next/cache';

const client = s3Client;

export async function DELETE(req: Request) {
  try {
    const url = new URL(req.url);
    const fileKey = url.searchParams.get('key'); // Retrieve the key from query parameters

    if (!fileKey) {
      return NextResponse.json({ error: 'No file key provided' }, { status: 400 });
    }

    // Prepare the delete parameters
    const params = {
      Bucket: process.env.R2_BUCKET_NAME!, // Your Cloudflare R2 bucket name
      Key: fileKey, // File key to delete
    };

    // Send the delete request
    await client.send(new DeleteObjectCommand(params));
    revalidatePath('/');

    return NextResponse.json({ message: 'File deleted successfully' });
  } catch (error) {
    console.error('Delete error:', error);
    return NextResponse.json({ error: 'Failed to delete file' }, { status: 500 });
  }
}