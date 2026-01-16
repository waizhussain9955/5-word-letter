"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, Zap, Globe, Layers } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";

export default function Home() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);

  return (
    <div ref={containerRef} className="relative pt-20 overflow-hidden bg-[var(--background)]">

      {/* 1. HERO SECTION - Precision Aligned */}
      <section className="min-h-screen flex flex-col lg:flex-row relative lg:px-24">
        {/* Left Side: Massive Typography */}
        <div className="flex-1 flex flex-col justify-center px-6 py-24 relative z-10 lg:pr-24 lg:border-r border-[var(--border)]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mb-12"
          >
            <div className="flex items-center gap-4 mb-10">
              <div className="h-px w-16 bg-amber-500" />
              <span className="font-heading font-black text-amber-500 tracking-[0.5em] text-[11px] uppercase">Linguistic Architecture</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-heading font-black leading-[0.9] tracking-tighter mb-12 uppercase">
              5-LETTER <br />
              <span className="text-luxury">WORD.</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-500 dark:text-zinc-500 max-w-lg font-bold leading-relaxed mb-20 tracking-tight">
              The world's most curated repository of precision language. Experience the intersection of technology and linguistics.
            </p>

            <div className="flex flex-wrap gap-12">
              <Link href="/list/5" className="group flex items-center gap-6 py-6 border-b-6 border-amber-500 hover:gap-12 transition-all">
                <span className="font-heading font-black text-3xl">OPEN_ARCHIVE</span>
                <ArrowUpRight className="w-10 h-10 text-amber-500 group-hover:rotate-45 transition-transform" />
              </Link>
            </div>
          </motion.div>

          {/* Micro Stats - Aligned Bottom */}
          <div className="mt-auto grid grid-cols-3 gap-12 pt-24 border-t border-[var(--border)]">
            {[
              { val: "16K+", label: "ENTRIES" },
              { val: "0.1MS", label: "LATENCY" },
              { val: "GOLD", label: "STANDARD" }
            ].map((s, i) => (
              <div key={i} className="flex flex-col gap-3">
                <span className="text-[10px] font-black text-gray-400 dark:text-zinc-800 tracking-[0.3em] uppercase">{s.label}</span>
                <span className="font-heading font-black text-2xl tracking-tighter">{s.val}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Interactive Grid Visuals */}
        <div className="flex-1 relative hidden lg:block overflow-hidden bg-black dark:bg-zinc-950">
          <motion.div
            style={{ y: useTransform(scrollYProgress, [0, 1], [0, -400]) }}
            className="absolute inset-0 flex flex-col gap-8 p-12"
          >
            {["ALPHA", "BETA", "LEXIS", "OMNI", "ZETA", "DATA"].map((label, i) => (
              <div key={i} className="min-h-[400px] w-full bg-white dark:bg-black border-2 border-zinc-100 dark:border-zinc-900 flex items-center justify-center relative group rounded-[3rem] shadow-2xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <span className="font-heading text-9xl font-black text-gray-100 dark:text-white/5 select-none uppercase transition-all duration-700 group-hover:scale-125 group-hover:text-amber-500/20">
                  {label}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 2. HORIZONTAL KINETIC SCROLL - Adjusted Padding */}
      <div className="py-32 border-y border-[var(--border)] bg-black text-white relative flex items-center">
        <motion.div style={{ x }} className="flex gap-20 whitespace-nowrap px-10">
          {[...Array(6)].map((_, i) => (
            <span key={i} className="text-[140px] font-heading font-black tracking-tighter opacity-10 hover:opacity-100 hover:text-amber-500 transition-all cursor-default select-none uppercase">
              ARCHIVE_PROTOCOL_5_LETTER_WORD
            </span>
          ))}
        </motion.div>
      </div>

      {/* 3. THE COLLECTIONS - Added Gaps and Better Alignment */}
      <section className="py-40 px-6 lg:px-24">
        <div className="max-w-[1400px] mx-auto">
          <header className="mb-32 flex flex-col md:flex-row md:items-end justify-between gap-12">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <span className="font-heading font-black text-amber-500 uppercase tracking-widest text-xs">Section_02</span>
                <div className="h-px w-24 bg-amber-500/20" />
              </div>
              <h2 className="text-6xl md:text-9xl font-heading font-black tracking-tighter uppercase leading-[0.8]">The <br />Collections.</h2>
              <p className="text-gray-500 dark:text-zinc-500 font-bold text-xl uppercase tracking-tight">Curated lexical matrices for rapid retrieval.</p>
            </div>
            <Link href="/blog" className="group flex items-center gap-4 py-4 px-10 bg-black dark:bg-white text-white dark:text-black rounded-full font-heading font-black text-xs tracking-widest hover:bg-amber-500 hover:text-black transition-all shadow-2xl">
              VIEW JOURNAL <ArrowUpRight className="w-5 h-5 group-hover:rotate-45 transition-transform" />
            </Link>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[
              { len: 5, label: "Daily Core", desc: "The gold standard for modern word-based interactions and logic puzzles." },
              { len: 3, label: "Snap Tier", desc: "Short, sharp, and high-impact vocabulary for aggressive communication." },
              { len: 7, label: "Scholar", desc: "Complex structures and multi-syllabic entries for precise scholarly work." }
            ].map((cat, i) => (
              <Link
                key={cat.len}
                href={`/list/${cat.len}`}
                className="luxury-card p-16 flex flex-col justify-between aspect-square group shadow-none hover:border-amber-500/50"
              >
                <div className="flex justify-between items-start">
                  <span className="font-heading text-8xl font-black text-gray-100 dark:text-zinc-900 group-hover:text-amber-500 transition-all duration-500">0{i + 1}</span>
                  <ArrowUpRight className="w-10 h-10 opacity-20 group-hover:opacity-100 group-hover:translate-x-3 transition-all" />
                </div>
                <div>
                  <h3 className="text-4xl font-heading font-black mb-6 uppercase tracking-tight">{cat.label}</h3>
                  <p className="text-gray-400 font-black text-xs leading-relaxed mb-12 uppercase tracking-widest opacity-60">{cat.desc}</p>
                  <div className="h-1.5 w-full bg-zinc-50 dark:bg-zinc-900 overflow-hidden relative rounded-full">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: "100%" }}
                      transition={{ duration: 1, delay: i * 0.2 }}
                      className="absolute inset-0 bg-amber-500"
                    />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 4. PERFORMANCE ARCHITECTURE - Better Row Alignment */}
      <section className="py-40 px-6 lg:px-24 bg-black text-white relative overflow-hidden">
        <div className="absolute inset-0 geometric-bg opacity-5 scale-150 rotate-12" />

        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-32 items-center relative z-10">
          <div className="space-y-20">
            <h2 className="text-7xl md:text-[120px] font-heading font-black tracking-tighter leading-[0.8] uppercase">
              EXTREME <br /> <span className="text-amber-500">VELOCITY_</span>
            </h2>
            <div className="space-y-16">
              {[
                { title: "No Latency Logic", desc: "Instant pattern matching across 20,000+ localized entries." },
                { title: "Institutional Data", desc: "Verified against global Oxford and Scrabble linguistic standards." },
                { title: "Recursive Search", desc: "Advanced regex-based discovery engine for deep pattern analysis." }
              ].map((f, i) => (
                <div key={i} className="flex gap-10 group">
                  <div className="w-20 h-20 bg-zinc-900 border border-zinc-800 rounded-2xl flex items-center justify-center text-amber-500 group-hover:bg-amber-500 group-hover:text-black transition-all group-hover:scale-110">
                    <Zap className="w-10 h-10" />
                  </div>
                  <div>
                    <h4 className="text-3xl font-heading font-black uppercase mb-4 tracking-tight">{f.title}</h4>
                    <p className="text-gray-500 font-bold max-w-sm tracking-tight">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative aspect-square hidden lg:flex flex-col justify-center items-center">
            <div className="w-full max-w-lg aspect-square border-2 border-amber-500/20 rounded-full flex items-center justify-center animate-spin-slow">
              <div className="w-[80%] h-[80%] border-2 border-amber-500/10 rounded-full flex items-center justify-center animate-reverse-slow">
                <div className="w-[60%] h-[60%] border-2 border-amber-500/5 rounded-full" />
              </div>
            </div>
            <div className="absolute flex flex-col items-center">
              <div className="text-[12px] font-black tracking-[0.5em] text-amber-500 mb-8 uppercase bg-black px-6">System Core</div>
              <div className="text-7xl font-heading font-black uppercase animate-pulse">Online</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
