"use client";

import { motion } from "framer-motion";
import { ArrowRight, Search, BookOpen } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const sections = [
    { len: 5, label: "5 Letters", items: "2,400+ words", color: "bg-blue-600" },
    { len: 4, label: "4 Letters", items: "2,100+ words", color: "bg-indigo-600" },
    { len: 3, label: "3 Letters", items: "1,800+ words", color: "bg-slate-700" },
    { len: 6, label: "6 Letters", items: "2,000+ words", color: "bg-blue-500" },
    { len: 7, label: "7 Letters", items: "1,700+ words", color: "bg-indigo-500" }
  ];

  return (
    <div className="pt-32 pb-20 px-4 max-w-6xl mx-auto">

      {/* Simple Hero */}
      <section className="text-center mb-20 py-10">
        <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 dark:text-white mb-6 tracking-tight leading-none">
          Find the perfect <br />
          <span className="text-blue-600">Word.</span>
        </h1>
        <p className="text-lg md:text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto mb-10 font-medium">
          The cleanest dictionary tool for Wordle, games, and research.
          Browse thousands of curated words with powerful pattern filters.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/list/5" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all flex items-center gap-2 group shadow-lg shadow-blue-500/20">
            Search 5-Letter Words
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link href="/about-us" className="bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 px-8 py-4 rounded-2xl font-bold text-lg transition-all flex items-center gap-2">
            Learn More
            <BookOpen className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Simplified Selection Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {sections.map((s, i) => (
          <Link key={s.len} href={`/list/${s.len}`} className="group p-8 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-3xl hover:border-blue-500 hover:shadow-xl transition-all block">
            <div className={`w-12 h-12 ${s.color} rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
              <span className="text-lg font-bold">{s.len}</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">{s.label}</h3>
            <p className="text-sm text-slate-500 font-medium mb-8">{s.items}</p>
            <div className="text-blue-600 font-bold text-sm flex items-center gap-2 group-hover:translate-x-1 transition-transform">
              Open List <ArrowRight className="w-4 h-4" />
            </div>
          </Link>
        ))}
      </div>

      {/* Simple Search Callout */}
      <div className="mt-20 p-12 bg-slate-900 dark:bg-blue-900/10 rounded-[2.5rem] text-center text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 p-10 opacity-10"><Search className="w-48 h-48" /></div>
        <h2 className="text-3xl font-bold mb-4 relative z-10">Instant Pattern Matching.</h2>
        <p className="text-slate-300 mb-8 max-w-xl mx-auto relative z-10 font-medium">
          Use the "_" wildcard to find words with specific letters in certain positions.
          Powerful filtering designed to be simple.
        </p>
        <Link href="/list/5" className="inline-flex items-center gap-2 bg-white text-slate-900 px-8 py-3.5 rounded-xl font-bold hover:bg-slate-100 transition-all">
          Start Searching <Search className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
