"use client";

import Loading from "@/components/Loading";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { FaRocket } from "react-icons/fa";

interface FormData {
  idea: string;
  industry: string;
  audience: string;
  features: string[];
  auth: string;
  database: string;
  design: string;
  deployment: string;
  aiModel: string;
}

interface UserData {
  id: string;
  name: string;
  email: string;
}

export default function CreateMVPPage() {
  const initialState: FormData = {
    idea: "",
    industry: "",
    audience: "",
    features: [],
    auth: "",
    database: "",
    design: "",
    deployment: "",
    aiModel: "",
  };

  const [formData, setFormData] = useState<FormData>(initialState);
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  const featuresOptions: string[] = [
    "Landing Page",
    "Authentication",
    "Database CRUD",
    "Payment Integration",
    "Admin Panel",
    "File Upload",
    "Email Notifications",
    "Analytics Dashboard",
  ];

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFeatureChange = (feature: string) => {
    const updatedFeatures = formData.features.includes(feature)
      ? formData.features.filter((f) => f !== feature)
      : [...formData.features, feature];
    setFormData({ ...formData, features: updatedFeatures });
  };

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
        id: userId,
        name: data.name,
        email: data.email,
      });

      setLoading(false);
    };

    fetchUserData();
  }, [router]);

  if (loading || submitting) return <Loading />;
  if (!user) return null;

  const generatePrompt = (data: FormData): string => {
    return `
    Generate full-stack SaaS MVP code using latest Javascript tech stack.

    - Idea: ${data.idea}
    - Industry: ${data.industry}
    - Audience: ${data.audience}
    - Features: ${data.features.join(", ")}
    - Auth: ${data.auth}
    - Database: ${data.database}
    - Design: ${data.design}
    - Deployment: ${data.deployment}
    - AI Model: ${data.aiModel}

    Generate complete code with backend, frontend, database, and deployment files.
    `;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!user) {
      alert("User not found.");
      return;
    }

    setSubmitting(true); // Start global loading

    try {
      const response = await fetch("http://localhost:5000/api/mvp/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          userId: user.id,
          prompt: generatePrompt(formData),
          projectName: formData.idea
        })
      });

      const result = await response.json();

      if (result.success) {
        console.log("MVP generated successfully!");
        // Small delay for premium smoothness
        setTimeout(() => {
          router.push("/manage-mvps");
        }, 800);
      } else {
        alert("Failed to generate MVP.");
        setSubmitting(false);
      }
    } catch (err) {
      console.error(err);
      alert("Error occurred while generating MVP.");
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] text-[#1A1A1A] p-10">
      <div className="mb-10">
        <h1 className="text-5xl py-3 font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-[#2563EB] via-[#8B5CF6] to-[#60A5FA]">
          Create New MVP
        </h1>
        <p className="text-lg text-[#6B7280] mt-4">
          Let AI auto-generate your SaaS startup code.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="max-w-5xl mx-auto bg-white p-10 rounded-3xl shadow-xl border border-[#E5E7EB] space-y-8"
      >
        {/* IDEA */}
        <div>
          <label className="block font-bold mb-2 text-xl">
            Describe Your Startup Idea
          </label>
          <textarea
            name="idea"
            value={formData.idea}
            onChange={handleChange}
            className="w-full p-4 border rounded-xl text-lg"
            rows={4}
            placeholder="Explain your startup idea..."
            required
          />
        </div>

        {/* INDUSTRY & AUDIENCE */}
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <label className="block font-bold mb-2 text-xl">
              Industry / Niche
            </label>
            <input
              type="text"
              name="industry"
              value={formData.industry}
              onChange={handleChange}
              className="w-full p-4 border rounded-xl text-lg"
              placeholder="Health, EdTech, FinTech etc."
              required
            />
          </div>

          <div>
            <label className="block font-bold mb-2 text-xl">
              Target Audience
            </label>
            <input
              type="text"
              name="audience"
              value={formData.audience}
              onChange={handleChange}
              className="w-full p-4 border rounded-xl text-lg"
              placeholder="Who will use your app?"
              required
            />
          </div>
        </div>

        {/* FEATURES */}
        <div>
          <label className="block font-bold mb-4 text-xl">
            Select Required Features
          </label>
          <div className="grid md:grid-cols-2 gap-4">
            {featuresOptions.map((feature) => (
              <label
                key={feature}
                className="flex items-center gap-3 bg-[#F9FAFB] border border-[#E5E7EB] p-4 rounded-xl shadow-sm"
              >
                <input
                  type="checkbox"
                  checked={formData.features.includes(feature)}
                  onChange={() => handleFeatureChange(feature)}
                  className="w-5 h-5"
                />
                <span className="text-lg">{feature}</span>
              </label>
            ))}
          </div>
        </div>

        {/* OTHER SELECT OPTIONS */}
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <label className="block font-bold mb-2 text-xl">
              Authentication Required?
            </label>
            <select
              name="auth"
              value={formData.auth}
              onChange={handleChange}
              className="w-full p-4 border rounded-xl text-lg"
              required
            >
              <option value="">Select</option>
              <option value="Yes">Yes - User Login</option>
              <option value="No">No - Public Access</option>
            </select>
          </div>

          <div>
            <label className="block font-bold mb-2 text-xl">
              Database Preference
            </label>
            <select
              name="database"
              value={formData.database}
              onChange={handleChange}
              className="w-full p-4 border rounded-xl text-lg"
              required
            >
              <option value="">Select</option>
              <option value="Supabase (PostgreSQL)">Supabase (PostgreSQL)</option>
              <option value="MongoDB Atlas">MongoDB Atlas</option>
              <option value="AI-generated Schema">AI-generated Schema</option>
            </select>
          </div>

          <div>
            <label className="block font-bold mb-2 text-xl">
              Design Style
            </label>
            <select
              name="design"
              value={formData.design}
              onChange={handleChange}
              className="w-full p-4 border rounded-xl text-lg"
              required
            >
              <option value="">Select</option>
              <option value="Minimalist">Minimalist</option>
              <option value="Modern SaaS">Modern SaaS</option>
              <option value="Dark Mode">Dark Mode</option>
              <option value="Custom Branding">Custom Branding</option>
            </select>
          </div>

          <div>
            <label className="block font-bold mb-2 text-xl">
              Deployment Preference
            </label>
            <select
              name="deployment"
              value={formData.deployment}
              onChange={handleChange}
              className="w-full p-4 border rounded-xl text-lg"
              required
            >
              <option value="">Select</option>
              <option value="Vercel">Vercel</option>
              <option value="Render">Render</option>
              <option value="Supabase Hosting">Supabase Hosting</option>
              <option value="Manual">Manual</option>
            </select>
          </div>

          <div>
            <label className="block font-bold mb-2 text-xl">
              AI Model Preference
            </label>
            <select
              name="aiModel"
              value={formData.aiModel}
              onChange={handleChange}
              className="w-full p-4 border rounded-xl text-lg"
              required
            >
              <option value="">Select</option>
              <option value="Mistral 7B">Mistral 7B</option>
              <option value="LLaMA 3 8B">LLaMA 3 8B</option>
              <option value="Phi-3">Phi-3</option>
              <option value="Use Recommended">Use Recommended Model</option>
              
            </select>
            
          </div>
          <div className="pt-2">
          <button
            type="submit"
            className="flex gap-3 items-center justify-center w-full py-7 text-2xl font-bold bg-gradient-to-r from-[#2563EB] via-[#8B5CF6] to-[#60A5FA] text-white rounded-xl hover:scale-105 transition transform"
          >
            <FaRocket className="text-3xl" />
            Generate MVP
          </button>
        </div>
        </div>

        
      </form>
    </div>
  );
}
