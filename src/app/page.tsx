"use client";

import { motion } from "framer-motion";
import { ArrowRight, Book, Globe, Zap, Search, LayoutGrid, Sparkles, ChevronRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function Home() {
  const sections = [
    { len: 5, label: "5 Letters", desc: "Most popular wordle core.", color: "bg-indigo-600", words: "2.4k" },
    { len: 3, label: "3 Letters", desc: "Short, sharp dictionary.", color: "bg-rose-500", words: "1.8k" },
    { len: 4, label: "4 Letters", desc: "Everyday word patterns.", color: "bg-emerald-600", words: "2.1k" },
    { len: 6, label: "6 Letters", desc: "Extended lexis database.", color: "bg-amber-500", words: "1.9k" },
    { len: 7, label: "7 Letters", desc: "Advanced linguistic tier.", color: "bg-blue-600", words: "1.7k" }
  ];

  return (
    <div className="relative pt-40 pb-32 overflow-hidden">
      <div className="bg-mesh" />
      <div className="noise-overlay" />

      <div className="max-w-7xl mx-auto px-6">

        {/* Stylish Hero */}
        <div className="max-w-4xl mb-32">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 bg-indigo-50 dark:bg-indigo-900/20 px-4 py-2 rounded-full text-indigo-600 dark:text-indigo-400 text-xs font-bold mb-8 border border-indigo-100 dark:border-indigo-800/50"
          >
            <Sparkles className="w-4 h-4" />
            <span>The New Standard in Word Discovery</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-[5.5rem] font-bold tracking-tight mb-8 leading-[1.05] text-zinc-900 dark:text-white"
          >
            The Ultimate <br />
            <span className="text-gradient">Linguistic Archive.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-zinc-500 dark:text-zinc-400 font-medium mb-12 leading-relaxed max-w-2xl"
          >
            Precision-engineered for creators, gamers, and scholars.
            Access a verified database of thousands of words with millisecond pattern matching.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap gap-4"
          >
            <Link href="/list/5" className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4.5 rounded-2xl font-bold text-lg transition-all shadow-xl shadow-indigo-600/20 flex items-center gap-3">
              Start Exploring
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/blog" className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-8 py-4.5 rounded-2xl font-bold text-lg hover:border-zinc-300 dark:hover:border-zinc-700 transition-all flex items-center gap-3">
              Read the Journal
              <Book className="w-5 h-5 opacity-40" />
            </Link>
          </motion.div>
        </div>

        {/* Bento Grid Categories */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-6 mb-40">
          {/* Featured Slot */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="md:col-span-4 stylish-card p-10 flex flex-col justify-between group overflow-hidden relative"
          >
            <div className="absolute top-0 right-0 p-12 opacity-[0.03] group-hover:scale-110 transition-transform duration-700 pointer-events-none">
              <LayoutGrid className="w-64 h-64 text-slate-900" />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-600 mb-6 block">CORE DATABASE</span>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">Access the <br /> 5-Letter Dictionary.</h2>
              <p className="text-zinc-500 font-medium max-w-sm mb-10">Optimized for pattern matching and wildcard retrieval. The go-to reference for daily puzzles.</p>
            </div>
            <Link href="/list/5" className="inline-flex items-center gap-3 font-bold text-zinc-900 dark:text-white group-hover:gap-5 transition-all">
              View Dictionary <ChevronRight className="w-5 h-5 text-indigo-600" />
            </Link>
          </motion.div>

          {/* Small Slots */}
          {sections.filter(s => s.len !== 5).map((s, i) => (
            <motion.div
              key={s.len}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="md:col-span-2 stylish-card p-8 group flex flex-col justify-between"
            >
              <div className={cn("w-11 h-11 rounded-xl flex items-center justify-center text-white mb-6 shadow-lg", s.color)}>
                <div className="text-sm font-black">{s.len}</div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-1">{s.label}</h3>
                <p className="text-xs text-zinc-500 font-medium mb-6">{s.desc}</p>
              </div>
              <Link href={`/list/${s.len}`} className="flex items-center justify-between group-hover:text-indigo-600 transition-colors">
                <span className="text-[10px] font-black text-zinc-400 group-hover:text-indigo-400 transition-colors uppercase tracking-widest">{s.words} WORDS</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Minimal Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pb-20">
          {[
            { icon: Zap, title: "0ms Delivery", desc: "Instant response times integrated with local caching for precision searching." },
            { icon: Globe, title: "Linguistic Sync", desc: "Verified datasets aligned with Oxford standards and competitive platforms." },
            { icon: LayoutGrid, title: "Grid Discovery", desc: "Advanced filtering system allowing for wildcard and exclusion pattern logic." }
          ].map((f, i) => (
            <div key={i} className="space-y-6">
              <div className="w-12 h-12 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl flex items-center justify-center text-indigo-600">
                <f.icon className="w-6 h-6" />
              </div>
              <h4 className="text-xl font-bold tracking-tight">{f.title}</h4>
              <p className="text-zinc-500 font-medium leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
