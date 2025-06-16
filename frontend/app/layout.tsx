"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import React, { ReactNode } from "react";
import { SessionContextProvider, useSessionContext } from "@supabase/auth-helpers-react";
import { supabase } from "@/lib/supabase";
import { Toaster } from "react-hot-toast";

<Toaster position="top-right" />

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <SessionContextProvider supabaseClient={supabase}>
      <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-black`}>
          <AuthLayout>{children}</AuthLayout>
        </body>
      </html>
    </SessionContextProvider>
  );
}

function AuthLayout({ children }: { children: ReactNode }) {
  const { session} = useSessionContext();



  return session ? (
    <>
      <Sidebar />
      <main className="min-h-screen ml-60">
        {children}
      </main>
    </>
  ) : (
    <main className="min-h-screen">
      {children}
    </main>
  );
}
