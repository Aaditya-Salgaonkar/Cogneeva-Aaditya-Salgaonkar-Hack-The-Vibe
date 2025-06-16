"use client";

import Loading from "@/components/Loading";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { 
  FaRocket, FaProjectDiagram,  FaCloudUploadAlt, FaGithub, 
 FaChartLine, FaRobot,
 FaRupeeSign
} from "react-icons/fa";

// TYPES
interface UserData { name: string; email: string; created_at: string }
interface Project {
  name: string;
  status: 'Live' | 'Testing' | 'Draft';
  created: string;
  modified: string;
}

export default function PremiumDashboard() {
  const [user, setUser] = useState<UserData | null>(null);
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [metrics, setMetrics] = useState({
    totalMvps: 0, activeDeployments: 0, 
    githubPushed: 0, totalConversations: 0, totalMessages: 0, 
    aiMessages: 0, userMessages: 0, totalTokens: 0,
    revenue: 0, mrr: 0, arr: 0, aiCost: 0, retention: 0, churnRate: 0, conversionRate: 0
  });
  const [projects, setProjects] = useState<Project[]>([]);

  const planPrice = 29;
  const tokenPrice = 0.000002;

  useEffect(() => {
    const fetchData = async () => {
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      if (sessionError || !session) { router.push("/"); return; }
      const userId = session.user.id;

      const { data: userData, error: userError } = await supabase
        .from("users").select("name, email, created_at").eq("id", userId).single();
      if (userError) { router.push("/"); return; }
      setUser(userData);

      const [
        { data: mvps }, 
        { data: conversations }, 
        { data: messages }
      ] = await Promise.all([
        supabase.from("mvps").select("*").eq("user_id", userId),
        supabase.from("conversations").select("id, created_at").eq("user_id", userId),
        supabase.from("messages").select("sender, conversation_id")
          .in("conversation_id", (await supabase.from("conversations").select("id").eq("user_id", userId)).data?.map(c => c.id) || [])
      ]);

      const totalMvps = mvps?.length ?? 0;
      const activeDeployments = mvps?.filter(m => m.netlify_deployed).length ?? 0;
      const githubPushed = mvps?.filter(m => m.github_pushed).length ?? 0;
      const totalConversations = conversations?.length ?? 0;
      const totalMessages = messages?.length ?? 0;
      const aiMessages = messages?.filter(m => m.sender === "ai").length ?? 0;
      const userMessages = totalMessages - aiMessages;
      const totalTokens = totalMessages * 200;

      // Revenue & retention calculations
      const revenue = totalMvps * planPrice;
      const mrr = revenue;
      const arr = mrr * 12;
      const aiCost = totalTokens * tokenPrice;

      const now = new Date();
      const daysSinceSignup = Math.floor((now.getTime() - new Date(userData.created_at).getTime()) / (1000 * 60 * 60 * 24));
      const retention = daysSinceSignup > 30 ? 100 : 100 - (30 - daysSinceSignup);
      const churnRate = 100 - retention;
      const conversionRate = totalConversations > 0 ? (totalMvps / totalConversations) * 100 : 0;

      setMetrics({
        totalMvps, activeDeployments, githubPushed, totalConversations, totalMessages, 
        aiMessages, userMessages, totalTokens, revenue, mrr, arr, aiCost, 
        retention, churnRate, conversionRate
      });

      setProjects(mvps?.map(p => ({
        name: p.name,
        status: p.netlify_deployed ? 'Live' : p.github_pushed ? 'Testing' : 'Draft',
        created: new Date(p.created_at).toLocaleDateString(),
        modified: new Date(p.created_at).toLocaleDateString()
      })) || []);

      setLoading(false);
    };
    fetchData();
  }, [router]);

  if (loading) return <Loading />;
  if (!user) return null;

  return (
    <div className="min-h-screen bg-[#F9FAFB] text-[#1A1A1A] p-10">
      <div className="mb-10">
        <h1 className="text-5xl py-3 font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-[#2563EB] via-[#8B5CF6] to-[#60A5FA]">
          Welcome back, {user.name}!
        </h1>
        <p className="text-lg text-[#6B7280] mt-4">    Your growth journey starts here. Monitor your SaaS empire, track deployments, and optimize your AI-powered MVP factory.</p>
      </div>

      <Link href="/create">
        <div className="flex flex-row gap-3 my-10 w-[16vw] h-[7vh] items-center justify-center bg-gradient-to-r from-[#2563EB] via-[#8B5CF6] to-[#60A5FA] rounded-lg shadow-xl text-white">
          <FaRocket className="text-lg" />
          <h3 className="text-lg font-bold">Create New MVP</h3>
        </div>
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
        <MetricCard icon={<FaProjectDiagram size={40} className="text-indigo-600" />} label="Total MVPs" value={metrics.totalMvps} />
        <MetricCard icon={<FaCloudUploadAlt size={40} className="text-purple-600" />} label="Deployments" value={metrics.activeDeployments} />
        <MetricCard icon={<FaGithub size={40} className="text-black" />} label="GitHub Pushed" value={metrics.githubPushed} />
        <MetricCard icon={<FaRupeeSign size={40} className="text-green-600" />} label="Estimated Revenue" value={` ${metrics.revenue}`} />
        <MetricCard icon={<FaChartLine size={40} className="text-blue-600" />} label="Monthly Recurring Revenue" value={` ₹${metrics.mrr}`} />
        <MetricCard icon={<FaChartLine size={40} className="text-orange-600" />} label="Annual Recurring Revenue" value={` ₹${metrics.arr}`} />
        <MetricCard icon={<FaRobot size={40} className="text-fuchsia-600" />} label="AI Token Cost" value={` ₹${metrics.aiCost.toFixed(2)}`} />
        <MetricCard icon={<FaChartLine size={40} className="text-teal-500" />} label="Retention" value={`${metrics.retention.toFixed(1)}%`} />

      </div>

      <SectionCard title="Recent Projects">
        <TableProjects projects={projects} />
      </SectionCard>
    </div>
  );
}

// REUSABLE COMPONENTS SAME AS BEFORE
const MetricCard = ({ icon, label, value }: { icon: React.ReactNode, label: string, value: number | string }) => (
  <div className="p-8 rounded-3xl bg-white shadow-xl border border-[#E5E7EB] flex items-center gap-6">
    {icon}
    <div><h2 className="text-3xl font-extrabold">{value}</h2><p className="text-[#4B5563] mt-2">{label}</p></div>
  </div>
);

const SectionCard = ({ title, children }: { title: string, children: React.ReactNode }) => (
  <div className="bg-white p-8 rounded-3xl shadow-xl border border-[#E5E7EB] mb-12">
    <h3 className="text-3xl font-extrabold mb-6 text-[#2563EB]">{title}</h3>
    {children}
  </div>
);

const TableProjects = ({ projects }: { projects: Project[] }) => (
  <table className="min-w-full text-left">
    <thead><tr className="border-b border-[#E5E7EB]"><th>Project</th><th>Status</th><th>Created</th><th>Modified</th></tr></thead>
    <tbody>{projects.map((p, i) => (
      <tr key={i} className="border-b border-[#F3F4F6]">
        <td className="py-4 w-[50vw]">{p.name}</td>
        <td><span className={`px-3 py-1 rounded-lg ${p.status === 'Live' ? 'bg-green-100 text-green-700' : p.status === 'Testing' ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-700'}`}>{p.status}</span></td>
        <td>{p.created}</td>
        <td>{p.modified}</td>
      </tr>
    ))}</tbody>
  </table>
);
