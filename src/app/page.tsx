"use client";

import { motion } from "framer-motion";
import { ArrowRight, Book, Globe, Zap, Search, LayoutGrid } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function Home() {
  const sections = [
    { len: 5, label: "5 Letters", desc: "The Primary Corpus", color: "bg-blue-600", words: "2,000+" },
    { len: 3, label: "3 Letters", desc: "The Concise Set", color: "bg-purple-600", words: "2,000+" },
    { len: 4, label: "4 Letters", desc: "The Daily Core", color: "bg-indigo-600", words: "2,000+" },
    { len: 6, label: "6 Letters", desc: "Extended Lexicon", color: "bg-violet-600", words: "2,000+" },
    { len: 7, label: "7 Letters", desc: "Scientific Index", color: "bg-blue-500", words: "2,000+" }
  ];

  return (
    <div className="pt-40 pb-20 relative">
      <div className="max-w-7xl mx-auto px-6">

        {/* Modern Hero */}
        <div className="text-center mb-32">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-900/20 px-4 py-2 rounded-full text-blue-600 dark:text-blue-400 text-xs font-bold mb-8"
          >
            <Zap className="w-4 h-4" />
            <span>2026 Dictionary Architecture</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-8xl font-black tracking-tight mb-8 leading-[1.1] text-slate-900 dark:text-white"
          >
            Find the perfect <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-violet-600">5-Letter Word.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            We've indexed over 10,000 curated words processed with millisecond precision logic.
            The ultimate tool for creators and gamers.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap justify-center gap-6"
          >
            <Link href="/list/5" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all shadow-xl shadow-blue-600/20 flex items-center gap-3">
              Start Exploring
              <ArrowRight className="w-5 h-5" />
            </Link>
            <button className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-slate-50 transition-all flex items-center gap-3">
              Search Database
              <Search className="w-5 h-5 opacity-50" />
            </button>
          </motion.div>
        </div>

        {/* Dynamic Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-32">
          {sections.map((s, i) => (
            <motion.div
              key={s.len}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="prism-card p-8 group flex flex-col justify-between"
            >
              <div>
                <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center text-white mb-6 shadow-lg", s.color)}>
                  <LayoutGrid className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold mb-2">{s.label}</h3>
                <p className="text-sm text-slate-500 font-medium mb-8">{s.desc}</p>
              </div>

              <Link href={`/list/${s.len}`} className="flex items-center justify-between group-hover:text-blue-600 transition-colors">
                <span className="text-xs font-bold uppercase tracking-widest">{s.words} Words</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Core Features */}
        <div className="bg-slate-50 dark:bg-slate-950 rounded-[2.5rem] p-12 md:p-20 grid grid-cols-1 md:grid-cols-3 gap-16 border border-slate-100 dark:border-slate-900">
          {[
            { icon: Zap, title: "0ms Search", desc: "Instant pattern matching results across all datasets." },
            { icon: Globe, title: "Standardized", desc: "Fully compatible with Worldle and competitive Scrabble." },
            { icon: Book, title: "Curated", desc: "No noise. Every word is hand-verified for integrity." }
          ].map((f, i) => (
            <div key={i} className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-white dark:bg-slate-900 rounded-2xl flex items-center justify-center text-blue-600 mb-6 shadow-sm">
                <f.icon className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-bold mb-4">{f.title}</h4>
              <p className="text-slate-500 font-medium leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
