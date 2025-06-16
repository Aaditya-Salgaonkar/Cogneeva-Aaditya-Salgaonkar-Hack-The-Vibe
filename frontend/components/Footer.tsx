import React from "react";

export default function Footer() {
  return (
    <footer className="w-full bg-[#cbddff] border-t border-[#E5E7EB] text-[#1A1A1A]">
      <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          <h1 className="text-4xl font-extrabold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-[#2563EB] via-[#8B5CF6] to-[#60A5FA] py-2">
            Cogneeva
          </h1>
          <p className="text-md text-[#4B5563] font-light">
            Powered by <span className="font-semibold text-[#2563EB]">Galuxium</span>
          </p>
        </div>

        <div className="flex space-x-6">
          <a href="#" className="text-[#4B5563] hover:text-[#2563EB] transition-colors">
            Privacy Policy
          </a>
          <a href="#" className="text-[#4B5563] hover:text-[#2563EB] transition-colors">
            Terms of Service
          </a>
          <a href="#" className="text-[#4B5563] hover:text-[#2563EB] transition-colors">
            Contact
          </a>
        </div>
      </div>

      <div className="border-t border-[#E5E7EB] mt-6">
        <p className="text-center text-xs text-[#9CA3AF] py-4">
          © {new Date().getFullYear()} Cogneeva. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
