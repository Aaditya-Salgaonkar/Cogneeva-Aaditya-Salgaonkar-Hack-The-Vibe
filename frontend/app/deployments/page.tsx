"use client";

import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import Loading from "@/components/Loading";
import toast from "react-hot-toast";
import axios from "axios";
import { FaGithub } from "react-icons/fa";
import {  SiNetlify } from "react-icons/si";

// Types
interface NetlifyDeployResponse {
  netlify_url: string;
}
interface FileContent {
  path: string;
  content: string;
}
interface GithubTokenResponse {
  connected: boolean;
}
interface NetlifyTokenResponse {
  connected: boolean;
}
interface MVP {
  id: string;
  name: string;
  prompt: string;
  created_at: string;
  files: FileContent[];
  github_pushed: boolean;
  netlify_deployed?: boolean;
  netlify_url?: string;
}

interface SupabaseMVP {
  id: string;
  name: string;
  prompt: string;
  created_at: string;
  files: string | FileContent[];
  github_pushed: boolean;
  netlify_deployed?: boolean;
  netlify_url?: string;
}

export default function DeploymentsPage() {
  const [mvps, setMvps] = useState<MVP[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function fetchMVPs() {
      const { data: { session } } = await supabase.auth.getSession();
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
        github_pushed: mvp.github_pushed || false,
        netlify_deployed: mvp.netlify_deployed || false,
        netlify_url: mvp.netlify_url || "",
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
              <MVPCard key={mvp.id} mvp={mvp} setMvps={setMvps} mvps={mvps} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

interface MVPCardProps {
  mvp: MVP;
  setMvps: React.Dispatch<React.SetStateAction<MVP[]>>;
  mvps: MVP[];
}

const MVPCard: React.FC<MVPCardProps> = ({ mvp, setMvps, mvps }) => {
  const [isGithubConnected, setIsGithubConnected] = useState(false);
  const [isNetlifyConnected, setIsNetlifyConnected] = useState(false);

  useEffect(() => {
    checkGithubConnection();
    checkNetlifyConnection();
  }, []);

  const checkGithubConnection = async () => {
    try {
      const res = await axios.get<GithubTokenResponse>("http://localhost:5000/api/github/token", { withCredentials: true });
      setIsGithubConnected(res.data.connected);
    } catch {
      setIsGithubConnected(false);
    }
  };

  const checkNetlifyConnection = async () => {
    try {
      const res = await axios.get<NetlifyTokenResponse>("http://localhost:5000/api/netlify/token", { withCredentials: true });
      setIsNetlifyConnected(res.data.connected);
    } catch {
      setIsNetlifyConnected(false);
    }
  };

  const connectGithub = () => {
    window.location.href = "http://localhost:5000/api/github/login";
  };

const connectNetlify = () => {
    window.location.href = "http://localhost:5000/api/netlify/login";
};


  const handlePushGithub = async () => {
    if (!isGithubConnected) {
      toast.error("Please connect GitHub first.");
      return;
    }

    const repoName = prompt("Enter repository name:");
    const description = prompt("Enter repository description:") || "";

    if (!repoName) {
      toast.error("Repository name is required.");
      return;
    }

    try {
      toast.loading("Pushing to GitHub...");
      await axios.post("http://localhost:5000/api/github/push", {
        repoName,
        description,
        files: mvp.files,
        mvpId: mvp.id,
      }, { withCredentials: true });

      toast.dismiss();
      toast.success("Successfully pushed to GitHub!");

      const updated = mvps.map(item => item.id === mvp.id ? { ...item, github_pushed: true } : item);
      setMvps(updated);
    } catch (err) {
      toast.dismiss();
      console.error(err);
      toast.error("Failed to push to GitHub.");
    }
  };

const handlePushNetlify = async () => {
  if (!isNetlifyConnected) {
    toast.error("Please connect Netlify first.");
    return;
  }

  try {
    toast.loading("Deploying to Netlify...");
    const res = await axios.post<NetlifyDeployResponse>("http://localhost:5000/api/netlify/deploy", {
      files: mvp.files,
      mvpId: mvp.id,
    }, { withCredentials: true });

    toast.dismiss();
    toast.success("Successfully deployed to Netlify!");

    const newNetlifyUrl = res.data.netlify_url;

    // ✅ Update Supabase after deployment success
    const { error } = await supabase
      .from("mvps")
      .update({
        netlify_deployed: true,
        netlify_url: newNetlifyUrl,
      })
      .eq("id", mvp.id);

    if (error) {
      console.error("Failed to update Supabase:", error);
      toast.error("Failed to update deployment status.");
    } else {
      toast.success("Deployment info saved!");
    }

    // ✅ Update local state too (UI update)
    const updated = mvps.map(item =>
      item.id === mvp.id
        ? { ...item, netlify_deployed: true, netlify_url: newNetlifyUrl }
        : item
    );
    setMvps(updated);
  } catch (err) {
    toast.dismiss();
    console.error(err);
    toast.error("Failed to deploy to Netlify.");
  }
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

      {mvp.github_pushed && (
        <p className="text-green-500 font-semibold mb-2">
          ✅ Already pushed to GitHub
        </p>
      )}

      {mvp.netlify_deployed && mvp.netlify_url && (
        <a
          href={mvp.netlify_url}
          target="_blank"
          rel="noopener noreferrer"
          className="block bg-gradient-to-tr from-green-400 to-blue-500 text-white text-center font-semibold py-2 rounded-lg shadow-lg hover:scale-105 transition duration-300 mb-3"
        >
          🌐 View Live on Netlify
        </a>
      )}

      <div className="flex flex-col gap-3 mt-3">
        {!isNetlifyConnected ? (
          <button
            onClick={connectNetlify}
            className="flex items-center justify-center gap-3 px-4 py-2 bg-gradient-to-tr from-green-400 to-blue-500 text-white rounded-lg shadow hover:scale-95 transition duration-500"
          >
            <SiNetlify /> Connect Netlify
          </button>
        ) : (
          <button
            onClick={handlePushNetlify}
            className="flex items-center justify-center gap-3 px-4 py-2 bg-gradient-to-tr from-green-400 to-blue-500 text-white rounded-lg shadow hover:scale-95 transition duration-500"
          >
            <SiNetlify /> Deploy to Netlify
          </button>
        )}

        {!isGithubConnected ? (
          <button
            onClick={connectGithub}
            className="flex items-center justify-center gap-3 px-4 py-2 bg-gradient-to-tr from-gray-800 to-black text-white rounded-lg shadow hover:scale-95 transition duration-500"
          >
            <FaGithub /> Connect GitHub
          </button>
        ) : (
          <button
            onClick={handlePushGithub}
            className="flex items-center justify-center gap-3 px-4 py-2 bg-gradient-to-tr from-gray-800 to-black text-white rounded-lg shadow hover:scale-95 transition duration-500"
          >
            <FaGithub /> Push to GitHub
          </button>
        )}
      </div>
    </div>
  );
};
