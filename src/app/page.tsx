"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, Search, Zap, Globe, Sparkles, Layers } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";

export default function Home() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);

  return (
    <div ref={containerRef} className="relative pt-32 lg:pt-0 overflow-hidden bg-[var(--background)]">

      {/* 1. ULTRA HERO SECTION */}
      <section className="min-h-screen flex flex-col lg:flex-row relative">
        {/* Left Side: Massive Typography */}
        <div className="flex-1 flex flex-col justify-center px-6 lg:px-24 py-20 relative z-10 border-r border-[var(--border)]">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-12"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="h-px w-12 bg-amber-500" />
              <span className="font-heading font-bold text-amber-500 tracking-[0.5em] text-[10px] uppercase">Est. 2026 Archive</span>
            </div>
            <h1 className="text-8xl md:text-[160px] font-heading font-black leading-[0.8] tracking-tighter mb-16">
              5-LETTER <br />
              <span className="text-luxury">WORD.</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-500 max-w-md font-medium leading-relaxed mb-16">
              A highly curated repository of precision language. Experience the intersection of technology and linguistics.
            </p>

            <div className="flex flex-wrap gap-10">
              <Link href="/list/5" className="group flex items-center gap-4 py-4 pr-10 border-b-2 border-amber-500 hover:gap-8 transition-all">
                <span className="font-heading font-black text-2xl">OPEN ARCHIVE</span>
                <ArrowUpRight className="w-6 h-6 text-amber-500 group-hover:rotate-45 transition-transform" />
              </Link>
            </div>
          </motion.div>

          {/* Micro Stats */}
          <div className="flex gap-12 mt-auto pt-24 border-t border-[var(--border)]">
            {["16K WORDS", "0.02MS LATENCY", "PREMIUM DATA"].map((s, i) => (
              <div key={i} className="flex flex-col gap-2">
                <span className="text-[10px] font-black text-gray-400 tracking-widest uppercase">{s.split(' ')[1]}</span>
                <span className="font-heading font-black text-xl">{s.split(' ')[0]}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Visual Masterpiece */}
        <div className="flex-1 relative hidden lg:block overflow-hidden bg-black">
          <motion.div
            style={{ y: useTransform(scrollYProgress, [0, 1], [0, -200]) }}
            className="absolute inset-0 flex flex-col gap-4 p-4"
          >
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-[300px] w-full bg-[var(--card)] border border-[var(--border)] relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-heading text-9xl font-black text-gray-100 dark:text-zinc-900 opacity-20 select-none uppercase">
                    {"AEIOUY"[i]}
                  </span>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 2. HORIZONTAL SCROLLING TEXT */}
      <div className="py-24 border-y border-[var(--border)] bg-black text-white overflow-hidden relative">
        <motion.div style={{ x }} className="flex gap-12 whitespace-nowrap">
          {[...Array(10)].map((_, i) => (
            <span key={i} className="text-[120px] font-heading font-black tracking-tighter opacity-20 hover:opacity-100 transition-opacity cursor-default">
              5-LETTER-WORD-ARCHIVE
            </span>
          ))}
        </motion.div>
      </div>

      {/* 3. PREMIUM COLLECTIONS */}
      <section className="py-40 px-6 max-w-7xl mx-auto">
        <header className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-12">
          <div>
            <h2 className="text-5xl md:text-7xl font-heading font-black tracking-tighter mb-4 uppercase">The Collections</h2>
            <p className="text-gray-500 font-medium">Selected lexical groups curated for creators.</p>
          </div>
          <Link href="/blog" className="font-black text-sm tracking-widest border-b-2 border-black dark:border-white pb-2 hover:text-amber-500 hover:border-amber-500 transition-all">
            VIEW ALL ARTICLES
          </Link>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0">
          {[
            { len: 5, label: "Daily Core", desc: "The standard for word-based interaction." },
            { len: 3, label: "Snap Tier", desc: "Short, sharp, and high-impact vocabulary." },
            { len: 7, label: "Scholar", desc: "Complex structures for professional writers." }
          ].map((cat, i) => (
            <Link
              key={cat.len}
              href={`/list/${cat.len}`}
              className="luxury-card p-16 flex flex-col justify-between aspect-square group bg-white dark:bg-black border-collapse"
            >
              <div className="flex justify-between items-start">
                <span className="font-heading text-7xl font-black text-amber-500 group-hover:scale-110 transition-transform">0{i + 1}</span>
                <ArrowUpRight className="w-8 h-8 opacity-0 group-hover:opacity-100 group-hover:translate-x-2' transition-all" />
              </div>
              <div>
                <h3 className="text-4xl font-heading font-black mb-4 uppercase">{cat.label}</h3>
                <p className="text-gray-400 font-medium text-sm leading-relaxed mb-8">{cat.desc}</p>
                <div className="h-1 w-full bg-gray-100 dark:bg-zinc-900 overflow-hidden relative">
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
      </section>

      {/* 4. FUTURISTIC FEATURES */}
      <section className="py-40 px-6 bg-black text-white relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div className="space-y-16">
            <h2 className="text-6xl md:text-8xl font-heading font-black tracking-tighter leading-[0.9] uppercase">
              Engineered <br /> for <span className="text-amber-500">Speed.</span>
            </h2>
            <div className="space-y-12">
              {[
                { icon: Zap, title: "0ms UI Interactions", desc: "Instant response across the entire grid." },
                { icon: Globe, title: "Global Dictionary Sync", desc: "Verified against world Scrabble standards." },
                { icon: Layers, title: "Pattern Logic", desc: "Regex-based discovery engine." }
              ].map((f, i) => (
                <div key={i} className="flex gap-8 group">
                  <div className="w-16 h-16 bg-zinc-900 flex items-center justify-center border border-zinc-800 text-amber-500 group-hover:bg-amber-500 group-hover:text-black transition-all">
                    <f.icon className="w-8 h-8" />
                  </div>
                  <div>
                    <h4 className="text-2xl font-black uppercase mb-2">{f.title}</h4>
                    <p className="text-gray-500 max-w-sm">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative aspect-square border-l border-zinc-900 pl-12 hidden lg:flex flex-col justify-center">
            <div className="luxury-card p-1 bg-amber-500/10 border-amber-500/20 aspect-video flex items-center justify-center p-12">
              <div className="text-center">
                <div className="text-[10px] font-black tracking-[0.4em] text-amber-500 mb-6 uppercase">Active Stream</div>
                <div className="text-6xl font-heading font-black animate-pulse">EXTRACTING...</div>
              </div>
            </div>
            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-amber-500/20 blur-[100px] rounded-full" />
          </div>
        </div>
      </section>
    </div>
  );
}
