"use client";

import { motion } from "framer-motion";
import { Sparkles, Target, Zap, ShieldCheck } from "lucide-react";

export default function AboutPage() {
    return (
        <div className="pt-40 pb-32 px-6 min-h-screen">
            <div className="max-w-5xl mx-auto">
                <header className="mb-20">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-900/20 px-4 py-2 rounded-full text-blue-600 dark:text-blue-400 text-xs font-black mb-8"
                    >
                        <Sparkles className="w-4 h-4 fill-current" />
                        <span>ESTABLISHED 2026</span>
                    </motion.div>
                    <h1 className="text-5xl md:text-8xl font-black mb-10 text-slate-500 dark:text-slate-400 leading-[0.9] tracking-tighter uppercase">
                        Mastering the <br />
                        <span className="text-blue-600">English Atlas.</span>
                    </h1>
                    <p className="text-2xl text-slate-500 font-bold max-w-2xl leading-relaxed">
                        5WordArchive is a premium word discovery platform built for the digital elite.
                        We provide high-precision linguistic datasets for those who demand clarity and speed.
                    </p>
                </header>

                <div className="grid md:grid-cols-2 gap-16 items-start mb-32">
                    <div className="space-y-8">
                        <p className="text-lg text-slate-600 dark:text-slate-400 font-bold leading-loose">
                            Our philosophy is rooted in the intersection of minimalism and data. We believe that exploring
                            the English language shouldn't be a chore—it should be a fast, intuitive, and visually stunning
                            experience.
                        </p>
                        <p className="text-lg text-slate-600 dark:text-slate-400 font-bold leading-loose">
                            Whether you're developing high-stakes word puzzles or researching lexical frequency for
                            computational linguistics, our archive provides the most verified and structured approach
                            on the modern web.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-6">
                        {[
                            { icon: Target, title: "Precision First", desc: "Every word is verified against multiple major dictionaries." },
                            { icon: Zap, title: "Edge Performance", desc: "Search across 10,000+ words in less than 0.1ms." },
                            { icon: ShieldCheck, title: "Data Integrity", desc: "Clean datasets, no filler, and absolutely no noise." }
                        ].map((item, i) => (
                            <div key={i} className="p-8 rounded-[2rem] bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 flex items-center gap-6">
                                <div className="w-12 h-12 bg-white dark:bg-slate-950 rounded-2xl flex items-center justify-center text-blue-600 shadow-sm shrink-0 border border-slate-100 dark:border-slate-800">
                                    <item.icon className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-black text-slate-900 dark:text-white uppercase text-xs tracking-widest mb-1">{item.title}</h3>
                                    <p className="text-sm text-slate-500 font-bold uppercase text-[10px] tracking-tighter">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-blue-600 rounded-[3rem] p-12 md:p-20 text-center text-white relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                    <h2 className="text-4xl md:text-6xl font-black mb-8 relative z-10 uppercase tracking-tighter">The Pursuit of Word Perfection.</h2>
                    <p className="text-xl md:text-2xl text-blue-100 font-bold max-w-2xl mx-auto mb-12 relative z-10 leading-relaxed">
                        Join thousands of creators who use 5WordArchive as their primary linguistic engine.
                    </p>
                    <button className="bg-white text-blue-600 px-12 py-5 rounded-2xl font-black text-sm uppercase tracking-widest hover:scale-105 active:scale-95 transition-all relative z-10 shadow-2xl">
                        Explore the Collection
                    </button>
                </div>
            </div>
        </div>
    );
}
