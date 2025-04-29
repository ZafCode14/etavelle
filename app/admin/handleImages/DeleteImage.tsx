import { handleDelete } from "@/lib/r2storage";
import { useState } from "react";

type Props = {
  id: string;
  uniqueKey: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  deleteImageFromDatabase: any;
};
export default function DeleteImage({ uniqueKey, id, deleteImageFromDatabase }: Props) {
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false); // Control the modal visibility

  const handleDeleteImage = async () => {
    setLoading(true);
    setIsOpen(false); // Close the modal
    try {
      // Delete the image and get the file URL and unique key
      await handleDelete(uniqueKey);
      await deleteImageFromDatabase({id, uniqueKey});

    } catch (error) {
      alert('Delete failed');
      console.error('Delete failed:', error);
    } 

    setLoading(false);
  };

  return (
    <>
      {/* Delete Button */}
      <button
        type="button"
        className="text-[white] bg-[#af1717] hover:underline mx-3 rounded-md"
        onClick={() => setIsOpen(true)}
        disabled={loading}
      >
        {loading ? "deleting..." : "delete"}
      </button>

      {/* Confirmation Modal */}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <p className="text-lg font-semibold">Are you sure?</p>
            <p className="text-sm text-gray-600">This action cannot be undone.</p>
            <div className="flex justify-center gap-4 mt-4">
              <button
                type="button"
                className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                onClick={handleDeleteImage}
                disabled={loading}
              >
                {loading ? "Deleting..." : "Confirm"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}