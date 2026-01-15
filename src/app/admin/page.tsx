"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Database, Check, AlertCircle, Trash2, ArrowRight, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

export default function AdminDashboard() {
    const [word, setWord] = useState("");
    const [length, setLength] = useState("5");
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [message, setMessage] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!word || word.length !== parseInt(length)) {
            setStatus('error');
            setMessage(`Word must be exactly ${length} letters long.`);
            return;
        }

        setStatus('loading');
        try {
            const res = await fetch('/api/admin/add-word', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ word: word.toLowerCase(), length: parseInt(length) })
            });

            const data = await res.json();
            if (res.ok) {
                setStatus('success');
                setMessage(`"${word}" has been successfully added to the database.`);
                setWord("");
            } else {
                throw new Error(data.message || "Something went wrong");
            }
        } catch (err: any) {
            setStatus('error');
            setMessage(err.message);
        }
    };

    return (
        <div className="pt-32 pb-24 px-6 min-h-screen">
            <div className="max-w-5xl mx-auto">
                <header className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-16">
                    <div>
                        <div className="flex items-center gap-2 text-indigo-600 font-black text-xs uppercase tracking-[0.3em] mb-4">
                            <ShieldCheck className="w-4 h-4" />
                            <span>System Administrator</span>
                        </div>
                        <h1 className="text-5xl font-black tracking-tighter text-gray-900 dark:text-white">
                            Command <span className="text-gradient">Center.</span>
                        </h1>
                    </div>

                    <div className="flex items-center gap-4 bg-white dark:bg-zinc-900 p-4 rounded-3xl border border-gray-100 dark:border-zinc-800 shadow-xl">
                        <div className="w-12 h-12 bg-indigo-50 dark:bg-indigo-900/30 rounded-2xl flex items-center justify-center text-indigo-600">
                            <Database className="w-6 h-6" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xs font-black uppercase text-gray-400">Total Index</span>
                            <span className="text-lg font-black tracking-tight">16,420 Words</span>
                        </div>
                    </div>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Add Word Form */}
                    <div className="lg:col-span-12">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="premium-card p-12 relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 blur-[100px] rounded-full" />

                            <h2 className="text-3xl font-black tracking-tight mb-8">Inject New Lexicon</h2>

                            <form onSubmit={handleSubmit} className="space-y-8 max-w-2xl">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="flex flex-col gap-3">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Word Length</label>
                                        <select
                                            value={length}
                                            onChange={(e) => setLength(e.target.value)}
                                            className="bg-gray-50 dark:bg-black border border-gray-200 dark:border-zinc-800 rounded-2xl px-6 py-4 font-black outline-none focus:ring-4 ring-indigo-500/10 focus:border-indigo-500 transition-all appearance-none cursor-pointer"
                                        >
                                            {[3, 4, 5, 6, 7].map(n => (
                                                <option key={n} value={n.toString()}>{n} Letters</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="flex flex-col gap-3">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Target Word</label>
                                        <input
                                            type="text"
                                            placeholder={`Enter ${length}-letter word`}
                                            value={word}
                                            onChange={(e) => setWord(e.target.value.toUpperCase())}
                                            className="bg-gray-50 dark:bg-black border border-gray-200 dark:border-zinc-800 rounded-2xl px-6 py-4 font-black outline-none focus:ring-4 ring-indigo-500/10 focus:border-indigo-500 transition-all tracking-[0.2em]"
                                        />
                                    </div>
                                </div>

                                <button
                                    disabled={status === 'loading'}
                                    className={cn(
                                        "w-full py-5 rounded-[2rem] font-black text-lg shadow-2xl transition-all flex items-center justify-center gap-3 active:scale-95",
                                        status === 'loading' ? "bg-gray-400 cursor-not-allowed" : "bg-indigo-600 text-white hover:bg-indigo-700 shadow-indigo-500/20"
                                    )}
                                >
                                    {status === 'loading' ? 'Encrypting & Syncing...' : 'Confirm Injection'}
                                    <Plus className="w-5 h-5" />
                                </button>
                            </form>

                            <AnimatePresence>
                                {status === 'success' && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="mt-8 p-6 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/50 rounded-3xl flex items-center gap-4 text-emerald-700 dark:text-emerald-400"
                                    >
                                        <Check className="w-6 h-6" />
                                        <span className="font-bold">{message}</span>
                                    </motion.div>
                                )}
                                {status === 'error' && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="mt-8 p-6 bg-rose-50 dark:bg-rose-950/20 border border-rose-100 dark:border-rose-900/50 rounded-3xl flex items-center gap-4 text-rose-700 dark:text-rose-400"
                                    >
                                        <AlertCircle className="w-6 h-6" />
                                        <span className="font-bold">{message}</span>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
}
