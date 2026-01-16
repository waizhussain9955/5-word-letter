"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, RotateCcw, LayoutGrid, List as ListIcon, SlidersHorizontal, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ListClientProps {
    length: number;
}

export default function ListClient({ length }: ListClientProps) {
    const [words, setWords] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [showFilters, setShowFilters] = useState(false);

    // Filters
    const [startsWith, setStartsWith] = useState("");
    const [endsWith, setEndsWith] = useState("");
    const [pattern, setPattern] = useState("");
    const [exclude, setExclude] = useState("");

    useEffect(() => {
        async function loadData() {
            try {
                setLoading(true);
                const res = await fetch(`/data/${length}-letter-words.json`);
                if (!res.ok) throw new Error("Failed to load");
                const data = await res.json();
                setWords(data);
            } catch (err) {
                setError(true);
            } finally {
                setTimeout(() => setLoading(false), 800);
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
                const regexStr = `^${p.replace(/_/g, '.')}$`;
                try {
                    const regex = new RegExp(regexStr);
                    if (!regex.test(w)) return false;
                } catch (e) { return false; }
            }
            if (exclude) {
                const letters = exclude.toLowerCase().split("");
                if (letters.some(l => w.includes(l))) return false;
            }
            return true;
        });
    }, [words, startsWith, endsWith, pattern, exclude]);

    return (
        <div className="pt-24 lg:pt-32 pb-40 px-6 lg:px-24">
            {/* ARCHIVE HEADER - Aligned */}
            <header className="max-w-[1400px] mx-auto mb-24 flex flex-col lg:flex-row lg:items-end justify-between gap-12">
                <div>
                    <div className="flex items-center gap-4 mb-8">
                        <span className="font-heading font-black text-amber-500 uppercase tracking-[0.4em] text-xs">Aesthet_Specs</span>
                        <div className="h-px w-24 bg-amber-500/10" />
                    </div>
                    <h1 className="text-7xl md:text-[140px] font-heading font-black tracking-tighter leading-[0.8] mb-8">
                        ARCHIVE_{length}
                    </h1>
                    <div className="font-heading font-black text-xs text-gray-400 uppercase tracking-[0.5em] pl-2">
                        Synchronized Index: {words.length.toLocaleString()} Entries
                    </div>
                </div>

                <div className="flex flex-wrap gap-6">
                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className={cn(
                            "group px-10 py-6 rounded-2xl font-heading font-black text-[10px] uppercase tracking-widest flex items-center gap-4 transition-all shadow-xl",
                            showFilters ? "bg-amber-500 text-black shadow-amber-500/20" : "bg-black dark:bg-zinc-900 text-white shadow-black/10"
                        )}
                    >
                        <SlidersHorizontal className="w-4 h-4" />
                        {showFilters ? 'HIDE_FILTERS' : 'OPEN_SYSTEM'}
                    </button>
                    <div className="flex bg-[var(--card)] p-2 rounded-2xl border border-[var(--border)] shadow-sm">
                        <button onClick={() => setViewMode('grid')} className={cn("p-4 rounded-xl transition-all", viewMode === 'grid' ? "bg-amber-500 text-black shadow-lg" : "text-gray-400")}>
                            <LayoutGrid className="w-5 h-5" />
                        </button>
                        <button onClick={() => setViewMode('list')} className={cn("p-4 rounded-xl transition-all", viewMode === 'list' ? "bg-amber-500 text-black shadow-lg" : "text-gray-400")}>
                            <ListIcon className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </header>

            {/* FILTER PANEL - Aligned Spacing */}
            <div className="max-w-[1400px] mx-auto">
                <AnimatePresence>
                    {showFilters && (
                        <motion.div
                            initial={{ height: 0, opacity: 0, y: -20 }}
                            animate={{ height: 'auto', opacity: 1, y: 0 }}
                            exit={{ height: 0, opacity: 0, y: -20 }}
                            className="overflow-hidden mb-24"
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 p-12 bg-zinc-50 dark:bg-zinc-900/40 rounded-[2.5rem] border border-[var(--border)] relative">
                                {[
                                    { label: "PREFIX", val: startsWith, set: setStartsWith, placeholder: "TH" },
                                    { label: "SUFFIX", val: endsWith, set: setEndsWith, placeholder: "ER" },
                                    { label: "PATTERN", val: pattern, set: setPattern, placeholder: "_A_E_" },
                                    { label: "EXCLUDE", val: exclude, set: setExclude, placeholder: "QXZ" }
                                ].map((f, i) => (
                                    <div key={i} className="flex flex-col gap-4">
                                        <label className="font-heading font-black text-[10px] uppercase tracking-[0.3em] text-amber-500 pl-1">{f.label}</label>
                                        <input
                                            type="text"
                                            value={f.val}
                                            onChange={(e) => f.set(e.target.value.toUpperCase())}
                                            placeholder={f.placeholder}
                                            className="w-full bg-white dark:bg-black border border-zinc-200 dark:border-zinc-800 rounded-2xl px-8 py-5 text-2xl font-heading font-black focus:border-amber-500 outline-none transition-all uppercase tracking-widest shadow-sm"
                                        />
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* DATA GRID - Fixed Missing Alignment and Spacing */}
                {loading ? (
                    <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-8">
                        {[...Array(20)].map((_, i) => (
                            <div key={i} className="aspect-square bg-gray-50 dark:bg-zinc-900 rounded-3xl animate-pulse" />
                        ))}
                    </div>
                ) : filteredWords.length > 0 ? (
                    <div className={cn(
                        "transition-all duration-500",
                        viewMode === 'grid'
                            ? "grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-8"
                            : "flex flex-col gap-6"
                    )}>
                        <AnimatePresence mode="popLayout">
                            {filteredWords.slice(0, 500).map((word, idx) => (
                                <motion.div
                                    key={word}
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className={cn(
                                        "luxury-card flex flex-col relative group",
                                        viewMode === 'grid' ? "aspect-square p-10 items-center justify-center p-12" : "flex-row items-center justify-between px-12 py-8"
                                    )}
                                >
                                    <span className="text-[10px] font-black text-gray-300 dark:text-zinc-800 absolute top-6 left-8 font-mono group-hover:text-amber-500/40 transition-colors uppercase tracking-widest">idx_{idx + 1}</span>
                                    <h3 className={cn(
                                        "font-heading font-black uppercase tracking-tighter group-hover:scale-110 group-hover:text-amber-500 transition-all duration-500",
                                        viewMode === 'grid' ? "text-5xl lg:text-6xl" : "text-3xl"
                                    )}>
                                        {word}
                                    </h3>
                                    <div className={cn(
                                        "flex gap-1.5 transition-all opacity-20 group-hover:opacity-100",
                                        viewMode === 'grid' ? "mt-8" : "ml-auto"
                                    )}>
                                        {[...Array(length)].map((_, i) => (
                                            <div key={i} className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                                        ))}
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                ) : (
                    <div className="py-60 text-center bg-zinc-50 dark:bg-zinc-900/30 rounded-[4rem] border-4 border-dashed border-zinc-100 dark:border-zinc-900">
                        <h2 className="text-6xl font-heading font-black text-zinc-200 dark:text-zinc-800 uppercase mb-4 tracking-tighter animate-pulse">ZERO_RESULTS</h2>
                        <p className="text-gray-400 font-black text-xs uppercase tracking-[0.4em]">Initialize system reset or diversify criteria.</p>
                    </div>
                )}

                {filteredWords.length > 500 && (
                    <div className="mt-40 text-center">
                        <div className="h-px w-full bg-gradient-to-r from-transparent via-zinc-200 dark:via-zinc-800 to-transparent mb-12" />
                        <p className="font-heading font-black text-xs uppercase tracking-[0.5em] text-gray-400">DISPLAY_LIMIT_REACHED_V1.0</p>
                    </div>
                )}
            </div>
        </div>
    );
}
