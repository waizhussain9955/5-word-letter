"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, RotateCcw, LayoutGrid, List as ListIcon, SlidersHorizontal, ArrowUpRight, Plus, X } from "lucide-react";
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
        <div className="pt-20">
            {/* 1. ARCHIVE HEADER */}
            <header className="mb-32 flex flex-col lg:flex-row lg:items-end justify-between gap-12">
                <div>
                    <div className="flex items-center gap-3 mb-6">
                        <span className="font-heading font-black text-amber-500 uppercase tracking-widest text-xs">Specification</span>
                        <div className="h-px w-24 bg-amber-500/20" />
                    </div>
                    <h1 className="text-8xl md:text-[120px] font-heading font-black tracking-tighter leading-none mb-4">
                        LENGTH_{length}
                    </h1>
                    <div className="font-heading font-black text-xs text-gray-400 uppercase tracking-[0.5em]">
                        Total Index: {words.length.toLocaleString()} Entries
                    </div>
                </div>

                <div className="flex flex-wrap gap-4">
                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className="group bg-black dark:bg-white text-white dark:text-black px-10 py-5 font-heading font-black text-xs uppercase tracking-widest flex items-center gap-4 hover:bg-amber-500 hover:text-black transition-all"
                    >
                        <SlidersHorizontal className="w-4 h-4" />
                        {showFilters ? 'CLOSE_SYSTEM' : 'SYSTEM_OVERRIDE'}
                    </button>
                    <div className="flex bg-[var(--card)] p-2 border border-[var(--border)]">
                        <button onClick={() => setViewMode('grid')} className={cn("p-4 transition-all", viewMode === 'grid' ? "bg-amber-500 text-black" : "text-gray-400")}>
                            <LayoutGrid className="w-5 h-5" />
                        </button>
                        <button onClick={() => setViewMode('list')} className={cn("p-4 transition-all", viewMode === 'list' ? "bg-amber-500 text-black" : "text-gray-400")}>
                            <ListIcon className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </header>

            {/* 2. FILTER TECH PANEL */}
            <AnimatePresence>
                {showFilters && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden mb-32 border-b border-[var(--border)] pb-24"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                            {[
                                { label: "PREFIX", val: startsWith, set: setStartsWith, placeholder: "TH" },
                                { label: "SUFFIX", val: endsWith, set: setEndsWith, placeholder: "ER" },
                                { label: "MASK", val: pattern, set: setPattern, placeholder: "_A_E_" },
                                { label: "EXCLUDE", val: exclude, set: setExclude, placeholder: "QXZ" }
                            ].map((f, i) => (
                                <div key={i} className="space-y-4">
                                    <label className="font-heading font-black text-[10px] uppercase tracking-widest text-gray-400">{f.label}</label>
                                    <input
                                        type="text"
                                        value={f.val}
                                        onChange={(e) => f.set(e.target.value.toUpperCase())}
                                        placeholder={f.placeholder}
                                        className="w-full bg-transparent border-b-2 border-zinc-200 dark:border-zinc-800 py-4 text-2xl font-heading font-black focus:border-amber-500 outline-none transition-all uppercase tracking-widest"
                                    />
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* 3. DATA GRID */}
            {loading ? (
                <div className="grid grid-cols-2 lg:grid-cols-5 gap-0">
                    {[...Array(20)].map((_, i) => (
                        <div key={i} className="aspect-square bg-gray-50 dark:bg-zinc-950 border border-[var(--border)] animate-pulse" />
                    ))}
                </div>
            ) : filteredWords.length > 0 ? (
                <div className={cn("gap-0 border-l border-t border-[var(--border)] overflow-hidden", viewMode === 'grid' ? "grid grid-cols-2 lg:grid-cols-5" : "flex flex-col")}>
                    {filteredWords.slice(0, 500).map((word, idx) => (
                        <motion.div
                            key={word}
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            className="luxury-card aspect-square flex flex-col items-center justify-center p-8 group border-collapse"
                        >
                            <span className="text-[10px] font-black text-zinc-300 dark:text-zinc-800 absolute top-4 left-4 font-mono group-hover:text-amber-500 transition-colors">#{idx + 1}</span>
                            <h3 className="text-4xl md:text-5xl font-heading font-black uppercase tracking-tighter group-hover:scale-110 group-hover:text-amber-500 transition-all duration-500">
                                {word}
                            </h3>
                            <button className="mt-8 text-[8px] font-black tracking-widest text-zinc-300 opacity-0 group-hover:opacity-100 uppercase transition-all">
                                VIEW_ENTRY
                            </button>
                        </motion.div>
                    ))}
                </div>
            ) : (
                <div className="py-40 text-center border-t border-dashed border-[var(--border)]">
                    <h2 className="text-5xl font-heading font-black text-gray-200 uppercase mb-4 tracking-tighter">NULL_RESULT</h2>
                    <p className="text-gray-400 font-medium">Clear override to resume archive retrieval.</p>
                </div>
            )}
        </div>
    );
}
