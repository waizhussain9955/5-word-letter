"use client";

import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Send, Sparkles } from "lucide-react";

export default function ContactPage() {
    return (
        <div className="pt-40 pb-24 px-6 min-h-screen">
            <div className="max-w-5xl mx-auto">
                <header className="text-center mb-20">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-900/20 px-4 py-2 rounded-full text-blue-600 dark:text-blue-400 text-xs font-black mb-8"
                    >
                        <Sparkles className="w-4 h-4 fill-current" />
                        <span>WE'RE HERE TO HELP</span>
                    </motion.div>
                    <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-slate-900 dark:text-white mb-6 uppercase">
                        Get in <span className="text-blue-600">Touch.</span>
                    </h1>
                    <p className="text-xl text-slate-500 font-bold max-w-2xl mx-auto uppercase text-xs tracking-[0.2em]">Have questions or feedback? Our team is ready to connect.</p>
                </header>

                <div className="grid lg:grid-cols-12 gap-12 items-start text-left">
                    {/* Information Side */}
                    <div className="lg:col-span-5 space-y-6">
                        {[
                            { icon: Mail, title: "Email Index", val: "connect@5wordarchive.com", color: "text-blue-600", bg: "bg-blue-50 dark:bg-blue-900/20" },
                            { icon: Phone, title: "Comm Line", val: "+1 (555) 500-ARCHIVE", color: "text-indigo-600", bg: "bg-indigo-50 dark:bg-indigo-900/20" },
                            { icon: MapPin, title: "HQ Node", val: "Digital-First Ops", color: "text-cyan-600", bg: "bg-cyan-50 dark:bg-cyan-900/20" }
                        ].map((item, i) => (
                            <div key={i} className="p-8 rounded-[2rem] bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm flex items-center gap-6">
                                <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-sm", item.bg, item.color)}>
                                    <item.icon className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">{item.title}</h3>
                                    <p className="text-lg font-bold text-slate-900 dark:text-white">{item.val}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Form Side */}
                    <div className="lg:col-span-7 bg-white dark:bg-slate-900 p-10 md:p-12 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-xl shadow-blue-500/5">
                        <form className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Operator Name</label>
                                    <input type="text" placeholder="John Doe" className="w-full px-6 py-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:border-blue-500 outline-none transition-all font-bold" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Comm Channel</label>
                                    <input type="email" placeholder="john@example.com" className="w-full px-6 py-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:border-blue-500 outline-none transition-all font-bold" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Transmission Data</label>
                                <textarea placeholder="How can we help?" rows={5} className="w-full px-6 py-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:border-blue-500 outline-none transition-all font-bold"></textarea>
                            </div>
                            <button className="w-full py-5 bg-blue-600 text-white font-black text-sm uppercase tracking-[0.2em] rounded-2xl hover:bg-blue-700 transition-all flex items-center justify-center gap-3 shadow-lg shadow-blue-500/20 active:scale-[0.98]">
                                Execute Transmission <Send className="w-4 h-4" />
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

import { cn } from "@/lib/utils";
