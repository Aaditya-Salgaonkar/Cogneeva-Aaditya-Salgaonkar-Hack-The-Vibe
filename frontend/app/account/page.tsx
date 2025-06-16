"use client";

import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import Loading from "@/components/Loading";
import {FaEnvelope} from "react-icons/fa";

interface UserData {
  name: string;
  email: string;
}

export default function Account() {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

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
      <div className="mb-10">
        <h1 className="text-5xl py-3 font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-[#2563EB] via-[#8B5CF6] to-[#60A5FA]">
          My Account
        </h1>
        <p className="text-lg text-[#6B7280] mt-4">
          Manage your profile and account preferences
        </p>
      </div>

      <div className="bg-white p-8 rounded-3xl shadow-xl border border-[#E5E7EB] mb-12">
        <div className="flex items-center gap-8">
         
            <Image
              src={"/avatar.png"}
              alt="Avatar"
              width={128}
              height={128}
              className="rounded-full border border-[#E5E7EB]"
            />
          
          <div>
            <h2 className="text-3xl font-extrabold mb-2">{user.name}</h2>
            <p className="text-lg text-[#6B7280] flex items-center gap-2">
              <FaEnvelope /> {user.email}
            </p>
          </div>
        </div>
      </div>

     
    </div>
  );
}
