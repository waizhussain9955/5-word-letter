"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, SlidersHorizontal, LayoutGrid, List as ListIcon, Zap, ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ListClientProps {
    length: number;
}

export default function ListClient({ length }: ListClientProps) {
    const [words, setWords] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [showFilters, setShowFilters] = useState(false);

    // Pagination State
    const [currentPage, setCurrentPage] = useState(1);
    const wordsPerPage = 20;

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
                setTimeout(() => setLoading(false), 600);
            }
        }
        loadData();
    }, [length]);

    // Reset pagination when filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [startsWith, endsWith, pattern, exclude, length]);

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

    // Pagination Logic
    const totalPages = Math.ceil(filteredWords.length / wordsPerPage);
    const currentWords = useMemo(() => {
        const startIndex = (currentPage - 1) * wordsPerPage;
        return filteredWords.slice(startIndex, startIndex + wordsPerPage);
    }, [filteredWords, currentPage]);

    const pageNumbers = [];
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, startPage + 4);
    if (endPage - startPage < 4) startPage = Math.max(1, endPage - 4);

    for (let i = startPage; i <= endPage; i++) pageNumbers.push(i);

    return (
        <div className="pt-40 pb-40 px-6 max-w-[1400px] mx-auto min-h-screen">

            {/* CYBER HEADER */}
            <header className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 mb-20">
                <div className="relative">
                    <div className="flex items-center gap-4 mb-6">
                        <Zap className="w-5 h-5 text-cyan-500 fill-current" />
                        <span className="font-heading font-black text-xs uppercase tracking-[0.5em] text-zinc-400">Archive Node: {length}</span>
                    </div>
                    <h1 className="text-6xl md:text-[5rem] font-heading font-black tracking-tighter leading-[0.8] uppercase mb-6">
                        INDEX<span className="text-cyan-500">_</span>{length}
                    </h1>
                    <p className="font-bold uppercase text-[10px] tracking-[0.3em] text-zinc-500">
                        Total Results: {filteredWords.length.toLocaleString()} | Showing {currentWords.length} per page
                    </p>
                </div>

                <div className="flex items-center gap-4 flex-wrap">
                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className={cn(
                            "flex items-center gap-3 px-8 py-4 rounded-full font-black text-xs uppercase tracking-[0.2em] transition-all",
                            showFilters ? "bg-cyan-500 text-black shadow-lg shadow-cyan-500/30" : "bg-black text-white dark:bg-zinc-800"
                        )}
                    >
                        <SlidersHorizontal className="w-4 h-4" />
                        FILTERS
                    </button>
                </div>
            </header>

            {/* CYBER FILTERS */}
            <AnimatePresence>
                {showFilters && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden mb-16"
                    >
                        <div className="nova-card p-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            {[
                                { label: "Prefix", val: startsWith, set: setStartsWith, placeholder: "e.g. ST" },
                                { label: "Suffix", val: endsWith, set: setEndsWith, placeholder: "e.g. ED" },
                                { label: "Pattern", val: pattern, set: setPattern, placeholder: "e.g. B_E_T" },
                                { label: "Exclude", val: exclude, set: setExclude, placeholder: "e.g. X, Q" }
                            ].map((f, i) => (
                                <div key={i} className="space-y-3">
                                    <label className="text-[10px] font-black text-cyan-500 uppercase tracking-widest">{f.label}</label>
                                    <input
                                        type="text"
                                        value={f.val}
                                        onChange={(e) => f.set(e.target.value.toUpperCase())}
                                        placeholder={f.placeholder}
                                        className="w-full bg-white dark:bg-black border border-zinc-200 dark:border-zinc-800 rounded-2xl px-6 py-4 font-bold text-lg focus:border-cyan-500 outline-none transition-all uppercase"
                                    />
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* WORD GRID - Styled like the Image */}
            <div className="min-h-[600px]">
                {loading ? (
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                        {[...Array(20)].map((_, i) => (
                            <div key={i} className="h-20 bg-zinc-50 dark:bg-zinc-900 rounded-xl animate-pulse border border-zinc-100 dark:border-zinc-800" />
                        ))}
                    </div>
                ) : currentWords.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                        {currentWords.map((word, idx) => (
                            <motion.div
                                key={word}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="h-20 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-sm flex items-center justify-center group hover:border-cyan-500 transition-all duration-300"
                            >
                                <span className="text-xl md:text-2xl font-bold text-zinc-700 dark:text-zinc-200 uppercase tracking-tight group-hover:text-cyan-500 group-hover:scale-110 transition-all">
                                    {word}
                                </span>
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <div className="py-40 text-center">
                        <h3 className="text-4xl font-heading font-black text-zinc-200 dark:text-zinc-800 uppercase">NO_RECORDS_FOUND</h3>
                    </div>
                )}
            </div>

            {/* PAGINATION - Modern Minimal Style */}
            {totalPages > 1 && (
                <div className="mt-24 flex flex-col items-center gap-8">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                            disabled={currentPage === 1}
                            className="p-4 rounded-full border border-zinc-200 dark:border-zinc-800 disabled:opacity-20 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-all"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </button>

                        <div className="flex items-center gap-2">
                            {pageNumbers.map(n => (
                                <button
                                    key={n}
                                    onClick={() => setCurrentPage(n)}
                                    className={cn(
                                        "w-12 h-12 rounded-xl font-black text-sm transition-all border",
                                        currentPage === n
                                            ? "bg-cyan-500 border-cyan-500 text-black shadow-lg shadow-cyan-500/20"
                                            : "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-400 hover:border-cyan-500 hover:text-cyan-500"
                                    )}
                                >
                                    {n}
                                </button>
                            ))}
                        </div>

                        <button
                            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                            disabled={currentPage === totalPages}
                            className="p-4 rounded-full border border-zinc-200 dark:border-zinc-800 disabled:opacity-20 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-all"
                        >
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400">
                        PAGE {currentPage} OF {totalPages} | SYSTEM_INDEX_HEALTHY
                    </div>
                </div>
            )}
        </div>
    );
}
