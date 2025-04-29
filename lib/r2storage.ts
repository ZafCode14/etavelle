type UploadResponse = {
  uniqueKey: string;
  fileUrl: string;
};
const handleUpload = async (file: File, setProgress: (progress: number) => void): Promise<UploadResponse> => {
  try {
    // Step 1: Get signed URL from the API
    const response = await fetch('/api/upload', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fileName: file.name, fileType: file.type }),
    });

    const { url, uniqueKey, fileUrl } = await response.json();

    // Step 2: Upload the file with progress tracking
    const xhr = new XMLHttpRequest();

    return new Promise((resolve, reject) => {
      xhr.open('PUT', url, true);
      xhr.setRequestHeader('Content-Type', file.type);

      // Update progress
      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const progressPercentage = Math.round((event.loaded / event.total) * 99);
          if (typeof setProgress === 'function') {
            setProgress(progressPercentage);
          }
        }
      };

      // Handle completion
      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          console.log('File uploaded successfully!');
          resolve({ uniqueKey, fileUrl });
        } else {
          reject(new Error(`Upload failed with status: ${xhr.statusText}`));
        }
      };

      // Handle errors
      xhr.onerror = () => reject(new Error('Error during file upload'));

      // Send the file
      xhr.send(file);
    });
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
};

const handleDelete = async (fileKey: string) => {
  if (!fileKey) throw new Error("File key is required.");

  const res = await fetch(`/api/delete?key=${encodeURIComponent(fileKey)}`, {
    method: "DELETE",
  });

  if (!res.ok) throw new Error("Failed to delete file.");

  const data = await res.json();
  return data.message || null;
};

export { handleUpload, handleDelete };