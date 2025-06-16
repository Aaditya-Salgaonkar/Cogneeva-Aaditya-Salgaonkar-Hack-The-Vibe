"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import toast from "react-hot-toast";
import Loading from "@/components/Loading";

interface FileContent {
  path: string;
  content: string;
}

interface MVP {
  id: string;
  name: string;
  prompt: string;
  created_at: string;
  files: FileContent[];
}

export default function CustomizeMVP() {
  const { id } = useParams();
  const [mvp, setMvp] = useState<MVP | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedFile, setSelectedFile] = useState<FileContent | null>(null);

  useEffect(() => {
    const fetchMVP = async () => {
      const { data, error } = await supabase.from("mvps").select("*").eq("id", id).single();

      if (error) {
        toast.error("Failed to fetch MVP");
        return;
      }

      const parsedFiles = typeof data.files === "string" ? JSON.parse(data.files) : data.files || [];

      setMvp({
        id: data.id,
        name: data.name,
        prompt: data.prompt,
        created_at: data.created_at,
        files: parsedFiles,
      });

      setSelectedFile(parsedFiles[0] ?? null);
      setLoading(false);
    };

    fetchMVP();
  }, [id]);

  if (loading) return <Loading />;

  return (
    <div className="flex min-h-screen">
      {/* Left: File Tree */}
      <div className="w-1/4 bg-gray-100 border-r p-5 overflow-y-auto">
        <h2 className="text-lg font-semibold mb-4">Files</h2>
        <ul className="space-y-2">
          {mvp?.files.map((file, index) => (
            <li key={index}>
              <button
                onClick={() => setSelectedFile(file)}
                className={`w-full text-left px-3 py-2 rounded-lg ${
                  selectedFile?.path === file.path
                    ? "bg-indigo-200 text-indigo-700"
                    : "hover:bg-gray-200"
                }`}
              >
                {file.path}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Right: Code Viewer */}
      <div className="w-3/4 p-5 overflow-y-auto">
        <h2 className="text-xl font-bold mb-3">{selectedFile?.path}</h2>
        <pre className="bg-gray-900 text-green-300 p-5 rounded-lg overflow-x-auto whitespace-pre-wrap">
          {selectedFile?.content}
        </pre>
      </div>
    </div>
  );
}
