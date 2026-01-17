"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, RotateCcw, LayoutGrid, List as ListIcon, SlidersHorizontal, ChevronRight, X, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ListClientProps {
    length: number;
}

export default function ListClient({ length }: ListClientProps) {
    const [words, setWords] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
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
                console.error(err);
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
        <div className="pt-32 pb-40 px-6 max-w-7xl mx-auto">
            <div className="bg-mesh" />

            {/* ZENITH HEADER */}
            <header className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 mb-20">
                <div className="max-w-2xl">
                    <div className="flex items-center gap-3 mb-6">
                        <span className="w-10 h-0.5 bg-indigo-600"></span>
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-600">INDEXED CORPUS L{length}</span>
                    </div>
                    <h1 className="text-6xl md:text-8xl font-bold tracking-tight mb-6">
                        Verified <span className="text-gradient">Lexis.</span>
                    </h1>
                    <p className="text-zinc-500 font-medium text-lg leading-relaxed">
                        Currently display {filteredWords.length.toLocaleString()} of {words.length.toLocaleString()} architectural entries in the {length}-letter word database.
                    </p>
                </div>

                <div className="flex items-center flex-wrap gap-4">
                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className={cn(
                            "flex items-center gap-3 px-8 py-4.5 rounded-2xl font-bold transition-all border shadow-lg",
                            showFilters ? "bg-indigo-600 text-white border-indigo-600 shadow-indigo-600/20" : "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800"
                        )}
                    >
                        <SlidersHorizontal className="w-5 h-5" />
                        Control Filters
                    </button>
                    <div className="flex bg-zinc-100 dark:bg-zinc-900 p-1.5 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
                        <button onClick={() => setViewMode('grid')} className={cn("p-3.5 rounded-xl transition-all", viewMode === 'grid' ? "bg-white dark:bg-zinc-800 shadow-sm text-indigo-600" : "text-zinc-400 hover:text-zinc-600")}>
                            <LayoutGrid className="w-5 h-5" />
                        </button>
                        <button onClick={() => setViewMode('list')} className={cn("p-3.5 rounded-xl transition-all", viewMode === 'list' ? "bg-white dark:bg-zinc-800 shadow-sm text-indigo-600" : "text-zinc-400 hover:text-zinc-600")}>
                            <ListIcon className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </header>

            {/* ZENITH FILTERS */}
            <AnimatePresence mode="wait">
                {showFilters && (
                    <motion.div
                        initial={{ height: 0, opacity: 0, y: -20 }}
                        animate={{ height: 'auto', opacity: 1, y: 0 }}
                        exit={{ height: 0, opacity: 0, y: -20 }}
                        className="overflow-hidden mb-20"
                    >
                        <div className="stylish-card p-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
                            {[
                                { label: "Prefix Match", val: startsWith, set: setStartsWith, placeholder: "e.g. ST" },
                                { label: "Suffix Match", val: endsWith, set: setEndsWith, placeholder: "e.g. ED" },
                                { label: "Pattern Lookup", val: pattern, set: setPattern, placeholder: "e.g. F__S_" },
                                { label: "Exclusions", val: exclude, set: setExclude, placeholder: "e.g. X, Q, J" }
                            ].map((f, i) => (
                                <div key={i} className="flex flex-col gap-4">
                                    <label className="text-[10px] font-black text-zinc-400 dark:text-zinc-500 uppercase tracking-[0.2em] px-1">{f.label}</label>
                                    <input
                                        type="text"
                                        value={f.val}
                                        onChange={(e) => f.set(e.target.value.toUpperCase())}
                                        placeholder={f.placeholder}
                                        className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-800 rounded-2xl px-6 py-4.5 font-semibold text-lg focus:ring-4 ring-indigo-500/5 outline-none transition-all uppercase placeholder:opacity-30"
                                    />
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* DATA VIEW */}
            {loading ? (
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
                    {[...Array(18)].map((_, i) => (
                        <div key={i} className="aspect-square bg-zinc-50 dark:bg-zinc-900 rounded-[2rem] animate-pulse border border-zinc-100 dark:border-zinc-800/50" />
                    ))}
                </div>
            ) : filteredWords.length > 0 ? (
                <div className={cn("gap-8", viewMode === 'grid' ? "grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7" : "flex flex-col")}>
                    <AnimatePresence mode="popLayout">
                        {filteredWords.slice(0, 400).map((word, idx) => (
                            <motion.div
                                key={word}
                                layout
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className={cn(
                                    "stylish-card group relative overflow-hidden p-8 flex flex-col items-center justify-center text-center",
                                    viewMode === 'list' && "flex-row items-center justify-between py-6 px-10 text-left"
                                )}
                            >
                                <div className="absolute top-4 left-4 text-[9px] font-black text-zinc-300 dark:text-zinc-700 font-mono tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity">REC_{idx + 1}</div>
                                <h3 className={cn("font-bold tracking-tight text-zinc-900 dark:text-white transition-all duration-500 group-hover:scale-110 uppercase", viewMode === 'grid' ? "text-3xl" : "text-2xl")}>
                                    {word}
                                </h3>
                                <div className={cn("mt-6 flex gap-1 opacity-20 group-hover:opacity-100 transition-opacity", viewMode === 'list' && "mt-0 order-last")}>
                                    {[...Array(length)].map((_, i) => (
                                        <div key={i} className="w-1 h-1 rounded-full bg-indigo-600" />
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            ) : (
                <div className="py-48 text-center stylish-card border-dashed">
                    <div className="w-20 h-20 bg-zinc-50 dark:bg-zinc-800/50 rounded-full flex items-center justify-center mx-auto mb-8 border border-zinc-100 dark:border-zinc-700">
                        <Search className="w-10 h-10 text-zinc-200" />
                    </div>
                    <h3 className="text-3xl font-bold mb-4 tracking-tight">Access Denied: No Matches.</h3>
                    <p className="text-zinc-500 font-medium max-w-sm mx-auto uppercase text-xs tracking-[0.2em] leading-relaxed">System failed to retrieve words based on active filter set. Reset parameters to restore index.</p>
                </div>
            )}

            {filteredWords.length > 400 && (
                <div className="mt-40 text-center py-24 border-t border-zinc-100 dark:border-zinc-900">
                    <p className="text-[10px] font-black uppercase tracking-[0.5em] text-zinc-300 dark:text-zinc-700">Display Limit Reached: Manual Expansion Required</p>
                </div>
            )}
        </div>
    );
}
