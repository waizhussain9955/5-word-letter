"use client";

import Link from "next/link";
import { Search, Menu, X, ArrowUpRight, Sun, Moon, Sparkles } from "lucide-react";
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
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
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
                    "fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-700 w-[95%] lg:w-[1200px]",
                    isScrolled
                        ? "px-6 py-3 glass-island rounded-full"
                        : "px-6 py-6 border-b border-[var(--border)]"
                )}
            >
                <div className="flex items-center justify-between">
                    {/* Brand */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="w-8 h-8 bg-amber-500 rounded-none flex items-center justify-center group-hover:rotate-90 transition-transform">
                            <ArrowUpRight className="w-5 h-5 text-black" />
                        </div>
                        <span className="font-heading font-black text-xl tracking-tighter uppercase whitespace-nowrap">
                            5-Letter Word.
                        </span>
                    </Link>

                    {/* Nav Links */}
                    <div className="hidden lg:flex items-center gap-10">
                        {["Blog", "About", "Contact"].map((l) => (
                            <Link
                                key={l}
                                href={`/${l.toLowerCase().replace(' ', '-')}`}
                                className="font-heading font-black text-xs uppercase tracking-widest text-gray-500 hover:text-amber-500 transition-colors"
                            >
                                {l}
                            </Link>
                        ))}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setIsSearchOpen(true)}
                            className="p-1 hovered:text-amber-500 transition-colors"
                        >
                            <Search className="w-5 h-5" />
                        </button>

                        <button
                            onClick={toggleTheme}
                            className="p-1 hover:text-amber-500 transition-colors"
                        >
                            {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                        </button>

                        <Link
                            href="/list/5"
                            className="hidden sm:flex items-center gap-3 bg-black dark:bg-white text-white dark:text-black px-6 py-3 font-heading font-black text-[10px] uppercase tracking-widest hover:bg-amber-500 hover:text-black transition-all"
                        >
                            DICTIONARY
                        </Link>

                        <button
                            className="lg:hidden p-1"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            <Menu className="w-6 h-6" />
                        </button>
                    </div>
                </div>
            </nav>

            {/* Unique Search Experience */}
            <AnimatePresence>
                {isSearchOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-white dark:bg-black flex items-center justify-center p-6"
                    >
                        <button onClick={() => setIsSearchOpen(false)} className="absolute top-12 right-12 hover:rotate-90 transition-transform">
                            <X className="w-12 h-12" />
                        </button>

                        <div className="w-full max-w-5xl">
                            <form onSubmit={handleSearch}>
                                <div className="text-[10px] font-black tracking-[0.6em] text-amber-500 mb-8 uppercase">Initialize Discovery</div>
                                <input
                                    autoFocus
                                    type="text"
                                    placeholder="TYPE WORD_"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value.toUpperCase())}
                                    className="w-full bg-transparent border-none text-7xl md:text-[140px] font-heading font-black text-[var(--foreground)] outline-none placeholder:opacity-10 tracking-tighter"
                                />
                                <div className="flex items-center gap-8 mt-12">
                                    <button className="font-heading font-black text-2xl border-b-4 border-amber-500 hover:gap-12 transition-all flex items-center gap-6">
                                        START SEARCH <ArrowUpRight className="w-8 h-8 text-amber-500" />
                                    </button>
                                </div>
                            </form>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.1 }}
                        className="fixed inset-0 z-[60] bg-white dark:bg-black pt-40 px-10"
                    >
                        <button onClick={() => setMobileMenuOpen(false)} className="absolute top-10 right-10">
                            <X className="w-10 h-10" />
                        </button>
                        <div className="flex flex-col gap-12">
                            {["Home", "Blog", "About", "Contact", "Dictionary"].map((l) => (
                                <Link
                                    key={l}
                                    href={l === 'Home' ? '/' : l === 'Dictionary' ? '/list/5' : `/${l.toLowerCase()}`}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="text-6xl font-heading font-black tracking-tighter uppercase text-gray-200 hover:text-amber-500 transition-colors"
                                >
                                    {l}
                                </Link>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
