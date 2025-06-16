"use client";

import { motion } from "framer-motion";
import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Session } from "@supabase/auth-helpers-react";
import { supabase } from "@/lib/supabase";
import { FaArrowLeft, FaSignInAlt } from "react-icons/fa";
import Link from "next/link";

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const sanitizeInput = (value: string) => value.trim();

  const storeSession = (session: Session | null) => {
    if (session) {
      sessionStorage.setItem("session", JSON.stringify(session));
    }
  };

  const handleLogin = useCallback(async () => {
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    setError("");
 setLoading(true);
    const sanitizedEmail = sanitizeInput(email);
    const sanitizedPassword = sanitizeInput(password);

    
setLoading(false);
    const { data, error } = await supabase.auth.signInWithPassword({
      email: sanitizedEmail,
      password: sanitizedPassword,
    });

    console.log(data);

    if (error) {
      setError("Invalid credentials. Please try again.");
    } else {
      const { data: sessionData, error: sessionError } =
        await supabase.auth.getSession();
      if (sessionError || !sessionData.session) {
        setError("Could not retrieve session. Please try again.");
      } else {
        storeSession(sessionData.session);
        router.push("/dashboard");
      }
    }
  }, [email, password, router]);

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center relative overflow-hidden">

        <div>
          <div className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-r from-[#2563EB] via-[#8B5CF6] to-[#60A5FA] opacity-20 blur-3xl z-0"></div>

          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative z-10 bg-white p-10 rounded-3xl shadow-2xl border border-[#E5E7EB] w-[27vw]"
          >
            {/* Header */}
            <div className="flex justify-center">
              <Link
                href={"/"}
                className="absolute left-6 top-6 p-2 rounded-full bg-white shadow-md hover:scale-105 transition-all duration-300"
              >
                <FaArrowLeft />
              </Link>
              <div className="p-4 bg-gradient-to-r from-[#2563EB] via-[#8B5CF6] to-[#60A5FA] rounded-full shadow-lg">
                <FaSignInAlt className="text-2xl text-white" />
              </div>
            </div>

            <h2 className="text-2xl font-extrabold mb-3 text-center bg-clip-text text-transparent bg-gradient-to-r from-[#2563EB] via-[#8B5CF6] to-[#60A5FA] py-5">
              Welcome Back
            </h2>

            {/* Error */}
            {error && (
              <div className="mb-4 text-red-500 text-sm text-center">
                {error}
              </div>
            )}

            {/* Inputs */}
            <div className="space-y-5">
              <motion.input
                whileFocus={{ scale: 1.05 }}
                className="w-full p-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2563EB] transition text-black h-12"
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(sanitizeInput(e.target.value))}
              />
              <motion.input
                whileFocus={{ scale: 1.05 }}
                className="w-full p-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2563EB] transition text-black h-12"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(sanitizeInput(e.target.value))}
              />
            </div>

            {/* Login Button */}
            <button
              onClick={handleLogin}
              disabled={loading}
              className="mt-8 w-full py-3 text-xl font-bold text-white rounded-xl bg-gradient-to-r from-[#2563EB] via-[#8B5CF6] to-[#60A5FA] hover:scale-105 transition-all duration-300"
            >
              {loading ? "Logging in..." : "Login"}
            </button>

            {/* Signup Redirect */}
            <motion.p
              onClick={() => router.push("/signup")}
              className="mt-6 text-center text-sm font-semibold text-[#2563EB] cursor-pointer hover:underline"
            >
              New here? Sign Up
            </motion.p>
          </motion.div>
        </div>
      
    </div>
  );
}
