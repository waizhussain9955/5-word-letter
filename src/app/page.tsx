"use client";

import { motion } from "framer-motion";
import { ArrowRight, Search, BookOpen, Globe, Shield, Sparkles } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const sections = [
    { len: 3, label: "3 Letters", items: "1,800+ words", color: "from-blue-500 to-indigo-600" },
    { len: 4, label: "4 Letters", items: "2,100+ words", color: "from-indigo-600 to-violet-600" },
    { len: 5, label: "5 Letters", items: "2,400+ words", color: "from-blue-600 to-cyan-600" },
    { len: 6, label: "6 Letters", items: "2,000+ words", color: "from-violet-600 to-purple-600" },
    { len: 7, label: "7 Letters", items: "1,700+ words", color: "from-purple-600 to-pink-600" }
  ];

  return (
    <div className="pt-40 pb-32 px-4 max-w-7xl mx-auto overflow-hidden">

      {/* Premium Hero Section */}
      <section className="text-center mb-32 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/10 blur-[120px] rounded-full pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-900/20 px-5 py-2 rounded-full text-blue-600 dark:text-blue-400 text-xs font-black mb-10 border border-blue-100 dark:border-blue-800/50"
        >
          <Sparkles className="w-4 h-4 fill-current" />
          <span>THE MODERN DICTIONARY HUB</span>
        </motion.div>

        <h1 className="text-6xl md:text-8xl font-black text-slate-900 dark:text-white mb-8 tracking-tighter leading-[0.9]">
          <span className="text-blue-600">Discover</span> the <br />
          Perfect Word.
        </h1>

        <p className="text-xl md:text-2xl text-slate-500 dark:text-slate-400 max-w-3xl mx-auto mb-12 font-bold leading-relaxed">
          The cleanest, fastest, and most curated dictionary for word games,
          creative writing, and linguistic research.
        </p>

        <div className="flex flex-wrap justify-center gap-6">
          <Link href="/list/5" className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-5 rounded-[2rem] font-black text-xl transition-all flex items-center gap-3 group shadow-2xl shadow-blue-500/30">
            Start Exploring
            <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
          </Link>
          <Link href="/about-us" className="bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 text-slate-800 dark:text-slate-200 px-10 py-5 rounded-[2rem] font-black text-xl transition-all flex items-center gap-3 hover:bg-slate-50 dark:hover:bg-slate-800/50 shadow-xl">
            Our Mission
            <Globe className="w-6 h-6 opacity-50" />
          </Link>
        </div>
      </section>

      {/* Elegant Selection Grid */}
      <div className="flex items-center gap-4 mb-16">
        <div className="h-px flex-1 bg-slate-200 dark:bg-slate-800" />
        <h2 className="text-xs font-black text-slate-400 uppercase tracking-[0.4em]">Archival Segments</h2>
        <div className="h-px flex-1 bg-slate-200 dark:bg-slate-800" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-40">
        {sections.map((s, i) => (
          <Link key={s.len} href={`/list/${s.len}`} className="group relative p-10 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[2.5rem] hover:border-blue-500 hover:shadow-2xl transition-all overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-125 transition-transform duration-500 scale-100">
              <Search className="w-32 h-32" />
            </div>

            <div className={`w-14 h-14 bg-gradient-to-br ${s.color} rounded-2xl flex items-center justify-center text-white mb-8 shadow-xl relative z-10`}>
              <span className="text-2xl font-black italic">{s.len}</span>
            </div>

            <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2 relative z-10">{s.label}</h3>
            <p className="text-sm text-slate-500 font-bold mb-10 relative z-10 uppercase tracking-widest">{s.items}</p>

            <div className="text-blue-600 font-black text-xs uppercase tracking-widest flex items-center gap-2 group-hover:gap-4 transition-all relative z-10">
              Access List <ArrowRight className="w-4 h-4" />
            </div>
          </Link>
        ))}
      </div>

      {/* Features Showcase */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 py-24 border-y border-slate-100 dark:border-slate-800">
        {[
          { icon: Search, title: "Precision Search", desc: "Use advanced patterns like B_E_T to find exactly what you need in milliseconds." },
          { icon: Shield, title: "Verified Data", desc: "Every word in our archive is hand-verified for semantic integrity and accuracy." },
          { icon: BookOpen, title: "Linguistic Hub", desc: "From 3 to 7 letters, we cover every core segment used in modern communication." }
        ].map((f, i) => (
          <div key={i} className="flex flex-col items-center text-center px-4">
            <div className="w-16 h-16 bg-blue-50 dark:bg-blue-900/20 rounded-2xl flex items-center justify-center text-blue-600 mb-8 border border-blue-100 dark:border-blue-800">
              <f.icon className="w-8 h-8" />
            </div>
            <h4 className="text-xl font-black mb-4">{f.title}</h4>
            <p className="text-slate-500 dark:text-slate-400 font-bold leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
