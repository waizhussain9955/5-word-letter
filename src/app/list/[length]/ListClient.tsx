"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, RotateCcw, Filter, ChevronDown, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";

interface ListClientProps {
    length: number;
}

export default function ListClient({ length }: ListClientProps) {
    const [words, setWords] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

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
                setLoading(false);
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
                if (p.includes('_')) {
                    const regex = new RegExp(`^${p.replace(/_/g, '.')}$`);
                    if (!regex.test(w)) return false;
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
    }, [words, startsWith, endsWith, pattern, exclude]);

    const handleReset = () => {
        setStartsWith("");
        setEndsWith("");
        setPattern("");
        setExclude("");
    };

    if (error) return (
        <div className="text-center py-20">
            <div className="bg-red-50 dark:bg-red-900/10 p-8 rounded-3xl border border-red-100 dark:border-red-900 inline-block">
                <h2 className="text-2xl font-bold text-red-600 mb-2">Error Loading Data</h2>
                <p className="text-red-400">Please verify the word list exists for this length.</p>
            </div>
        </div>
    );

    return (
        <div>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                <div>
                    <h1 className="text-5xl font-black mb-2 tracking-tighter">
                        {length} Letter <span className="text-indigo-600">Words</span>
                    </h1>
                    <p className="text-gray-400 font-medium">
                        Showing <span className="text-indigo-500 font-bold">{filteredWords.length}</span> of {words.length} results
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className="flex items-center gap-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 px-4 py-2 rounded-xl text-sm font-bold shadow-sm hover:scale-105 transition-all"
                    >
                        <Filter className="w-4 h-4" />
                        <span>{showFilters ? 'Hide' : 'Show'} Filters</span>
                    </button>
                    <button
                        onClick={handleReset}
                        className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-xl text-sm font-bold hover:bg-gray-200 dark:hover:bg-gray-700 transition-all"
                    >
                        <RotateCcw className="w-4 h-4" />
                        <span>Reset</span>
                    </button>
                </div>
            </div>

            <AnimatePresence>
                {showFilters && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden mb-12"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 p-8 bg-gray-50/50 dark:bg-gray-900/20 rounded-[2rem] border border-gray-100 dark:border-gray-800">
                            <div className="flex flex-col gap-2">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-indigo-500 pl-1">Starts With</label>
                                <input
                                    type="text"
                                    value={startsWith}
                                    onChange={(e) => setStartsWith(e.target.value)}
                                    placeholder="e.g. BR"
                                    className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-2xl px-4 py-3 text-sm focus:ring-2 ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-indigo-500 pl-1">Ends With</label>
                                <input
                                    type="text"
                                    value={endsWith}
                                    onChange={(e) => setEndsWith(e.target.value)}
                                    placeholder="e.g. ED"
                                    className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-2xl px-4 py-3 text-sm focus:ring-2 ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-indigo-500 pl-1">Pattern Match (_ wild)</label>
                                <input
                                    type="text"
                                    value={pattern}
                                    onChange={(e) => setPattern(e.target.value)}
                                    placeholder="e.g. _A_E_"
                                    className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-2xl px-4 py-3 text-sm focus:ring-2 ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all font-mono tracking-widest"
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-indigo-500 pl-1">Exclude Letters</label>
                                <input
                                    type="text"
                                    value={exclude}
                                    onChange={(e) => setExclude(e.target.value)}
                                    placeholder="e.g. XYZ"
                                    className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-2xl px-4 py-3 text-sm focus:ring-2 ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
                                />
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {loading ? (
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {[...Array(24)].map((_, i) => (
                        <div key={i} className="h-16 bg-gray-100 dark:bg-gray-800 rounded-2xl animate-pulse" />
                    ))}
                </div>
            ) : filteredWords.length > 0 ? (
                <motion.div
                    layout
                    className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4"
                >
                    <AnimatePresence mode="popLayout">
                        {filteredWords.map((word) => (
                            <motion.div
                                key={word}
                                layout
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                whileHover={{ scale: 1.05 }}
                                className="group relative bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-4 rounded-2xl shadow-sm hover:shadow-xl hover:border-indigo-500 transition-all cursor-default flex items-center justify-between"
                            >
                                <span className="text-lg font-bold tracking-widest uppercase">{word}</span>
                                <BookOpen className="w-3 h-3 text-gray-300 group-hover:text-indigo-400" />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            ) : (
                <div className="text-center py-32 bg-gray-50 dark:bg-gray-900/20 rounded-[3rem] border-2 border-dashed border-gray-200 dark:border-gray-800">
                    <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-xl font-bold mb-1">No words found</h3>
                    <p className="text-gray-400">Try loosening your filter criteria.</p>
                </div>
            )}
        </div>
    );
}
