"use client";

import { motion } from "framer-motion";
import { ArrowRight, Search, Zap, Globe, Shield, Star } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const categories = [
    { len: 3, label: "Short & Punchy", desc: "For acronyms and quick wins", color: "from-blue-500 to-cyan-400" },
    { len: 4, label: "Everyday Core", desc: "Common verbs and nouns", color: "from-indigo-500 to-blue-400" },
    { len: 5, label: "Word Game Pro", desc: "The ultimate Wordle resource", color: "from-purple-500 to-indigo-400", featured: true },
    { len: 6, label: "Advanced Vocab", desc: "Complex structures for writers", color: "from-fuchsia-500 to-purple-400" },
    { len: 7, label: "Scholar Tier", desc: "Precise seven-letter descriptors", color: "from-pink-500 to-rose-400" }
  ];

  return (
    <div className="pt-24 pb-16 overflow-hidden">
      {/* Background Blobs */}
      <div className="absolute top-0 right-0 -z-10 w-[500px] h-[500px] bg-purple-200/50 dark:bg-purple-900/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 left-0 -z-10 w-[500px] h-[500px] bg-indigo-200/50 dark:bg-indigo-900/10 rounded-full blur-[120px]" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Hero */}
        <div className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-indigo-50 dark:bg-indigo-900/30 px-4 py-2 rounded-full text-indigo-600 dark:text-indigo-400 text-sm font-semibold mb-8 hover:scale-105 transition-transform cursor-default"
          >
            <Star className="w-4 h-4 fill-current" />
            <span>Worlds Most Robust Word Finder</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-6xl md:text-8xl font-black tracking-tight mb-8"
          >
            Master Every <br />
            <span className="text-gradient">Single Word.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            A premium dictionary experience with instant filtering, wildcard pattern matching, and comprehensive curated lists. Clean content for clean minds.
          </motion.p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-32">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.len}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -8 }}
              className={`relative p-8 rounded-3xl border ${cat.featured ? 'border-indigo-200 dark:border-indigo-800 bg-white/50 dark:bg-black/40 xl:col-span-1 shadow-2xl xl:scale-105 z-10' : 'border-gray-100 dark:border-gray-900 bg-white dark:bg-black'}`}
            >
              {cat.featured && (
                <div className="absolute top-4 right-4 bg-indigo-600 text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
                  Popular
                </div>
              )}
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${cat.color} flex items-center justify-center text-white text-3xl font-black mb-6 shadow-lg`}>
                {cat.len}
              </div>
              <h3 className="text-2xl font-bold mb-2 tracking-tight">{cat.label}</h3>
              <p className="text-gray-400 text-sm mb-8 leading-relaxed">{cat.desc}</p>

              <Link
                href={`/list/${cat.len}`}
                className="group inline-flex items-center gap-2 text-indigo-600 font-bold hover:gap-4 transition-all"
              >
                <span>Explore List</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Feature Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 bg-gray-50 dark:bg-gray-900/20 p-12 rounded-[3rem] border border-gray-100 dark:border-gray-900">
          <div className="flex flex-col gap-4 text-center items-center">
            <div className="bg-indigo-100 dark:bg-indigo-900/50 p-4 rounded-2xl text-indigo-600">
              <Search className="w-8 h-8" />
            </div>
            <h4 className="font-bold text-lg">Smart Filter</h4>
            <p className="text-sm text-gray-500">Pattern match using wildcards to find exact fits.</p>
          </div>
          <div className="flex flex-col gap-4 text-center items-center">
            <div className="bg-purple-100 dark:bg-purple-900/50 p-4 rounded-2xl text-purple-600">
              <Zap className="w-8 h-8" />
            </div>
            <h4 className="font-bold text-lg">Instant Load</h4>
            <p className="text-sm text-gray-500">Optimized JSON data streams for zero-lag filtering.</p>
          </div>
          <div className="flex flex-col gap-4 text-center items-center">
            <div className="bg-emerald-100 dark:bg-emerald-900/50 p-4 rounded-2xl text-emerald-600">
              <Globe className="w-8 h-8" />
            </div>
            <h4 className="font-bold text-lg">Global Standards</h4>
            <p className="text-sm text-gray-500">Verified lists using international Scrabble dictionaries.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
