"use client";

import React from "react";

const Loading: React.FC = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-80 backdrop-blur-md">
      <div className="relative flex items-center justify-center">
        {/* Outer spinning ring */}
        <div className="w-24 h-24 rounded-full border-8 border-transparent border-t-[#2563EB] border-r-[#8B5CF6] border-b-[#60A5FA] border-l-[#DB2777] animate-spin"></div>

        {/* Glowing pulse inside */}
        <div className="absolute w-14 h-14 rounded-full bg-gradient-to-r from-[#2563EB] via-[#8B5CF6] to-[#60A5FA] shadow-xl animate-pulse"></div>
      </div>
    </div>
  );
};

export default Loading;
