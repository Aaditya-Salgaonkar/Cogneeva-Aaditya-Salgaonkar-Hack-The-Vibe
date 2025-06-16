"use client";

import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import Loading from "@/components/Loading";
import toast from "react-hot-toast";
import { FaGithub } from "react-icons/fa";
import { SiVercel, SiNetlify } from "react-icons/si";

// Types
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

interface SupabaseMVP {
  id: string;
  name: string;
  prompt: string;
  created_at: string;
  files: string | FileContent[];
}

export default function DeploymentsPage() {
  const [mvps, setMvps] = useState<MVP[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function fetchMVPs() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        router.push("/");
        return;
      }

      const userId = session.user.id;
      const { data, error } = await supabase
        .from("mvps")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

      if (error) {
        toast.error("Error fetching MVPs.");
        return;
      }

      const parsedData = data.map((mvp: SupabaseMVP): MVP => ({
        id: mvp.id,
        name: mvp.name,
        prompt: mvp.prompt,
        created_at: mvp.created_at,
        files:
          typeof mvp.files === "string"
            ? JSON.parse(mvp.files)
            : mvp.files || [],
      }));

      setMvps(parsedData);
      setLoading(false);
    }

    fetchMVPs();
  }, [router]);

  if (loading) return <Loading />;

  return (
    <div className="min-h-screen bg-gradient-to-tr from-[#F8FAFC] to-[#E2E8F0] p-10">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-extrabold text-indigo-600 mb-10 text-center">
          Deployments Center
        </h1>

        {mvps.length === 0 ? (
          <div className="text-center text-gray-500 text-lg">
            No MVPs ready for deployment.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {mvps.map((mvp) => (
              <MVPCard key={mvp.id} mvp={mvp} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

interface MVPCardProps {
  mvp: MVP;
}

const MVPCard: React.FC<MVPCardProps> = ({ mvp }) => {
  const handleDeploy = () => {
    toast.success(`Deploying ${mvp.name}...`);
    // 🔥 Hook your deployment backend here
  };

  const handlePushGithub = () => {
    toast.success(`Pushing ${mvp.name} to GitHub...`);
    // 🔥 Hook your GitHub integration backend here
  };

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition p-6 border border-gray-200 group relative">
      <h2 className="text-2xl font-semibold text-indigo-600 mb-2 truncate">{mvp.name}</h2>
      <p className="text-sm text-gray-400 mb-4">
        Created: {new Date(mvp.created_at).toLocaleString()}
      </p>

      <div className="mb-3">
        <h3 className="font-semibold text-gray-800 mb-1">Prompt Summary:</h3>
        <p className="text-gray-600 text-sm line-clamp-3">{mvp.prompt}</p>
      </div>

      <div className="flex flex-col gap-3 mt-5">
        <button
          onClick={handleDeploy}
          className="flex items-center justify-center gap-3 px-4 py-2 bg-gradient-to-tr from-indigo-500 to-purple-500 text-white rounded-lg shadow hover:scale-95 transition duration-500"
        >
          <SiVercel /> Deploy to Vercel
        </button>

        <button
          onClick={handleDeploy}
          className="flex items-center justify-center gap-3 px-4 py-2 bg-gradient-to-tr from-green-400 to-blue-500 text-white rounded-lg shadow hover:scale-95 transition duration-500"
        >
          <SiNetlify /> Deploy to Netlify
        </button>

        <button
          onClick={handlePushGithub}
          className="flex items-center justify-center gap-3 px-4 py-2 bg-gradient-to-tr from-gray-800 to-black text-white rounded-lg shadow hover:scale-95 transition duration-500"
        >
          <FaGithub /> Push to GitHub
        </button>
      </div>
    </div>
  );
};
