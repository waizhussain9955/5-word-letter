"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, RotateCcw, Filter, BookOpen, Layers, Sparkles, X, LayoutGrid, List as ListIcon } from "lucide-react";
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
    const [showFilters, setShowFilters] = useState(true);

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
                // Add a small delay for "wow" factor/smoothness
                setTimeout(() => setLoading(false), 600);
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
                // If the user provides a pattern of the exact length, enforce strict match
                // Otherwise, treat as a partial pattern
                if (p.length === length || p.includes('_')) {
                    const regexStr = `^${p.replace(/_/g, '.')}$`;
                    try {
                        const regex = new RegExp(regexStr);
                        if (!regex.test(w)) return false;
                    } catch (e) {
                        return false;
                    }
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
        setStartsWith("");
        setEndsWith("");
        setPattern("");
        setExclude("");
    };

    if (error) return (
        <div className="text-center py-20">
            <div className="bg-rose-50 dark:bg-rose-950/20 p-12 rounded-[3rem] border border-rose-100 dark:border-rose-900/50 inline-block shadow-2xl">
                <div className="w-16 h-16 bg-rose-100 dark:bg-rose-900/50 rounded-2xl flex items-center justify-center text-rose-600 mx-auto mb-6">
                    <X className="w-8 h-8" />
                </div>
                <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-2">Error Syncing Database</h2>
                <p className="text-gray-500 dark:text-gray-400 font-medium">Please verify the word list exists for this category.</p>
                <button
                    onClick={() => window.location.reload()}
                    className="mt-8 px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-xl font-bold hover:scale-105 transition-all"
                >
                    Retry Connection
                </button>
            </div>
        </div>
    );

    return (
        <div className="relative">
            {/* Header Section */}
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 mb-16">
                <div className="relative">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-black text-xs uppercase tracking-[0.2em] mb-4"
                    >
                        <Layers className="w-4 h-4" />
                        <span>Dictionary Engine V1.0</span>
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-6xl md:text-7xl font-black tracking-tighter text-gray-900 dark:text-white mb-4"
                    >
                        {length} Letter <span className="text-gradient">Words.</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-gray-500 font-medium tracking-tight"
                    >
                        Index synchronized. Currently showing <span className="text-indigo-600 font-black">{filteredWords.length.toLocaleString()}</span> entries.
                    </motion.p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                    <div className="flex bg-gray-100 dark:bg-gray-900 p-1 rounded-xl border border-gray-200 dark:border-gray-800">
                        <button
                            onClick={() => setViewMode('grid')}
                            className={cn("p-2 rounded-lg transition-all", viewMode === 'grid' ? "bg-white dark:bg-gray-800 shadow-sm text-indigo-600" : "text-gray-400 hover:text-gray-600")}
                        >
                            <LayoutGrid className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => setViewMode('list')}
                            className={cn("p-2 rounded-lg transition-all", viewMode === 'list' ? "bg-white dark:bg-gray-800 shadow-sm text-indigo-600" : "text-gray-400 hover:text-gray-600")}
                        >
                            <ListIcon className="w-4 h-4" />
                        </button>
                    </div>

                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className={cn(
                            "flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold shadow-sm transition-all border",
                            showFilters
                                ? "bg-indigo-600 text-white border-indigo-600 shadow-indigo-200 dark:shadow-none"
                                : "bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-800 hover:border-indigo-500"
                        )}
                    >
                        <Filter className="w-4 h-4" />
                        <span>{showFilters ? 'Hide Control Panel' : 'Control Panel'}</span>
                    </button>
                    <button
                        onClick={handleReset}
                        className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 px-5 py-3 rounded-xl text-sm font-bold text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all border border-transparent hover:border-gray-300 dark:hover:border-gray-600"
                    >
                        <RotateCcw className="w-4 h-4" />
                        <span>Reset Engine</span>
                    </button>
                </div>
            </div>

            {/* Filter Section */}
            <AnimatePresence>
                {showFilters && (
                    <motion.div
                        initial={{ height: 0, opacity: 0, y: -20 }}
                        animate={{ height: 'auto', opacity: 1, y: 0 }}
                        exit={{ height: 0, opacity: 0, y: -20 }}
                        className="overflow-hidden mb-16"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 p-10 bg-white dark:bg-[#12141a] rounded-[3rem] border border-gray-100 dark:border-gray-800 shadow-2xl relative">
                            <div className="absolute top-0 right-10 w-32 h-32 bg-indigo-500/5 blur-3xl rounded-full" />

                            <div className="flex flex-col gap-3">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-600 pl-1">Starting Sequence</label>
                                <div className="relative group">
                                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-indigo-600 transition-colors" />
                                    <input
                                        type="text"
                                        value={startsWith}
                                        onChange={(e) => setStartsWith(e.target.value)}
                                        placeholder="e.g. BR"
                                        className="w-full bg-gray-50 dark:bg-black border border-gray-200/60 dark:border-gray-800 rounded-2xl pl-12 pr-4 py-4 text-sm font-bold focus:ring-4 ring-indigo-500/5 focus:border-indigo-500 outline-none transition-all"
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col gap-3">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-600 pl-1">Ending Sequence</label>
                                <div className="relative group">
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 flex items-center justify-center font-black text-gray-400 group-focus-within:text-indigo-600 transition-colors">
                                        $
                                    </div>
                                    <input
                                        type="text"
                                        value={endsWith}
                                        onChange={(e) => setEndsWith(e.target.value)}
                                        placeholder="e.g. ION"
                                        className="w-full bg-gray-50 dark:bg-black border border-gray-200/60 dark:border-gray-800 rounded-2xl pl-12 pr-4 py-4 text-sm font-bold focus:ring-4 ring-indigo-500/5 focus:border-indigo-500 outline-none transition-all"
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col gap-3">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-600 pl-1">Pattern Matching (_ wild)</label>
                                <div className="relative group">
                                    <Sparkles className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-indigo-600 transition-colors" />
                                    <input
                                        type="text"
                                        value={pattern}
                                        onChange={(e) => setPattern(e.target.value)}
                                        placeholder="e.g. _A_E_I"
                                        className="w-full bg-gray-50 dark:bg-black border border-gray-200/60 dark:border-gray-800 rounded-2xl pl-12 pr-4 py-4 text-sm font-bold focus:ring-4 ring-indigo-500/5 focus:border-indigo-500 outline-none transition-all font-mono tracking-widest"
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col gap-3">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-600 pl-1">Excluded Lexicon</label>
                                <div className="relative group">
                                    <X className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-indigo-600 transition-colors" />
                                    <input
                                        type="text"
                                        value={exclude}
                                        onChange={(e) => setExclude(e.target.value)}
                                        placeholder="e.g. XYZ"
                                        className="w-full bg-gray-50 dark:bg-black border border-gray-200/60 dark:border-gray-800 rounded-2xl pl-12 pr-4 py-4 text-sm font-bold focus:ring-4 ring-indigo-500/5 focus:border-indigo-500 outline-none transition-all"
                                    />
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Content Section */}
            {loading ? (
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                    {[...Array(24)].map((_, i) => (
                        <div key={i} className="h-20 bg-gray-100 dark:bg-gray-800 rounded-2xl animate-pulse border border-gray-200 dark:border-gray-800/50" />
                    ))}
                </div>
            ) : filteredWords.length > 0 ? (
                <motion.div
                    layout
                    className={cn(
                        "gap-6",
                        viewMode === 'grid'
                            ? "grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6"
                            : "flex flex-col"
                    )}
                >
                    <AnimatePresence mode="popLayout">
                        {filteredWords.slice(0, 500).map((word, idx) => (
                            <motion.div
                                key={word}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.2, delay: Math.min(idx * 0.01, 0.5) }}
                                whileHover={{ y: -4, scale: 1.02 }}
                                className={cn(
                                    "group relative bg-white dark:bg-[#0b0c10] border p-6 rounded-2xl shadow-sm hover:shadow-2xl hover:border-indigo-600 dark:hover:border-indigo-500 transition-all cursor-default flex items-center justify-between",
                                    viewMode === 'grid' ? "border-gray-100 dark:border-gray-900" : "border-gray-100 dark:border-gray-900 w-full"
                                )}
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-8 h-8 rounded-lg bg-gray-50 dark:bg-gray-900 flex items-center justify-center text-[10px] font-black text-gray-400 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                                        {idx + 1}
                                    </div>
                                    <span className="text-xl font-black tracking-widest uppercase text-gray-900 dark:text-white">
                                        {word}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="px-2 py-1 bg-gray-50 dark:bg-gray-900 rounded-md text-[8px] font-black uppercase text-gray-400 tracking-tighter">Verified</div>
                                    <BookOpen className="w-4 h-4 text-gray-300 group-hover:text-indigo-400 transition-colors" />
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            ) : (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-40 bg-gray-50/50 dark:bg-gray-900/10 rounded-[4rem] border-4 border-dashed border-gray-100 dark:border-gray-800/50"
                >
                    <div className="w-24 h-24 bg-white dark:bg-gray-900 rounded-[2rem] shadow-xl flex items-center justify-center text-gray-300 mx-auto mb-8 border border-gray-100 dark:border-gray-800">
                        <Search className="w-10 h-10" />
                    </div>
                    <h3 className="text-3xl font-black text-gray-900 dark:text-white mb-2 tracking-tight">Zero Results Found.</h3>
                    <p className="text-gray-500 font-medium max-w-sm mx-auto">Our linguistic engine couldn't find matches for your current parameters. Try loosening the filter constraints.</p>
                </motion.div>
            )}

            {filteredWords.length > 500 && !loading && (
                <div className="mt-20 text-center">
                    <p className="text-gray-400 font-bold text-xs uppercase tracking-widest mb-4">Displaying first 500 results for performance.</p>
                    <div className="h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-800 to-transparent w-full" />
                </div>
            )}
        </div>
    );
}
