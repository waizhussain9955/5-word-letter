"use client";

import Link from "next/link";
import { Search, Menu, X, BookOpen, ChevronDown, Sparkles, Moon, Sun, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/app/ThemeProvider";
import { useRouter } from "next/navigation";

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isListsOpen, setIsListsOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const { theme, toggleTheme } = useTheme();
    const router = useRouter();

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
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

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (!searchQuery) return;
        // Basic intelligence: if it's a number, go to that list, otherwise look for length
        const len = searchQuery.length;
        if (len >= 3 && len <= 7) {
            router.push(`/list/${len}?search=${searchQuery}`);
        } else {
            router.push(`/list/5?search=${searchQuery}`);
        }
        setIsSearchOpen(false);
    };

    return (
        <>
            <nav
                className={cn(
                    "fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-6 py-4",
                    isScrolled
                        ? "bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl shadow-2xl border-b border-emerald-100 dark:border-emerald-900/20 py-3"
                        : "bg-transparent"
                )}
            >
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    {/* Logo - Updated Name */}
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="relative">
                            <div className="absolute -inset-1 bg-gradient-to-tr from-emerald-500 to-blue-500 rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
                            <div className="relative bg-emerald-600 p-2.5 rounded-xl group-hover:rotate-6 transition-transform duration-500 shadow-xl shadow-emerald-600/20">
                                <Sparkles className="w-5 h-5 text-white" />
                            </div>
                        </div>
                        <span className="text-2xl font-black tracking-tighter text-emerald-900 dark:text-emerald-50">5-Letter Word</span>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="px-5 py-2 text-sm font-black text-emerald-800/60 dark:text-emerald-100/40 hover:text-emerald-600 dark:hover:text-emerald-300 transition-all rounded-xl hover:bg-emerald-50 dark:hover:bg-emerald-900/30 uppercase tracking-widest"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setIsSearchOpen(true)}
                            className="p-2.5 text-emerald-800 dark:text-emerald-100 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 rounded-xl transition-all"
                        >
                            <Search className="w-5 h-5 font-bold" />
                        </button>

                        <button
                            onClick={toggleTheme}
                            className="p-2.5 text-emerald-800 dark:text-emerald-100 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 rounded-xl transition-all"
                        >
                            {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                        </button>

                        <button
                            className="md:hidden p-2.5 text-emerald-800 dark:text-emerald-100"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Search Overlay */}
            <AnimatePresence>
                {isSearchOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-emerald-950/90 backdrop-blur-2xl flex items-center justify-center p-6"
                    >
                        <button
                            onClick={() => setIsSearchOpen(false)}
                            className="absolute top-10 right-10 text-white hover:rotate-90 transition-transform"
                        >
                            <X className="w-10 h-10" />
                        </button>

                        <div className="w-full max-w-3xl text-center">
                            <h2 className="text-4xl font-black text-white mb-12 tracking-tighter">Global Lexicon Search.</h2>
                            <form onSubmit={handleSearch} className="relative">
                                <input
                                    autoFocus
                                    type="text"
                                    placeholder="Type any word..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full bg-transparent border-b-8 border-emerald-500/30 focus:border-emerald-500 py-6 text-5xl md:text-7xl font-black text-white outline-none placeholder:text-emerald-500/20 transition-all text-center"
                                />
                                <button type="submit" className="mt-12 group flex items-center gap-4 mx-auto bg-emerald-500 text-emerald-950 px-10 py-5 rounded-[2rem] font-black text-xl hover:bg-white transition-all">
                                    Initialize Extraction
                                    <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                                </button>
                            </form>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: 200 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 100 }}
                        className="fixed inset-0 z-40 bg-emerald-50 dark:bg-slate-950 flex flex-col p-10 pt-32"
                    >
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                onClick={() => setMobileMenuOpen(false)}
                                className="text-5xl font-black text-emerald-950 dark:text-white py-4 border-b border-emerald-100 dark:border-emerald-900"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
