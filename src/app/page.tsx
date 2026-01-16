"use client";

import { motion } from "framer-motion";
import { ArrowRight, Zap, Globe, Sparkles, Layers, MousePointer2 } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const categories = [
    { len: 3, label: "Short & Sharp", desc: "3 Letters", color: "from-emerald-600 to-teal-400", words: "2,000" },
    { len: 4, label: "Core Lexicon", desc: "4 Letters", color: "from-teal-600 to-cyan-400", words: "2,000" },
    { len: 5, label: "Main Database", desc: "5 Letters", color: "from-emerald-500 to-green-300", featured: true, words: "2,000" },
    { len: 6, label: "Advanced Tier", desc: "6 Letters", color: "from-teal-500 to-emerald-300", words: "2,000" },
    { len: 7, label: "Scholar Tier", desc: "7 Letters", color: "from-cyan-600 to-teal-400", words: "2,000" }
  ];

  return (
    <div className="relative pt-40 pb-32 overflow-hidden selection:bg-emerald-200">
      <div className="max-w-7xl mx-auto px-6">

        {/* Hero Section */}
        <div className="text-center mb-32 relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-3 bg-emerald-100/50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/50 px-6 py-2.5 rounded-full text-emerald-700 dark:text-emerald-400 text-[10px] font-black tracking-[0.2em] mb-12 uppercase"
          >
            <Sparkles className="w-4 h-4" />
            <span>Next-Gen Word Retrieval Architecture</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-7xl md:text-[140px] leading-[0.85] font-black tracking-tighter mb-12 text-emerald-950 dark:text-white"
          >
            5-Letter <br />
            <span className="text-gradient">Word.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-xl md:text-2xl text-emerald-800/60 dark:text-emerald-100/40 max-w-2xl mx-auto mb-20 leading-relaxed font-bold tracking-tight"
          >
            A high-performance linguistic engine built for professional word discovery.
            Zero friction search. Infinite vocabulary.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <Link href="/list/5" className="group bg-emerald-600 text-white px-10 py-6 rounded-[2.5rem] font-black text-xl hover:bg-emerald-700 transition-all shadow-2xl shadow-emerald-500/30 flex items-center gap-4">
              Access Full Index
              <ArrowRight className="w-6 h-6 group-hover:translate-x-3 transition-transform" />
            </Link>
          </motion.div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-40">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.len}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -10 }}
              className={`group p-8 rounded-[2.5rem] border ${cat.featured ? 'bg-white dark:bg-emerald-950/20 border-emerald-500/30' : 'bg-emerald-50/50 dark:bg-slate-900 border-emerald-100 dark:border-emerald-900/40'} transition-all`}
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${cat.color} flex items-center justify-center text-white text-xl font-black mb-8 shadow-xl`}>
                {cat.len}
              </div>
              <h3 className="text-xl font-black mb-2 text-emerald-900 dark:text-white uppercase tracking-tighter">{cat.label}</h3>
              <p className="text-xs font-bold text-emerald-600 uppercase tracking-widest opacity-60 mb-8">{cat.desc}</p>

              <Link href={`/list/${cat.len}`} className="flex items-center justify-between group/link">
                <span className="text-[10px] font-black text-emerald-900 dark:text-white opacity-40 uppercase tracking-widest">{cat.words} Words</span>
                <ArrowRight className="w-5 h-5 text-emerald-600 group-hover/link:translate-x-2 transition-transform" />
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Feature Highlights */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-24">
          {[
            { icon: Zap, title: "0ms Latency", desc: "Instant pattern matching across 10,000+ entries." },
            { icon: Globe, title: "Global Sync", desc: "Verified Oxford and competitive Scrabble datasets." },
            { icon: Layers, title: "Advanced Logic", desc: "Exclusion filters and wildcard regex support." }
          ].map((f, i) => (
            <div key={i} className="premium-card p-12">
              <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 rounded-3xl flex items-center justify-center text-emerald-600 mb-8">
                <f.icon className="w-8 h-8" />
              </div>
              <h4 className="text-2xl font-black text-emerald-950 dark:text-white mb-4 tracking-tighter">{f.title}</h4>
              <p className="text-emerald-800/60 dark:text-emerald-100/40 font-bold tracking-tight leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
