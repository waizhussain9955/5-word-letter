"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, RotateCcw, LayoutGrid, List as ListIcon, SlidersHorizontal, ChevronRight } from "lucide-react";
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

            {/* CLEAN HEADER */}
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-16">
                <div>
                    <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-4">
                        {length} Letter <span className="text-blue-600">Words.</span>
                    </h1>
                    <p className="text-slate-500 font-medium">
                        Showing {filteredWords.length.toLocaleString()} matches in our verified database.
                    </p>
                </div>

                <div className="flex items-center gap-4">
                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className={cn(
                            "flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all border",
                            showFilters ? "bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-500/20" : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800"
                        )}
                    >
                        <SlidersHorizontal className="w-4 h-4" />
                        Filters
                    </button>
                    <div className="flex bg-slate-100 dark:bg-slate-900 p-1 rounded-xl">
                        <button onClick={() => setViewMode('grid')} className={cn("p-3 rounded-lg transition-all", viewMode === 'grid' ? "bg-white dark:bg-slate-800 shadow-sm text-blue-600" : "text-slate-400")}>
                            <LayoutGrid className="w-5 h-5" />
                        </button>
                        <button onClick={() => setViewMode('list')} className={cn("p-3 rounded-lg transition-all", viewMode === 'list' ? "bg-white dark:bg-slate-800 shadow-sm text-blue-600" : "text-slate-400")}>
                            <ListIcon className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </header>

            {/* MINIMAL FILTERS */}
            <AnimatePresence>
                {showFilters && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden mb-16"
                    >
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-8 bg-slate-50 dark:bg-slate-900/50 rounded-3xl border border-slate-200/50 dark:border-slate-800/50">
                            {[
                                { label: "Starts With", val: startsWith, set: setStartsWith, placeholder: "e.g. A" },
                                { label: "Ends With", val: endsWith, set: setEndsWith, placeholder: "e.g. T" },
                                { label: "Pattern (_)", val: pattern, set: setPattern, placeholder: "e.g. B_E_T" },
                                { label: "Exclude Letters", val: exclude, set: setExclude, placeholder: "e.g. S, R" }
                            ].map((f, i) => (
                                <div key={i} className="space-y-3">
                                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">{f.label}</label>
                                    <input
                                        type="text"
                                        value={f.val}
                                        onChange={(e) => f.set(e.target.value.toUpperCase())}
                                        placeholder={f.placeholder}
                                        className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-5 py-3 font-semibold focus:ring-2 ring-blue-500/20 outline-none transition-all uppercase"
                                    />
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* DATA VIEW */}
            {loading ? (
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                    {[...Array(18)].map((_, i) => (
                        <div key={i} className="aspect-square bg-slate-50 dark:bg-slate-900 rounded-2xl animate-pulse" />
                    ))}
                </div>
            ) : filteredWords.length > 0 ? (
                <div className={cn("gap-6", viewMode === 'grid' ? "grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6" : "flex flex-col")}>
                    {filteredWords.slice(0, 300).map((word, idx) => (
                        <motion.div
                            key={word}
                            layout
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className={cn(
                                "prism-card group relative overflow-hidden",
                                viewMode === 'grid' ? "aspect-square flex flex-col items-center justify-center" : "flex items-center justify-between p-6"
                            )}
                        >
                            <span className="text-[10px] font-bold text-slate-300 dark:text-slate-700 absolute top-4 left-4 font-mono">#{idx + 1}</span>
                            <h3 className={cn("font-black tracking-tight group-hover:text-blue-600 transition-colors uppercase", viewMode === 'grid' ? "text-3xl" : "text-xl")}>
                                {word}
                            </h3>
                            <button className="opacity-0 group-hover:opacity-100 mt-4 text-[10px] font-bold text-blue-600 uppercase tracking-widest transition-all">
                                Word Details
                            </button>
                        </motion.div>
                    ))}
                </div>
            ) : (
                <div className="py-40 text-center prism-card border-dashed">
                    <Search className="w-16 h-16 text-slate-200 mx-auto mb-6" />
                    <h3 className="text-3xl font-bold mb-2">No words found.</h3>
                    <p className="text-slate-500">Try adjusting your filters to broaden your search.</p>
                </div>
            )}
        </div>
    );
}
