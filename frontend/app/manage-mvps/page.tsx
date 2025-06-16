"use client";

import React, { useEffect, useState, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import Loading from "@/components/Loading";
import toast from "react-hot-toast";

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

export default function ManageMVPsPage() {
  const [mvps, setMvps] = useState<MVP[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchMVPs = useCallback(async () => {
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
  }, [router]);

  useEffect(() => {
    fetchMVPs();
  }, [fetchMVPs]);

  if (loading) return <Loading />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8fafc] to-[#e2e8f0] p-10">
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold text-gray-900">
          Manage Your MVPs
        </h1>
        <p className="text-gray-500 mt-2">
          All your generated MVPs in one place
        </p>
      </div>

      {mvps.length === 0 ? (
        <div className="text-center text-gray-500 text-lg">No MVPs found.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {mvps.map((mvp) => (
            <MVPCard key={mvp.id} mvp={mvp} />
          ))}
        </div>
      )}
    </div>
  );
}

interface MVPCardProps {
  mvp: MVP;
}

const MVPCard: React.FC<MVPCardProps> = ({ mvp }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition p-6 border border-gray-200">
      <h2 className="text-2xl font-semibold text-indigo-600 mb-2">
  {mvp.name.length > 30 ? `${mvp.name.slice(0, 30)}...` : mvp.name}
</h2>
      <p className="text-sm text-gray-400 mb-4">
        {new Date(mvp.created_at).toLocaleString()}
      </p>

      <div className="mb-3">
        <h3 className="font-semibold text-gray-800 mb-1">Prompt:</h3>
        <p className="text-gray-600 text-sm max-h-24 overflow-y-auto whitespace-pre-wrap">
          {mvp.prompt}
        </p>
      </div>

      <div className="mt-4">
        <h3 className="font-semibold text-gray-800 mb-1">Files:</h3>
        <ul className="text-gray-600 text-sm max-h-40 overflow-auto">
        
        </ul>
      </div>

      <div className="flex justify-between gap-2 mt-4">
        <button
          onClick={() => {
            window.location.href = `/customize/${mvp.id}`;
          }}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg border bg-indigo-50 text-indigo-600 border-indigo-200 hover:bg-indigo-100"
        >
          Customize
        </button>
      </div>
    </div>
  );
};
