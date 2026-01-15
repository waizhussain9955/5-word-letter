"use client";

import Link from "next/link";
import { Search, Menu, X, BookOpen, ChevronDown, Sparkles, Moon, Sun } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/app/ThemeProvider";

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isListsOpen, setIsListsOpen] = useState(false);
    const { theme, toggleTheme } = useTheme();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "Home", href: "/" },
        { name: "Blog", href: "/blog" },
        { name: "About", href: "/about-us" },
        { name: "Contact", href: "/contact" },
    ];

    const wordLists = [
        { name: "3 Letters", href: "/list/3", desc: "Short & Sharp" },
        { name: "4 Letters", href: "/list/4", desc: "Daily Core" },
        { name: "5 Letters", href: "/list/5", desc: "Wordle Pro" },
        { name: "6 Letters", href: "/list/6", desc: "Advanced" },
        { name: "7 Letters", href: "/list/7", desc: "Scholar" },
    ];

    return (
        <nav
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-6 py-4",
                isScrolled
                    ? "bg-white/80 dark:bg-zinc-950/80 backdrop-blur-xl shadow-lg border-b border-gray-200/50 dark:border-zinc-800/50 py-3"
                    : "bg-transparent"
            )}
        >
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-3 group">
                    <div className="relative">
                        <div className="absolute -inset-1 bg-gradient-to-tr from-indigo-600 to-purple-600 rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
                        <div className="relative bg-indigo-600 p-2.5 rounded-xl group-hover:rotate-6 transition-transform duration-500 shadow-xl shadow-indigo-600/20">
                            <BookOpen className="w-5 h-5 text-white" />
                        </div>
                    </div>
                    <span className="text-2xl font-black tracking-tighter text-gray-900 dark:text-white">Lumina</span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-1">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="px-4 py-2 text-sm font-bold text-gray-500 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-white transition-all rounded-xl hover:bg-gray-50 dark:hover:bg-zinc-900"
                        >
                            {link.name}
                        </Link>
                    ))}

                    {/* Megamenu Trigger */}
                    <div
                        className="relative group"
                        onMouseEnter={() => setIsListsOpen(true)}
                        onMouseLeave={() => setIsListsOpen(false)}
                    >
                        <button className="flex items-center gap-1 px-4 py-2 text-sm font-bold text-gray-500 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-white transition-all rounded-xl hover:bg-gray-50 dark:hover:bg-zinc-900">
                            Word Lists
                            <ChevronDown className={cn("w-4 h-4 transition-transform duration-300", isListsOpen && "rotate-180")} />
                        </button>

                        <AnimatePresence>
                            {isListsOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                    className="absolute top-full left-1/2 -translate-x-1/2 pt-4"
                                >
                                    <div className="bg-white dark:bg-zinc-950 border border-gray-100 dark:border-zinc-800 shadow-2xl rounded-[2rem] p-4 min-w-[280px]">
                                        <div className="grid gap-1">
                                            {wordLists.map((item) => (
                                                <Link
                                                    key={item.name}
                                                    href={item.href}
                                                    className="flex flex-col gap-0.5 p-3.5 rounded-2xl hover:bg-indigo-50 dark:hover:bg-indigo-950/30 group/item transition-all"
                                                >
                                                    <span className="text-sm font-black text-gray-900 dark:text-white group-hover/item:text-indigo-600 transition-colors uppercase tracking-tight">{item.name}</span>
                                                    <span className="text-[10px] font-bold text-gray-400 dark:text-zinc-500 uppercase tracking-widest">{item.desc}</span>
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                    {/* Theme Toggle */}
                    <button
                        onClick={toggleTheme}
                        className="p-2.5 text-gray-500 dark:text-zinc-400 hover:bg-gray-100 dark:hover:bg-zinc-900 rounded-xl transition-all hover:text-indigo-600 relative overflow-hidden group"
                    >
                        <AnimatePresence mode="wait">
                            {theme === 'light' ? (
                                <motion.div key="moon" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -20, opacity: 0 }} transition={{ duration: 0.2 }}>
                                    <Moon className="w-5 h-5" />
                                </motion.div>
                            ) : (
                                <motion.div key="sun" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -20, opacity: 0 }} transition={{ duration: 0.2 }}>
                                    <Sun className="w-5 h-5" />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </button>

                    <button className="hidden sm:flex p-2.5 text-gray-500 dark:text-zinc-400 hover:bg-gray-100 dark:hover:bg-zinc-900 rounded-xl transition-all hover:text-indigo-600">
                        <Search className="w-5 h-5" />
                    </button>

                    <Link
                        href="/list/5"
                        className="hidden sm:flex items-center gap-2 bg-indigo-600 text-white px-5 py-2.5 rounded-xl font-black text-sm hover:bg-indigo-700 active:scale-95 transition-all shadow-xl shadow-indigo-600/20"
                    >
                        <Sparkles className="w-4 h-4" />
                        Generator
                    </Link>

                    <button
                        className="md:hidden p-2.5 text-gray-500 dark:text-zinc-400 hover:bg-gray-100 dark:hover:bg-zinc-900 rounded-xl transition-colors"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="md:hidden fixed inset-0 top-[72px] bg-white dark:bg-zinc-950 z-40 px-6 py-8 overflow-y-auto"
                    >
                        <div className="flex flex-col gap-8">
                            <div className="grid gap-2">
                                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 mb-2">Navigator</span>
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.name}
                                        href={link.href}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="text-2xl font-black p-4 rounded-[2rem] bg-gray-50 dark:bg-zinc-900 text-gray-900 dark:text-white border border-gray-100 dark:border-zinc-800"
                                    >
                                        {link.name}
                                    </Link>
                                ))}
                            </div>

                            <div className="grid gap-2">
                                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 mb-2">Word Databases</span>
                                <div className="grid grid-cols-1 gap-3">
                                    {wordLists.map((link) => (
                                        <Link
                                            key={link.name}
                                            href={link.href}
                                            onClick={() => setMobileMenuOpen(false)}
                                            className="p-5 rounded-[2rem] bg-indigo-50/50 dark:bg-indigo-950/20 text-gray-900 dark:text-white border border-indigo-100 dark:border-indigo-900/50"
                                        >
                                            <div className="flex flex-col">
                                                <span className="text-lg font-black uppercase">{link.name}</span>
                                                <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">{link.desc}</span>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
