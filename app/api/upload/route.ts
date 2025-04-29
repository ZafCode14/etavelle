import { s3Client } from "@/lib/r2";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from 'uuid';

const client = s3Client;

export const POST = async (req: Request) => {
  try {
    const { fileName, fileType } = await req.json();
    const fileExtension = fileName.split('.').pop(); // Get the file extension
    const uniqueKey = `${uuidv4()}.${fileExtension}`; // Append the extension to the 
    const fileUrl = `https://pub-a06fd440460b4a3fac7f08ea1cf1e173.r2.dev/${uniqueKey}`;

    const command = new PutObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME,
      Key: uniqueKey,
      ContentType: fileType,
    });

    const signedUrl = await getSignedUrl(client, command, { expiresIn: 3600 }); // URL valid for 1 hour

    revalidatePath('/');

    return NextResponse.json({ url: signedUrl, fileUrl, uniqueKey }, { status: 200 });
  } catch (error) {
    console.error("Error generating signed URL:", error);
    return NextResponse.json({ message: "Failed to generate signed URL" }, { status: 500 });
  }
};