"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, RotateCcw, Filter, BookOpen, Layers, Sparkles, X, LayoutGrid, List as ListIcon, SlidersHorizontal, ArrowDownWideNarrow } from "lucide-react";
import { cn } from "@/lib/utils";

interface ListClientProps {
    length: number;
}

export default function ListClient({ length }: ListClientProps) {
    const [words, setWords] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

    // Filter States
    const [startsWith, setStartsWith] = useState("");
    const [endsWith, setEndsWith] = useState("");
    const [pattern, setPattern] = useState("");
    const [exclude, setExclude] = useState("");
    const [showFilters, setShowFilters] = useState(false);

    useEffect(() => {
        async function loadData() {
            try {
                setLoading(true);
                const res = await fetch(`/data/${length}-letter-words.json`);
                if (!res.ok) throw new Error("Failed to load");
                const data = await res.json();
                setWords(data);
            } catch (err) {
                console.error(err);
                setError(true);
            } finally {
                setTimeout(() => setLoading(false), 500);
            }
        }
        loadData();
    }, [length]);

    const filteredWords = useMemo(() => {
        return words.filter((word) => {
            const w = word.toLowerCase();
            if (startsWith && !w.startsWith(startsWith.toLowerCase())) return false;
            if (endsWith && !w.endsWith(endsWith.toLowerCase())) return false;
            if (pattern) {
                const p = pattern.toLowerCase();
                if (p.length === length || p.includes('_')) {
                    const regexStr = `^${p.replace(/_/g, '.')}$`;
                    try {
                        const regex = new RegExp(regexStr);
                        if (!regex.test(w)) return false;
                    } catch (e) { return false; }
                } else {
                    if (!w.includes(p)) return false;
                }
            }
            if (exclude) {
                const letters = exclude.toLowerCase().split("");
                if (letters.some(l => w.includes(l))) return false;
            }
            return true;
        });
    }, [words, startsWith, endsWith, pattern, exclude, length]);

    const handleReset = () => {
        setStartsWith(""); setEndsWith(""); setPattern(""); setExclude("");
    };

    return (
        <div className="relative">
            {/* Unique Dynamic Filter Header */}
            <div className="mb-16 space-y-12">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-12">
                    <div className="relative">
                        <div className="flex items-center gap-3 text-indigo-600 dark:text-indigo-400 font-black text-xs uppercase tracking-[0.4em] mb-4">
                            <ArrowDownWideNarrow className="w-4 h-4" />
                            <span>LEXICON DISCOVERY</span>
                        </div>
                        <h1 className="text-7xl md:text-8xl font-black tracking-tighter text-gray-900 dark:text-white leading-[0.8] mb-6">
                            {length} Letter <br /><span className="text-gradient">Database.</span>
                        </h1>
                        <p className="text-gray-500 font-black uppercase text-[10px] tracking-widest pl-1">
                            Current Integrity: <span className="text-emerald-500">Verified</span> • {filteredWords.length.toLocaleString()} RESULTS
                        </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-4">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setShowFilters(!showFilters)}
                            className={cn(
                                "flex items-center gap-3 px-8 py-5 rounded-[2rem] font-black text-sm uppercase tracking-widest transition-all border-2 shadow-2xl shadow-indigo-500/10",
                                showFilters ? "bg-indigo-600 text-white border-indigo-600" : "bg-white dark:bg-zinc-900 text-gray-900 dark:text-white border-gray-100 dark:border-zinc-800"
                            )}
                        >
                            <SlidersHorizontal className="w-5 h-5" />
                            Configure Engine
                        </motion.button>

                        <div className="flex bg-white dark:bg-zinc-900 p-2 rounded-[1.5rem] border border-gray-100 dark:border-zinc-800 shadow-xl">
                            <button onClick={() => setViewMode('grid')} className={cn("p-4 rounded-xl transition-all", viewMode === 'grid' ? "bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600" : "text-gray-400")}>
                                <LayoutGrid className="w-5 h-5" />
                            </button>
                            <button onClick={() => setViewMode('list')} className={cn("p-4 rounded-xl transition-all", viewMode === 'list' ? "bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600" : "text-gray-400")}>
                                <ListIcon className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Stylish Unique Filter Panel */}
                <AnimatePresence>
                    {showFilters && (
                        <motion.div
                            initial={{ opacity: 0, y: -40, scale: 0.98 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -40, scale: 0.98 }}
                            className="bg-white dark:bg-[#121215] border-2 border-indigo-500/10 dark:border-indigo-500/5 p-12 rounded-[4rem] shadow-[-20px_20px_80px_rgba(0,0,0,0.05)] dark:shadow-[-20px_20px_80px_rgba(0,0,0,0.4)] relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/5 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2" />

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative z-10">
                                {[
                                    { label: "PREFIX", val: startsWith, set: setStartsWith, placeholder: "e.g. TH" },
                                    { label: "SUFFIX", val: endsWith, set: setEndsWith, placeholder: "e.g. ER" },
                                    { label: "STRUCTURE", val: pattern, set: setPattern, placeholder: "_A_E_" },
                                    { label: "EXCLUSIONS", val: exclude, set: setExclude, placeholder: "QXZ" }
                                ].map((field, i) => (
                                    <div key={i} className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <label className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 pl-1">{field.label}</label>
                                            {field.val && <button onClick={() => field.set("")} className="text-[10px] font-black text-indigo-500 uppercase">Clear</button>}
                                        </div>
                                        <input
                                            type="text"
                                            value={field.val}
                                            onChange={(e) => field.set(e.target.value.toUpperCase())}
                                            placeholder={field.placeholder}
                                            className="w-full bg-gray-50 dark:bg-black border-2 border-transparent focus:border-indigo-500/50 rounded-2xl px-6 py-5 text-sm font-black outline-none transition-all focus:ring-4 ring-indigo-500/5 tracking-widest placeholder:text-gray-300 dark:placeholder:text-zinc-800"
                                        />
                                    </div>
                                ))}
                            </div>

                            <div className="mt-12 pt-8 border-t border-gray-100 dark:border-zinc-800 flex items-center justify-between">
                                <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest">REAL-TIME INDEX UPDATING</div>
                                <button onClick={handleReset} className="flex items-center gap-2 text-xs font-black text-rose-500 uppercase tracking-widest hover:scale-105 transition-transform">
                                    <RotateCcw className="w-4 h-4" /> Reset Filters
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Word Grid - Custom Styles */}
            {loading ? (
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                    {[...Array(24)].map((_, i) => (
                        <div key={i} className="h-24 bg-white dark:bg-zinc-900/50 rounded-[2rem] animate-pulse border border-gray-100 dark:border-zinc-800/50" />
                    ))}
                </div>
            ) : filteredWords.length > 0 ? (
                <div className={cn("gap-8", viewMode === 'grid' ? "grid grid-cols-2 lg:grid-cols-6" : "flex flex-col")}>
                    {filteredWords.slice(0, 400).map((word, idx) => (
                        <motion.div
                            key={word}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            whileHover={{ y: -8, scale: 1.05 }}
                            className="premium-card group p-8 flex flex-col items-center justify-center text-center relative overflow-hidden"
                        >
                            <div className="absolute top-2 left-2 text-[8px] font-black text-gray-300 dark:text-zinc-700 font-mono">#{idx + 1}</div>
                            <span className="text-3xl font-black tracking-[0.2em] uppercase text-gray-900 dark:text-white transition-colors">
                                {word}
                            </span>
                            <div className="mt-4 flex gap-1">
                                {[...Array(length)].map((_, i) => (
                                    <div key={i} className="w-1 h-1 rounded-full bg-gray-200 dark:bg-zinc-800 group-hover:bg-indigo-600 transition-colors" />
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-40 premium-card bg-gray-50 dark:bg-zinc-900/10 border-dashed border-4 border-gray-200 dark:border-zinc-800">
                    <Search className="w-16 h-16 text-gray-200 mx-auto mb-6" />
                    <h3 className="text-4xl font-black tracking-tighter text-gray-900 dark:text-white">Lexicon Empty.</h3>
                    <p className="text-gray-500 font-medium">No results match your current configuration.</p>
                </div>
            )}
        </div>
    );
}
