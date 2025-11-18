"use client";

export default function Loading() {
  return (
    <div className="w-screen h-screen flex justify-center items-center bg-white">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-gray-700 text-lg font-medium">Loading...</p>
      </div>
    </div>
  );
}