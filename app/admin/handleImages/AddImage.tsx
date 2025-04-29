import { handleUpload } from "@/lib/r2storage";
import { useRef, useState } from "react";

type Props = {
  id: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  addImageToDatabase: any;
  noSizeLimit?: boolean;
  type?: string;
};

export default function AddImage({ id, addImageToDatabase, noSizeLimit, type = "image" }: Props) {
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState<number>(0);
  const [isUploading, setIsUploading] = useState(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files ? e.target.files[0] : null;

    if (selectedFile) {
      // Determine max size limit (only if noSizeLimit is false)
      const maxSize = 2100 * 1024; // 2100 KB
      if (!noSizeLimit && selectedFile.size > maxSize) {
        alert("File size must be less than 2100 KB");
        setFile(null);
      } else {
        setFile(selectedFile);
      }
    }
  };

  const handleUploadFile = async () => {
    try {
      setIsUploading(true);

      if (file) {
        const { fileUrl, uniqueKey } = await handleUpload(file, setProgress);

        await addImageToDatabase({ id, fileUrl, uniqueKey });
      } else {
        alert("Please add a file");
      }
    } catch (error) {
      alert("Upload failed");
      console.error("Upload failed:", error);
    } finally {
      setIsUploading(false);
      setFile(null);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  // Determine the accepted file type
  const acceptedFileTypes = type === "video" ? "video/*" : "image/*";

  return (
    <div className="flex flex-col">
      <div className="flex w-full">
        {/* File Input */}
        <input
          id="fileUploader"
          type="file"
          accept={acceptedFileTypes}
          onChange={handleFileChange}
          className="my-5 mt-2 w-[220px] text-[12px]"
          ref={fileInputRef}
        />

        {/* Upload Button */}
        <button
          type="button"
          onClick={handleUploadFile}
          className={`
            relative flex-1
            lowercase
            max-w-[150px] h-[32px]
            ${isUploading ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"} 
            text-white rounded mb-5 w-[100px]
          `}
        >
          {!isUploading ? (
            "Upload"
          ) : (
            <div
              className="rounded-md h-full bg-[#328bff] absolute left-0 top-0"
              style={{ width: `${progress}%` }}
            ></div>
          )}
          {isUploading && (
            <p className="w-full h-full absolute top-0 left-0 flex justify-center items-center">
              {progress}%
            </p>
          )}
        </button>
      </div>
    </div>
  );
}