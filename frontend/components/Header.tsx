import Link from 'next/link'
import React from 'react'

export default function Header() {
  return (
    <section className="w-full bg-white text-[#1A1A1A] py-32">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h1 className="text-5xl font-extrabold leading-tight mb-6 pt-5">
          Build Unicorn-Grade SaaS with{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#2563EB] via-[#8B5CF6] to-[#60A5FA]">
            Cogneeva
          </span>
        </h1>

        <p className="text-2xl text-gray-600 mb-12">
          Describe your idea. Watch your startup take shape. Powered by AI. Zero Code. Limitless Possibilities.
        </p>

        <div className="flex justify-center space-x-4 py-5">
          <Link href={"/signup"}>
          <button className="px-8 py-2 bg-gradient-to-r from-[#2563EB] via-[#8B5CF6] to-[#60A5FA] rounded-xl text-white text-lg font-semibold shadow-lg hover:scale-105 transition">
            Get Started
          </button></Link>
          <Link href={"#roadmap"}>
          <button className="px-8 py-2 border-2 border-[#2563EB] text-[#2563EB] rounded-xl text-lg font-semibold shadow-md hover:scale-105 transition">
            Learn More
          </button>
          </Link>
          
        </div>
      </div>
    </section>
  )
}
