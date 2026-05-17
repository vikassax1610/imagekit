"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";
import FileUpload from "@/app/components/FileUpload";

export default function Feed() {
  const [openModal, setOpenModal] = useState(false);
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [progress, setProgress] = useState(0);

  const videos = [
    {
      id: 1,
      title: "Nature Video",
      thumbnail:
        "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
    },
    {
      id: 2,
      title: "Travel Vlog",
      thumbnail:
        "https://images.unsplash.com/photo-1493246507139-91e8fad9978e",
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white px-6 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold">Video Feed</h1>
          <p className="text-zinc-400">
            Share and watch amazing videos
          </p>
        </div>

        <button
          onClick={() => setOpenModal(true)}
          className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-5 py-3 rounded-xl font-semibold transition"
        >
          <Plus size={18} />
          Upload Video
        </button>
      </div>

      {/* Video Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((video) => (
          <div
            key={video.id}
            className="bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800"
          >
            <img
              src={video.thumbnail}
              alt={video.title}
              className="w-full h-56 object-cover"
            />

            <div className="p-4">
              <h2 className="text-lg font-semibold">
                {video.title}
              </h2>
            </div>
          </div>
        ))}
      </div>

      {/* Upload Modal */}
      {openModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 px-4">
          <div className="w-full max-w-2xl bg-zinc-950 border border-zinc-800 rounded-2xl p-6 relative shadow-2xl">
            {/* Close */}
            <button
              onClick={() => setOpenModal(false)}
              className="absolute top-4 right-4 text-zinc-400 hover:text-white"
            >
              <X size={22} />
            </button>

            <h2 className="text-2xl font-bold mb-6">
              Upload New Video
            </h2>

            <div className="space-y-5">
              {/* Thumbnail Upload */}
              <div>
                <p className="mb-2 text-sm text-zinc-400">
                  Upload Thumbnail
                </p>

                <FileUpload
                  fileType="image"
                  onSuccess={(res) =>
                    setThumbnailUrl(res.url)
                  }
                />
              </div>

              {/* Video Upload */}
              <div>
                <p className="mb-2 text-sm text-zinc-400">
                  Upload Video
                </p>

                <FileUpload
                  fileType="video"
                  onSuccess={(res) =>
                    setVideoUrl(res.url)
                  }
                  onProgress={(value) =>
                    setProgress(value)
                  }
                />
              </div>

              {/* Progress */}
              {progress > 0 && progress < 100 && (
                <div>
                  <p className="text-sm mb-2">
                    Uploading: {progress}%
                  </p>

                  <div className="w-full bg-zinc-800 rounded-full h-3">
                    <div
                      className="bg-red-600 h-3 rounded-full"
                      style={{
                        width: `${progress}%`,
                      }}
                    ></div>
                  </div>
                </div>
              )}

              {/* Preview URLs */}
              {thumbnailUrl && (
                <p className="text-green-400 text-sm">
                  Thumbnail Uploaded ✅
                </p>
              )}

              {videoUrl && (
                <p className="text-green-400 text-sm">
                  Video Uploaded ✅
                </p>
              )}

              <button className="w-full bg-red-600 hover:bg-red-700 py-3 rounded-xl font-semibold transition">
                Save Video Post
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}