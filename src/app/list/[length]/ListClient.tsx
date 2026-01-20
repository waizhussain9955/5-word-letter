"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, SlidersHorizontal, Zap, ChevronLeft, ChevronRight, Filter, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSearchParams } from "next/navigation";

interface ListClientProps {
    length: number;
}

export default function ListClient({ length }: ListClientProps) {
    const searchParams = useSearchParams();
    const [words, setWords] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const [showFilters, setShowFilters] = useState(false);

    // Pagination State
    const [currentPage, setCurrentPage] = useState(1);
    const wordsPerPage = 20;

    // Filters
    const [startsWith, setStartsWith] = useState("");
    const [endsWith, setEndsWith] = useState("");
    const [pattern, setPattern] = useState("");
    const [exclude, setExclude] = useState("");

    // Read search param from URL
    useEffect(() => {
        const query = searchParams.get("search");
        if (query) {
            setPattern(query.toUpperCase());
            setShowFilters(true);
        }
    }, [searchParams]);

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

    // Reset pagination when filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [startsWith, endsWith, pattern, exclude, length]);

    const filteredWords = useMemo(() => {
        return words.filter((word) => {
            const w = word.toUpperCase();
            if (startsWith && !w.startsWith(startsWith.toUpperCase())) return false;
            if (endsWith && !w.endsWith(endsWith.toLowerCase().toUpperCase())) return false;
            if (pattern) {
                const p = pattern.toUpperCase();
                if (!p.includes("_")) {
                    if (!w.includes(p)) return false;
                } else {
                    const regexStr = `^${p.replace(/_/g, '.')}$`;
                    try {
                        const regex = new RegExp(regexStr);
                        if (!regex.test(w)) return false;
                    } catch (e) { return false; }
                }
            }
            if (exclude) {
                const letters = exclude.toUpperCase().split("").filter(l => l.trim() !== "");
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
    for (let i = startPage; i <= endPage; i++) if (i > 0) pageNumbers.push(i);

    return (
        <div className="pt-32 pb-40 px-6 max-w-7xl mx-auto min-h-screen">

            <header className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 mb-12">
                <div>
                    <div className="flex items-center gap-3 mb-4">
                        <Zap className="w-5 h-5 text-blue-600 fill-current" />
                        <span className="text-xs font-black uppercase tracking-[0.3em] text-slate-400">Archive Index L{length}</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-slate-500 dark:text-slate-400 uppercase mb-4">
                        The <span className="text-blue-600">Archive.</span>
                    </h1>
                    <p className="font-bold text-slate-500 uppercase text-[10px] tracking-[0.2em]">
                        Total matches: {filteredWords.length.toLocaleString()} | Page {currentPage} of {totalPages || 1}
                    </p>
                </div>

                <div className="flex items-center gap-4">
                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className={cn(
                            "flex items-center gap-3 px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all",
                            showFilters ? "bg-blue-600 text-white shadow-xl shadow-blue-600/20" : "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-300 shadow-sm"
                        )}
                    >
                        <Filter className="w-4 h-4" />
                        {showFilters ? "Close Filters" : "Open Filters"}
                    </button>
                </div>
            </header>

            {/* HIGH CONTRAST FILTERS */}
            <AnimatePresence>
                {showFilters && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden mb-12"
                    >
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-8 bg-slate-100 dark:bg-slate-900 rounded-[2rem] border border-slate-200 dark:border-slate-800">
                            {[
                                { label: "Starts With", val: startsWith, set: setStartsWith, ph: "e.g. A" },
                                { label: "Ends With", val: endsWith, set: setEndsWith, ph: "e.g. Z" },
                                { label: "Pattern (_)", val: pattern, set: setPattern, ph: "e.g. F__S_" },
                                { label: "Exclude", val: exclude, set: setExclude, ph: "e.g. X, Q" }
                            ].map((f, i) => (
                                <div key={i} className="flex flex-col gap-2">
                                    <label className="text-[10px] font-black text-blue-600 uppercase tracking-widest px-1">{f.label}</label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            value={f.val}
                                            onChange={(e) => f.set(e.target.value)}
                                            placeholder={f.ph}
                                            className="w-full bg-white dark:bg-black border-2 border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 font-bold text-slate-900 dark:text-slate-300 focus:border-blue-600 outline-none transition-all uppercase placeholder:text-slate-300 dark:placeholder:text-slate-700"
                                        />
                                        {f.val && (
                                            <button onClick={() => f.set("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-red-500">
                                                <X className="w-4 h-4" />
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* WORD GRID - HIGH VISIBILITY */}
            <div className="min-h-[500px]">
                {loading ? (
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                        {[...Array(20)].map((_, i) => (
                            <div key={i} className="h-20 bg-slate-200 dark:bg-slate-900 rounded-xl animate-pulse" />
                        ))}
                    </div>
                ) : currentWords.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                        {currentWords.map((word) => (
                            <motion.div
                                key={word}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="h-20 bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-xl shadow-sm flex items-center justify-center group hover:border-blue-600 hover:bg-blue-50/30 dark:hover:bg-blue-900/10 transition-all duration-300"
                            >
                                <span className="text-2xl font-bold text-slate-700 dark:text-slate-200 uppercase tracking-tight group-hover:text-blue-600 group-hover:scale-110 transition-all">
                                    {word}
                                </span>
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <div className="py-40 text-center flex flex-col items-center">
                        <Search className="w-12 h-12 text-slate-300 mb-4" />
                        <h3 className="text-2xl font-black text-slate-900 dark:text-slate-300 uppercase tracking-tighter">No Matches Found_</h3>
                        <p className="text-slate-500 font-bold uppercase text-[10px] tracking-widest mt-2">Try adjusting your filters</p>
                    </div>
                )}
            </div>

            {/* HIGH CONTRAST PAGINATION */}
            {totalPages > 1 && (
                <div className="mt-20 flex flex-col items-center gap-6">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                            disabled={currentPage === 1}
                            className="p-4 bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-2xl disabled:opacity-20 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </button>

                        <div className="flex items-center gap-2">
                            {pageNumbers.map(n => (
                                <button
                                    key={n}
                                    onClick={() => setCurrentPage(n)}
                                    className={cn(
                                        "w-12 h-12 rounded-2xl font-black text-sm transition-all border-2",
                                        currentPage === n
                                            ? "bg-blue-600 border-blue-600 text-white shadow-xl shadow-blue-600/20"
                                            : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-400 hover:border-blue-600 hover:text-blue-600"
                                    )}
                                >
                                    {n}
                                </button>
                            ))}
                        </div>

                        <button
                            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                            disabled={currentPage === totalPages}
                            className="p-4 bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-2xl disabled:opacity-20 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
                        >
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                    <div className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">
                        Archive Navigation System_
                    </div>
                </div>
            )}
        </div>
    );
}
