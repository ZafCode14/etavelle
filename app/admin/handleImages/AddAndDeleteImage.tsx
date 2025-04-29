"use client";

import { handleDelete, handleUpload } from "@/lib/r2storage";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";

type Props = {
  postSlug: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  addImageToDatabase: any;
  noSizeLimit?: boolean;
  uKey?: string;
  type?: string;
};

export default function AddAndDeleteImage({
  postSlug,
  addImageToDatabase,
  noSizeLimit,
  uKey,
}: Props) {
  const [image, setImage] = useState<File | null>(null);
  const [progress, setProgress] = useState<number>(0);
  const [isUploading, setIsUploading] = useState(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedImage = e.target.files ? e.target.files[0] : null;

    if (selectedImage) {
      if (selectedImage.size > 2100 * 1024 && !noSizeLimit) {
        alert("File size must be less than 2100 KB");
        setImage(null);
      } else {
        setImage(selectedImage);
      }
    }
  };

  const handleUploadImage = async () => {
    try {
      setIsUploading(true);

      if (image) {
        if (uKey) {
          await handleDelete(uKey);
        }
        const { fileUrl, uniqueKey } = await handleUpload(image, setProgress);
        await addImageToDatabase(postSlug, fileUrl, uniqueKey);
      } else {
        alert("Please select an image");
      }
    } catch (error) {
      alert("Upload failed");
      console.error("Upload failed:", error);
    } finally {
      setIsUploading(false);
      setProgress(0);
      setImage(null);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  return (
    <>
    <div className="flex gap-4">
      <div className="flex flex-col space-y-2">
        <Input
          id="heroImages"
          type="file"
          accept={noSizeLimit ? "application/pdf" : "image/*"}
          onChange={handleImageChange}
          ref={fileInputRef}
          disabled={isUploading}
        />
      </div>

      <Button
        type="button"
        onClick={handleUploadImage}
        disabled={isUploading}
        className="w-[150px]"
      >
        {isUploading ? `${progress}%` : "Upload"}
      </Button>

    </div>
    {isUploading && (
      <Progress value={progress} className="h-2" />
    )}
    </>
  );
}