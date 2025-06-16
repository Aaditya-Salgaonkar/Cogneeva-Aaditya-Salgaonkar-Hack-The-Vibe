"use client";

import Loading from "@/components/Loading";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaRocket, FaProjectDiagram, FaRobot, FaCloudUploadAlt} from "react-icons/fa";

interface UserData {
    name:string;
    email:string;
}

export default function Dashboard() {
    const [user,setUser] = useState<UserData | null>(null);
    const router= useRouter();
    const [loading, setLoading] = useState(true);
    useEffect(() => {
    const fetchUserData = async () => {
      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession();

      if (sessionError || !session) {
        router.push("/");
        return;
      }

      const userId = session.user.id;

      const { data, error } = await supabase
        .from("users")
        .select("name, email")
        .eq("id", userId)
        .single();

      if (error) {
        console.error("Error fetching user:", error);
        router.push("/");
        return;
      }

      setUser({
        name: data.name,
        email: data.email,
      });

      setLoading(false);
    };

    fetchUserData();
  }, [router]);

  if (loading) return <Loading />;
  if (!user) return null;


  return (
    <div className="min-h-screen bg-[#F9FAFB] text-[#1A1A1A] p-10">
      {/* Top Header */}
      <div className="mb-10">
        <h1 className="text-5xl py-3 font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-[#2563EB] via-[#8B5CF6] to-[#60A5FA]">
          Hey there {user.name}!
        </h1>
        <p className="text-lg text-[#6B7280] mt-4">Your AI-Powered SaaS MVP Factory — Powered by Galuxium</p>
      </div>

      {/* Quick Actions */}
      <Link href="/create">
        <div className="flex flex-row gap-5 my-10 w-[20vw] h-[7vh] items-center justify-center bg-gradient-to-r from-[#2563EB] via-[#8B5CF6] to-[#60A5FA] rounded-lg shadow-xl text-white">
          <FaRocket className="text-2xl" />
          <h3 className="text-2xl font-bold">Create New MVP</h3>
        </div>
      </Link>

      {/* Dashboard Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div className="p-8 rounded-3xl bg-white shadow-xl border border-[#E5E7EB] flex items-center">
          <FaProjectDiagram className="text-5xl text-[#2563EB] mr-6" />
          <div>
            <h2 className="text-3xl font-extrabold">24</h2>
            <p className="text-[#4B5563] mt-2">Total MVPs</p>
          </div>
        </div>

        <div className="p-8 rounded-3xl bg-white shadow-xl border border-[#E5E7EB] flex items-center">
          <FaCloudUploadAlt className="text-5xl text-[#60A5FA] mr-6" />
          <div>
            <h2 className="text-3xl font-extrabold">8</h2>
            <p className="text-[#4B5563] mt-2">Active Deployments</p>
          </div>
        </div>

        <div className="p-8 rounded-3xl bg-white shadow-xl border border-[#E5E7EB] flex items-center">
          <FaRobot className="text-5xl text-[#10B981] mr-6" />
          <div>
            <h2 className="text-3xl font-extrabold">513</h2>
            <p className="text-[#4B5563] mt-2">AI Jobs Processed</p>
          </div>
        </div>
      </div>

      {/* Recent Projects */}
      <div className="bg-white p-8 rounded-3xl shadow-xl border border-[#E5E7EB] mb-12">
        <h3 className="text-3xl font-extrabold mb-6 text-[#2563EB]">Recent Projects</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left">
            <thead>
              <tr className="border-b border-[#E5E7EB]">
                <th className="py-4">Project Name</th>
                <th>Status</th>
                <th>Created On</th>
                <th>Last Modified</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-[#F3F4F6]">
                <td className="py-4">PetSocial</td>
                <td><span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">Live</span></td>
                <td>2025-06-12</td>
                <td>5 mins ago</td>
              </tr>
              <tr className="border-b border-[#F3F4F6]">
                <td className="py-4">Artify Marketplace</td>
                <td><span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full">Testing</span></td>
                <td>2025-06-10</td>
                <td>2 hrs ago</td>
              </tr>
              <tr>
                <td className="py-4">JobBoardX</td>
                <td><span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full">Draft</span></td>
                <td>2025-06-09</td>
                <td>Yesterday</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Deployment Logs */}
      <div className="bg-white p-8 rounded-3xl shadow-xl border border-[#E5E7EB] mb-12">
        <h3 className="text-3xl font-extrabold mb-6 text-[#2563EB]">Deployment Logs</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left">
            <thead>
              <tr className="border-b border-[#E5E7EB]">
                <th className="py-4">ID</th>
                <th>Status</th>
                <th>Timestamp</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-[#F3F4F6]">
                <td className="py-4">#A1023</td>
                <td><span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">Success</span></td>
                <td>5 mins ago</td>
              </tr>
              <tr className="border-b border-[#F3F4F6]">
                <td className="py-4">#A1022</td>
                <td><span className="bg-red-100 text-red-700 px-3 py-1 rounded-full">Failed</span></td>
                <td>2 hrs ago</td>
              </tr>
              <tr>
                <td className="py-4">#A1021</td>
                <td><span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">Success</span></td>
                <td>Yesterday</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* AI Usage Analytics */}
      <div className="bg-white p-8 rounded-3xl shadow-xl border border-[#E5E7EB] mb-12">
        <h3 className="text-3xl font-extrabold mb-6 text-[#2563EB]">AI Usage Analytics</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 text-xl text-[#374151]">
          <div className="flex justify-between"><span>Total Tokens Used:</span> <span className="font-bold">812,921</span></div>
          <div className="flex justify-between"><span>Total Inference Jobs:</span> <span className="font-bold">513</span></div>
          <div className="flex justify-between"><span>Models Used:</span> <span className="font-bold">Mixtral, Mistral, Gemma, Phi3</span></div>
          <div className="flex justify-between"><span>Average Response Time:</span> <span className="font-bold">3.2 sec</span></div>
        </div>
      </div>
    </div>
  );
}
