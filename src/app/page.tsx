"use client";

import { motion } from "framer-motion";
import { ArrowRight, Search, Zap, Globe, Sparkles, BookOpen, Layers, MousePointer2 } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const categories = [
    { len: 3, label: "Short & Sharp", desc: "Perfect for acronyms and snappy content.", color: "from-blue-600 to-cyan-400", words: "1,500+" },
    { len: 4, label: "Core Lexicon", desc: "The foundation of English communication.", color: "from-indigo-600 to-blue-400", words: "2,800+" },
    { len: 5, label: "Word Game Pro", desc: "The ultimate resource for daily puzzles.", color: "from-purple-600 to-indigo-400", featured: true, words: "3,100+" },
    { len: 6, label: "Advanced Tier", desc: "Complex structures for professional writers.", color: "from-fuchsia-600 to-purple-400", words: "4,200+" },
    { len: 7, label: "Scholar Tier", desc: "High-level vocabulary for academics.", color: "from-rose-600 to-pink-400", words: "5,000+" }
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="relative pt-32 pb-24 overflow-hidden selection:bg-indigo-100 selection:text-indigo-900">
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 -z-10 w-[800px] h-[800px] bg-indigo-500/5 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2 animate-pulse" />
      <div className="absolute bottom-0 left-0 -z-10 w-[600px] h-[600px] bg-purple-500/5 blur-[120px] rounded-full -translate-x-1/2 translate-y-1/2" />

      {/* Grids background */}
      <div className="absolute inset-0 -z-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Floating elements for "Wow" factor */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="hidden lg:block absolute top-40 left-10 p-4 bg-white dark:bg-black rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-900 rotate-[-12deg]"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-500 rounded-lg flex items-center justify-center text-white">
              <Zap className="w-5 h-5 fill-current" />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">Latency</span>
              <span className="text-sm font-black tracking-tight">0.02ms</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="hidden lg:block absolute top-[60%] right-10 p-4 bg-white dark:bg-black rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-900 rotate-[8deg]"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-white">
              <Layers className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">Database</span>
              <span className="text-sm font-black tracking-tight">16K Words</span>
            </div>
          </div>
        </motion.div>

        {/* Hero Section */}
        <div className="text-center mb-32 relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-3 bg-indigo-50/50 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/50 px-5 py-2 rounded-full text-indigo-600 dark:text-indigo-400 text-xs font-bold mb-10 hover:shadow-lg transition-all cursor-default"
          >
            <Sparkles className="w-4 h-4" />
            <span className="tracking-wide">AI-ENHANCED WORD DISCOVERY ENGINE</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-7xl md:text-[120px] leading-[0.9] font-black tracking-tighter mb-10 text-gray-900 dark:text-white"
          >
            Explore <br />
            <span className="text-gradient">Language.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-lg md:text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto mb-16 leading-relaxed font-medium"
          >
            A high-performance dictionary and filtering platform designed for writers,
            developers, and puzzle masters. Zero latency. Infinite possibilities.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="/list/5" className="group bg-indigo-600 text-white px-8 py-4 rounded-2xl font-black text-lg hover:bg-indigo-700 transition-all shadow-2xl shadow-indigo-600/20 active:scale-95 flex items-center gap-3">
              Explore 5-Letter Words
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/about-us" className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white border border-gray-100 dark:border-gray-800 px-8 py-4 rounded-2xl font-black text-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-all active:scale-95">
              Learn More
            </Link>
          </motion.div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-32">
          {[
            { label: "Active Words", val: "16,420" },
            { label: "Daily Users", val: "12.5k" },
            { label: "Search Speed", val: "< 1ms" },
            { label: "Accuracy", val: "99.9%" }
          ].map((stat, i) => (
            <div key={i} className="bg-gray-50/50 dark:bg-gray-900/30 p-8 rounded-[2rem] border border-gray-100 dark:border-gray-900 text-center">
              <div className="text-3xl font-black tracking-tighter mb-1 text-gray-900 dark:text-white">{stat.val}</div>
              <div className="text-[10px] font-black uppercase tracking-widest text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Categories Grid */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black tracking-tight mb-4">World-Class Repositories</h2>
          <p className="text-gray-500 font-medium tracking-tight">Choose your specialized word length to begin discovery.</p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-40"
        >
          {categories.map((cat, i) => (
            <motion.div
              key={cat.len}
              variants={item}
              whileHover={{ y: -12 }}
              className={`group relative p-10 rounded-[2.5rem] border overflow-hidden transition-all duration-500 ${cat.featured ? 'border-indigo-600/20 dark:border-indigo-500/20 bg-white dark:bg-[#12141a] shadow-2xl ring-1 ring-indigo-500/10' : 'border-gray-200/60 dark:border-gray-800/60 bg-white/50 dark:bg-black/40 hover:bg-white dark:hover:bg-black'}`}
            >
              {cat.featured && (
                <div className="absolute top-6 right-6 bg-indigo-600 text-[10px] font-black uppercase tracking-widest text-white px-3 py-1 rounded-lg">
                  Maintained
                </div>
              )}

              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${cat.color} flex items-center justify-center text-white text-3xl font-black mb-8 shadow-2xl shadow-indigo-500/20 group-hover:scale-110 transition-transform duration-500`}>
                {cat.len}
              </div>

              <h3 className="text-2xl font-black mb-3 tracking-tight text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{cat.label}</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm mb-10 leading-relaxed font-medium">{cat.desc}</p>

              <div className="flex items-center justify-between pt-6 border-t border-gray-100 dark:border-gray-800">
                <div className="flex flex-col">
                  <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Database Size</span>
                  <span className="text-sm font-black tracking-tight">{cat.words}</span>
                </div>
                <Link
                  href={`/list/${cat.len}`}
                  className="p-3 bg-gray-50 dark:bg-gray-900 rounded-xl group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300"
                >
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Feature Grid - Re-imagined */}
        <div className="relative p-12 lg:p-24 rounded-[4rem] bg-gray-900 border border-gray-800 shadow-3xl overflow-hidden mb-24">
          <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.1),transparent)]" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-10">
              <div>
                <span className="text-xs font-black uppercase tracking-[0.2em] text-indigo-400 mb-4 block">Platform Core</span>
                <h2 className="text-5xl lg:text-6xl font-black tracking-tighter text-white leading-[0.9]">Built for the <br /><span className="text-indigo-500">Modern Web.</span></h2>
              </div>

              <div className="space-y-6">
                {[
                  { icon: MousePointer2, title: "Precision Filtering", desc: "Use wildcards and exclusion logic to find the exact word you need." },
                  { icon: Globe, title: "Global Dictionary", desc: "Sourced from Oxford and international competitive Scrabble databases." },
                  { icon: Zap, title: "Stream-First Architecture", desc: "Instant loads with pre-rendered data shards for 0ms interface latency." }
                ].map((f, i) => (
                  <div key={i} className="flex gap-6 group">
                    <div className="flex-shrink-0 w-12 h-12 bg-gray-800 rounded-xl flex items-center justify-center text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
                      <f.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-lg font-black text-white mb-1">{f.title}</h4>
                      <p className="text-gray-400 text-sm leading-relaxed font-medium">{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-tr from-indigo-500 to-purple-600 rounded-[3rem] blur-3xl opacity-20" />
              <div className="relative bg-gray-800/50 backdrop-blur-3xl border border-gray-700/50 rounded-[3rem] p-4 lg:p-8 shadow-2xl">
                <div className="aspect-[4/5] bg-gray-900 rounded-[2rem] border border-gray-700 overflow-hidden relative group">
                  {/* Mock interface */}
                  <div className="p-6 border-b border-gray-800 flex items-center justify-between">
                    <div className="flex gap-2">
                      <div className="w-3 h-3 rounded-full bg-rose-500/50" />
                      <div className="w-3 h-3 rounded-full bg-amber-500/50" />
                      <div className="w-3 h-3 rounded-full bg-emerald-500/50" />
                    </div>
                    <div className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Lumina UI V1.0</div>
                  </div>
                  <div className="p-8 space-y-6">
                    <div className="space-y-2">
                      <div className="h-4 w-32 bg-gray-800 rounded-lg animate-pulse" />
                      <div className="h-10 w-full bg-gray-800 rounded-xl" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      {[1, 2, 3, 4, 5, 6].map(i => (
                        <div key={i} className="h-20 bg-gray-800/50 rounded-2xl border border-gray-700 animate-pulse" style={{ animationDelay: `${i * 100}ms` }} />
                      ))}
                    </div>
                  </div>
                  {/* Floating Card */}
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute bottom-10 -right-4 p-5 bg-white rounded-3xl shadow-3xl w-48 border border-gray-100 dark:border-gray-900"
                  >
                    <div className="text-indigo-600 mb-2"><Search className="w-8 h-8" /></div>
                    <div className="text-xs font-black text-gray-900 mb-1">Pattern Matching</div>
                    <div className="text-[10px] text-gray-400 font-bold uppercase tracking-tight">Active Engine</div>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
