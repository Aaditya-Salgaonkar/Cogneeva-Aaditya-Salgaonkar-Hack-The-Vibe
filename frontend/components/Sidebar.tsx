"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  FaTachometerAlt,
  FaCogs,
  FaRocket,
  FaFlask,
  FaUser,
  FaSignOutAlt,
  FaBolt
} from "react-icons/fa";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const session = useSession();
  const supabase = useSupabaseClient();

  const menuItems = [
    { label: "Dashboard", icon: <FaTachometerAlt />, path: "/dashboard" },
    { label: "Manage MVPs", icon: <FaCogs />, path: "/manage-mvps" },
    { label: "Galuxium AI", icon: <FaBolt />, path: "/ai" },
    { label: "Deployments", icon: <FaRocket />, path: "/deployments" },
    { label: "AI Lab", icon: <FaFlask />, path: "/ai-lab" },
    { label: "Account", icon: <FaUser />, path: "/account" },
  ];

  
  const handleSelect = (path: string) => {
    if (pathname !== path) {
      router.push(path);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  return (
    <aside className="w-60 h-screen bg-white border-r border-[#E0F2FE] shadow-lg flex flex-col justify-between fixed z-50">
      <div className="p-6">
        <div>
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#2563EB] via-[#8B5CF6] to-[#60A5FA] py-2">
            Cogneeva
          </h1>
        </div>

        <nav className="flex flex-col gap-5 mt-10">
          {menuItems.map(({ label, icon, path }) => (
            <MenuItem
              key={label}
              icon={icon}
              label={label}
              path={path}
              isActive={pathname === path}
              onSelect={handleSelect}
            />
          ))}
        </nav>

      </div>

      <div className="flex flex-col items-center gap-3 p-4 border-t border-[#E0F2FE]">
        {session ? (
          <>
          {console.log(session)}
            
            <div
              onClick={handleSignOut}
              className="flex items-center gap-2 cursor-pointer text-[#2563EB] font-semibold text-sm hover:underline transition"
            >
              <FaSignOutAlt />
              Sign Out
            </div>
          </>
        ) : (
          <div className="text-sm text-gray-500">Not signed in</div>
        )}
        <div className="text-sm text-gray-500 mt-3">
          Powered by <span className="font-bold">Galuxium</span>
        </div>
      </div>
    </aside>
  );
}



type MenuItemProps = {
  icon: React.ReactNode;
  label: string;
  path: string;
  isActive: boolean;
  onSelect: (path: string) => void;
};

function MenuItem({ icon, label, path, isActive, onSelect }: MenuItemProps) {
  return (
    <div
      onClick={() => onSelect(path)}
      className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-all relative group
        ${isActive ? "text-[#2563EB] font-semibold" : "hover:bg-[#F5F5F5]"}`}
    >
      <span className={`text-lg transition-colors ${isActive ? "text-gradient" : "text-gray-700"}`}>
        {icon}
      </span>
      <span className={`font-medium transition-colors ${isActive ? "text-gradient" : "text-gray-700"}`}>
        {label}
      </span>

      {isActive && (
        <div className="absolute bottom-0 left-4 right-4 h-[3px] bg-gradient-to-r from-[#2563EB] via-[#8B5CF6] to-[#60A5FA] rounded-full transition-all duration-300"></div>
      )}
    </div>
  );
}




