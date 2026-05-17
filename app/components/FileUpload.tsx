"use client"; // This component must be a client component
import { upload } from "@imagekit/next";
import { useState } from "react";

interface FileUploadProps {
  onSuccess: (res: any) => void;
  onProgress?: (progress: number) => void;
  fileType?: "image" | "video";
}
const FileUpload = ({ onSuccess, onProgress, fileType }: FileUploadProps) => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // optional validation
  const validateFile = (file: File) => {
    if (fileType === "video") {
      if (!file.type.startsWith("video/")) {
        setError("please Upload a valid video file");
      }
    }
    if (file.size > 100 * 1024 * 1024) {
      setError("File size must be less than 100 MB");
    }
    return true;
  };

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    const file = e.target.files?.[0];
    if (!file || validateFile(file)) return;
    setUploading(true);
    setError(null);
    try {
      const authRes = await fetch("/api/auth/imagekit-auth");
      const auth = await authRes.json();
      const res = await upload({
        expire: auth.expire,
        token: auth.token,
        signature: auth.signature,
        publicKey: process.env.NEXT_PUBLIC_PUBLIC_KEY!,
        file,
        fileName: file.name,
        onProgress: (event) => {
          if (event.lengthComputable && onProgress) {
            const percent = Math.round((event.loaded / event.total) * 100);
            onProgress(percent);
          }
        },
      });
      onSuccess(res);
    } catch (error) {
      console.error("Upload failed:", error);
      setError("Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  }
  return (
    <div className="space-y-2">
      {" "}
      <input
        type="file"
        accept={fileType === "video" ? "video/*" : "image/*"}
        onChange={handleFileChange}
        disabled={uploading}
        className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-white file:mr-4 file:rounded-md file:border-0 file:bg-red-600 file:px-4 file:py-2 file:text-white hover:file:bg-red-700"
      />{" "}
      {uploading && <p className="text-sm text-blue-400">Uploading...</p>}{" "}
      {error && <p className="text-sm text-red-500">{error}</p>}{" "}
    </div>
  );
};
export default FileUpload;
