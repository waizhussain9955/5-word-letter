"use client";

import Link from "next/link";
import { Search, Menu, X, ArrowUpRight, Sun, Moon } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/app/ThemeProvider";
import { useRouter } from "next/navigation";

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const { theme, toggleTheme } = useTheme();
    const router = useRouter();

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 10);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (!searchQuery) return;
        router.push(`/list/5?search=${searchQuery}`);
        setIsSearchOpen(false);
    };

    return (
        <>
            <nav
                className={cn(
                    "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
                    isScrolled
                        ? "py-4 flex justify-center"
                        : "py-8 px-6 lg:px-24"
                )}
            >
                <div
                    className={cn(
                        "flex items-center justify-between transition-all duration-500",
                        isScrolled
                            ? "w-[90%] lg:w-[1280px] px-8 py-4 glass-island rounded-2xl shadow-xl"
                            : "w-full max-w-[1400px] mx-auto"
                    )}
                >
                    {/* Brand Alignment */}
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="w-10 h-10 bg-amber-500 rounded-xl flex items-center justify-center group-hover:rotate-12 transition-all shadow-lg shadow-amber-500/20">
                            <ArrowUpRight className="w-6 h-6 text-black" />
                        </div>
                        <span className="font-heading font-black text-2xl tracking-tighter uppercase whitespace-nowrap">
                            5-Letter Word.
                        </span>
                    </Link>

                    {/* Nav Links Alignment */}
                    <div className="hidden lg:flex items-center gap-12">
                        {["Blog", "About", "Contact"].map((l) => (
                            <Link
                                key={l}
                                href={`/${l.toLowerCase().replace(' ', '-')}`}
                                className="font-heading font-black text-xs uppercase tracking-[0.2em] text-gray-500 hover:text-amber-500 transition-colors py-2"
                            >
                                {l}
                            </Link>
                        ))}
                    </div>

                    {/* Actions Alignment */}
                    <div className="flex items-center gap-6">
                        <button
                            onClick={() => setIsSearchOpen(true)}
                            className="p-2 text-gray-400 hover:text-amber-500 transition-colors"
                        >
                            <Search className="w-5 h-5 font-bold" />
                        </button>

                        <button
                            onClick={toggleTheme}
                            className="p-2 text-gray-400 hover:text-amber-500 transition-colors"
                        >
                            {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                        </button>

                        <Link
                            href="/list/5"
                            className="hidden sm:flex items-center gap-3 bg-black dark:bg-amber-500 text-white dark:text-black px-8 py-4 rounded-xl font-heading font-black text-[10px] uppercase tracking-[0.2em] hover:scale-105 transition-all shadow-xl shadow-black/5 dark:shadow-amber-500/10"
                        >
                            DICTIONARY
                        </Link>

                        <button
                            className="lg:hidden p-2 text-gray-500"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            {mobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Search Overlay Alignment */}
            <AnimatePresence>
                {isSearchOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-white dark:bg-black flex items-center justify-center p-8 md:p-20"
                    >
                        <button onClick={() => setIsSearchOpen(false)} className="absolute top-12 right-12 hover:rotate-90 transition-transform">
                            <X className="w-12 h-12" />
                        </button>

                        <div className="w-full max-w-6xl">
                            <form onSubmit={handleSearch}>
                                <div className="text-[12px] font-black tracking-[0.6em] text-amber-500 mb-10 uppercase">System Intelligence_</div>
                                <input
                                    autoFocus
                                    type="text"
                                    placeholder="SEARCH ARCHIVE..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value.toUpperCase())}
                                    className="w-full bg-transparent border-none text-6xl md:text-[120px] font-heading font-black text-[var(--foreground)] outline-none placeholder:text-gray-100 dark:placeholder:text-zinc-900 tracking-tighter"
                                />
                                <div className="mt-16 flex items-center gap-10">
                                    <button className="font-heading font-black text-3xl border-b-6 border-amber-500 flex items-center gap-8 hover:gap-12 transition-all">
                                        START RETRIEVAL <ArrowUpRight className="w-10 h-10 text-amber-500" />
                                    </button>
                                </div>
                            </form>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Mobile Menu Alignment */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 100 }}
                        className="fixed inset-0 z-[60] bg-white dark:bg-black p-12 pt-40 flex flex-col gap-10"
                    >
                        {["Home", "Blog", "About", "Contact", "Dictionary"].map((l) => (
                            <Link
                                key={l}
                                href={l === 'Home' ? '/' : l === 'Dictionary' ? '/list/5' : `/${l.toLowerCase()}`}
                                onClick={() => setMobileMenuOpen(false)}
                                className="text-5xl font-heading font-black tracking-tighter uppercase text-zinc-200 dark:text-zinc-800 hover:text-amber-500 transition-colors"
                            >
                                {l}
                            </Link>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
