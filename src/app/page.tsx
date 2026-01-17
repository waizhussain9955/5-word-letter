"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Zap, Globe, Layers, Search, Command, Boxes, Orbit } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function Home() {
  const collections = [
    { len: 5, label: "CORE_5", desc: "The linguistic standard for modern logic puzzles.", icon: Boxes, color: "from-cyan-400 to-blue-600" },
    { len: 3, label: "SNAP_3", desc: "Short-burst communication patterns & fragments.", icon: Zap, color: "from-purple-500 to-pink-500" },
    { len: 7, label: "POLY_7", desc: "Complex structural matrices for advanced lexis.", icon: Orbit, color: "from-amber-400 to-orange-600" }
  ];

  return (
    <div className="relative pt-40 md:pt-60 pb-32 overflow-hidden px-6">

      {/* 1. KINETIC HERO HERO */}
      <section className="max-w-7xl mx-auto text-center relative z-10 mb-40 md:mb-64">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-3 bg-zinc-100 dark:bg-white/5 px-6 py-2.5 rounded-full border border-zinc-200 dark:border-white/10 mb-12 shadow-2xl"
        >
          <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse" />
          <span className="text-[10px] font-black uppercase tracking-[0.4em]">Protocol NOVA_V1.0</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-6xl md:text-[8rem] font-heading font-black tracking-tighter leading-[0.8] mb-12 uppercase"
        >
          WORLD <br />
          <span className="text-hyper">DEFINED.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-xl md:text-2xl text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto font-medium mb-16 leading-relaxed"
        >
          Access the most advanced 5-letter word archive. Built with millisecond precision for the era of intelligence.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-wrap justify-center gap-6"
        >
          <Link href="/list/5" className="nova-button text-white md:text-xl md:px-12 md:py-6 flex items-center gap-4">
            INITIALIZE ARCHIVE <ArrowUpRight className="w-6 h-6" />
          </Link>
          <Link href="/blog" className="px-10 py-5 rounded-full border-2 border-zinc-200 dark:border-zinc-800 font-black text-xs tracking-widest hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-all flex items-center gap-4">
            CORE JOURNAL [01]
          </Link>
        </motion.div>
      </section>

      {/* 2. DYNAMIC BENTO SECTION */}
      <section className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-20">
          <div>
            <h2 className="text-4xl md:text-6xl font-heading font-black tracking-tighter uppercase mb-4">The Datasets_</h2>
            <p className="text-zinc-500 font-bold uppercase text-[10px] tracking-[0.3em]">Select a corpus to begin discovery cycle</p>
          </div>
          <div className="hidden md:block h-px flex-1 mx-20 bg-gradient-to-r from-cyan-500/20 to-transparent" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 h-full">
          {/* Main Feature Box */}
          <motion.div
            whileHover={{ y: -10 }}
            className="md:col-span-12 lg:col-span-8 nova-card min-h-[500px] flex flex-col justify-between p-12 bg-gradient-to-br from-zinc-50 to-white dark:from-zinc-900 dark:to-black group"
          >
            <div className="flex justify-between items-start">
              <div className="w-20 h-20 bg-cyan-500 rounded-3xl flex items-center justify-center shadow-2xl shadow-cyan-500/30">
                <Command className="w-10 h-10 text-white" />
              </div>
              <span className="font-heading font-black text-8xl text-zinc-100 dark:text-zinc-900 group-hover:text-cyan-500/10 transition-colors">01</span>
            </div>
            <div>
              <h3 className="text-4xl md:text-6xl font-heading font-black tracking-tighter uppercase mb-6">Omni Archive <span className="text-cyan-500">5_</span></h3>
              <p className="text-zinc-500 text-xl font-medium max-w-md leading-relaxed mb-10">Our flagship dataset. 2,400+ hand-curated words optimized for rapid pattern recognition and verification.</p>
              <Link href="/list/5" className="inline-flex items-center gap-5 font-black text-xs tracking-[0.4em] uppercase hover:text-cyan-500 transition-colors">
                Synchronize Now <ArrowUpRight className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>

          {/* Side Boxes */}
          <div className="md:col-span-12 lg:col-span-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-8">
            {collections.filter(c => c.len !== 5).map((col, idx) => (
              <motion.div
                key={col.len}
                whileHover={{ x: 10 }}
                className="nova-card p-10 flex flex-col justify-between group"
              >
                <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center text-white bg-gradient-to-br shadow-xl", col.color)}>
                  <col.icon className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-3xl font-heading font-black uppercase mb-3">{col.label}</h4>
                  <p className="text-zinc-500 text-sm font-bold uppercase tracking-tight">{col.desc}</p>
                </div>
                <Link href={`/list/${col.len}`} className="mt-8 text-[10px] font-black tracking-[0.3em] uppercase group-hover:text-cyan-500 transition-colors flex items-center justify-between">
                  Access_Matrix <ArrowUpRight className="w-4 h-4" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. PERFORMANCE GRID */}
      <section className="max-w-7xl mx-auto py-40 md:py-60">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          {[
            { icon: Zap, label: "0.1ms Latency", desc: "Edge-optimized data retrieval for instantaneous results." },
            { icon: Globe, label: "Global Sync", desc: "Datasets updated in real-time across all regional nodes." },
            { icon: Layers, label: "Pattern Logic", desc: "Advanced recursive searching for professional linguistics." }
          ].map((f, i) => (
            <div key={i} className="space-y-8">
              <div className="w-16 h-16 bg-white dark:bg-zinc-900 rounded-2xl flex items-center justify-center border border-zinc-100 dark:border-zinc-800 shadow-xl">
                <f.icon className="w-8 h-8 text-cyan-500" />
              </div>
              <h4 className="text-2xl font-heading font-black uppercase tracking-tight">{f.label}</h4>
              <p className="text-zinc-500 font-bold leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. FINAL CTA */}
      <section className="max-w-5xl mx-auto text-center py-40 bg-zinc-900 rounded-[4rem] relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
        <div className="relative z-10 px-6">
          <h2 className="text-5xl md:text-8xl font-heading font-black text-white uppercase tracking-tighter mb-10 leading-none">
            Ready to begin <br /> the <span className="text-hyper">Discovery?</span>
          </h2>
          <Link href="/list/5" className="nova-button text-white uppercase text-sm tracking-[0.5em] px-16">Enter_The_Engine</Link>
        </div>
      </section>
    </div>
  );
}
