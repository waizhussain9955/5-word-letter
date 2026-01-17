"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, RotateCcw, LayoutGrid, List as ListIcon, SlidersHorizontal, ChevronRight, X, ArrowUpRight, Zap } from "lucide-react";
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
        <div className="pt-40 pb-40 px-6 max-w-[1400px] mx-auto">

            {/* CYBER HEADER */}
            <header className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 mb-24">
                <div className="relative">
                    <div className="absolute -left-12 -top-12 w-64 h-64 bg-cyan-500/10 blur-[100px] pointer-events-none" />
                    <div className="flex items-center gap-4 mb-8">
                        <Zap className="w-5 h-5 text-cyan-500 fill-current" />
                        <span className="font-heading font-black text-xs uppercase tracking-[0.5em] text-zinc-400">Archive Node: {length}</span>
                    </div>
                    <h1 className="text-7xl md:text-[8rem] font-heading font-black tracking-tighter leading-[0.8] uppercase mb-8">
                        UNLOCKED<span className="text-cyan-500">_</span>{length}
                    </h1>
                    <div className="flex items-center gap-6">
                        <div className="h-0.5 w-12 bg-cyan-500" />
                        <p className="font-bold uppercase text-[10px] tracking-[0.3em] text-zinc-500">
                            Total System Entries: {words.length.toLocaleString()}
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-6 flex-wrap">
                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className={cn(
                            "flex items-center gap-4 px-10 py-5 rounded-full font-black text-xs uppercase tracking-[0.3em] transition-all",
                            showFilters ? "bg-cyan-500 text-black shadow-2xl shadow-cyan-500/40" : "bg-zinc-900 text-white"
                        )}
                    >
                        <SlidersHorizontal className="w-4 h-4" />
                        System_Override
                    </button>
                    <div className="flex bg-zinc-100 dark:bg-zinc-900 p-2 rounded-full border border-zinc-200 dark:border-zinc-800 shadow-xl">
                        <button onClick={() => setViewMode('grid')} className={cn("p-4 rounded-full transition-all", viewMode === 'grid' ? "bg-white dark:bg-zinc-800 text-cyan-500 shadow-md" : "text-zinc-400")}>
                            <LayoutGrid className="w-5 h-5" />
                        </button>
                        <button onClick={() => setViewMode('list')} className={cn("p-4 rounded-full transition-all", viewMode === 'list' ? "bg-white dark:bg-zinc-800 text-cyan-500 shadow-md" : "text-zinc-400")}>
                            <ListIcon className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </header>

            {/* CYBER FILTERS */}
            <AnimatePresence>
                {showFilters && (
                    <motion.div
                        initial={{ height: 0, opacity: 0, y: -20 }}
                        animate={{ height: 'auto', opacity: 1, y: 0 }}
                        exit={{ height: 0, opacity: 0, y: -20 }}
                        className="overflow-hidden mb-24"
                    >
                        <div className="nova-card p-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 bg-zinc-50 dark:bg-zinc-900 group">
                            {[
                                { label: "Starts_With", val: startsWith, set: setStartsWith, placeholder: "Prefix" },
                                { label: "Ends_With", val: endsWith, set: setEndsWith, placeholder: "Suffix" },
                                { label: "Wildcard_Pattern", val: pattern, set: setPattern, placeholder: "Mask" },
                                { label: "Kill_Letters", val: exclude, set: setExclude, placeholder: "Exclude" }
                            ].map((f, i) => (
                                <div key={i} className="space-y-4">
                                    <label className="text-[10px] font-black text-cyan-500 uppercase tracking-[0.3em] px-1">{f.label}</label>
                                    <input
                                        type="text"
                                        value={f.val}
                                        onChange={(e) => f.set(e.target.value.toUpperCase())}
                                        placeholder={f.placeholder}
                                        className="w-full bg-white dark:bg-black border border-zinc-200 dark:border-zinc-800 rounded-3xl px-8 py-5 font-black text-xl focus:border-cyan-500 outline-none transition-all uppercase placeholder:opacity-20"
                                    />
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* DATA GRID */}
            {loading ? (
                <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-8">
                    {[...Array(18)].map((_, i) => (
                        <div key={i} className="aspect-square bg-zinc-50 dark:bg-zinc-900 rounded-[3rem] animate-pulse border border-zinc-100 dark:border-zinc-800" />
                    ))}
                </div>
            ) : filteredWords.length > 0 ? (
                <div className={cn("gap-8", viewMode === 'grid' ? "grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6" : "flex flex-col")}>
                    <AnimatePresence mode="popLayout">
                        {filteredWords.slice(0, 500).map((word, idx) => (
                            <motion.div
                                key={word}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className={cn(
                                    "nova-card group p-10 flex flex-col items-center justify-center text-center",
                                    viewMode === 'list' && "flex-row items-center justify-between py-8 px-12 text-left h-auto min-h-0"
                                )}
                            >
                                <span className="absolute top-6 left-8 text-[9px] font-black text-zinc-300 dark:text-zinc-800 group-hover:text-cyan-500 transition-colors uppercase tracking-[0.2em]">{idx + 1}_SYNC</span>
                                <h3 className={cn("font-heading font-black tracking-tighter uppercase transition-all duration-500 group-hover:scale-125 group-hover:text-cyan-500", viewMode === 'grid' ? "text-4xl lg:text-5xl" : "text-3xl")}>
                                    {word}
                                </h3>
                                <div className={cn("mt-8 flex gap-1.5 opacity-10 group-hover:opacity-100 transition-all", viewMode === 'list' && "mt-0 order-last")}>
                                    {[...Array(length)].map((_, i) => (
                                        <div key={i} className="w-1.5 h-1.5 rounded-full bg-cyan-500 shadow-[0_0_10px_rgba(0,242,255,1)]" />
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            ) : (
                <div className="py-60 text-center flex flex-col items-center">
                    <div className="w-32 h-32 bg-zinc-100 dark:bg-zinc-900 rounded-full flex items-center justify-center mb-10 border border-zinc-200 dark:border-zinc-800">
                        <X className="w-16 h-16 text-zinc-300" />
                    </div>
                    <h2 className="text-6xl font-heading font-black text-zinc-200 dark:text-zinc-800 uppercase tracking-tighter mb-4 animate-pulse">Null_Results</h2>
                    <p className="text-zinc-500 font-black text-xs uppercase tracking-[0.5em]">System reset required. Modify filter criteria.</p>
                </div>
            )}
        </div>
    );
}
