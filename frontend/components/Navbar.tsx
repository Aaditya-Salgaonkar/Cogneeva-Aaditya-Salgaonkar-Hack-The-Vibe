"use client";

import React from "react";
import { Button } from "./ui/button";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const session = useSession();
  const supabase = useSupabaseClient();
  const router = useRouter();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/login");  // Redirect to login after sign out
  };

  return (
    <div className="mx-5 my-4 flex flex-row justify-between items-center">
      <div>
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#2563EB] via-[#8B5CF6] to-[#60A5FA] py-2">
          Cogneeva
        </h1>
      </div>

      <div className="flex flex-row gap-5 py-2 items-center">
        {session ? (
          <>
            <div className="text-lg font-semibold">
              {session.user.email}
            </div>
            <Button
              onClick={handleSignOut}
              className="bg-gradient-to-r from-[#2563EB] via-[#8B5CF6] to-[#60A5FA] text-white hover:scale-105 transition-all shadow-lg font-semibold px-6 py-3 rounded-xl"
            >
              Sign Out
            </Button>
          </>
        ) : (
          <>
            <Button
              onClick={() => router.push("/login")}
              className="bg-gradient-to-r from-[#2563EB] via-[#8B5CF6] to-[#60A5FA] text-white hover:scale-105 transition-all shadow-lg font-semibold px-6 py-3 rounded-xl"
            >
              Log In
            </Button>
            <Button
              onClick={() => router.push("/signup")}
              variant={"outline"}
              className="border-2 border-[#2563EB] text-[#2563EB] hover:scale-105 hover:text-[#2563EB] transition-all shadow-lg font-semibold px-6 py-3 rounded-xl"
            >
              Sign Up
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
