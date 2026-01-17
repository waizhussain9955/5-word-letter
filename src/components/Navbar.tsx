"use client";

import Link from "next/link";
import { Search, Menu, X, Command, Sun, Moon, Sparkles } from "lucide-react";
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
        <header
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
                isScrolled ? "bg-white/80 dark:bg-black/80 backdrop-blur-xl border-b border-zinc-200 dark:border-zinc-800 py-4 shadow-sm" : "bg-transparent py-6"
            )}
        >
            <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
                {/* Brand */}
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="w-9 h-9 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-500/20 group-hover:rotate-6 transition-transform">
                        <Sparkles className="w-5 h-5 fill-current" />
                    </div>
                    <span className="text-xl font-bold tracking-tight">
                        5-Letter<span className="text-indigo-600">Word</span>
                    </span>
                </Link>

                {/* Main Nav */}
                <nav className="hidden md:flex items-center gap-10">
                    {[
                        { name: "Explorer", href: "/list/5" },
                        { name: "Journal", href: "/blog" },
                        { name: "About", href: "/about-us" },
                        { name: "Contact", href: "/contact" }
                    ].map((l) => (
                        <Link
                            key={l.name}
                            href={l.href}
                            className="text-sm font-medium text-zinc-500 hover:text-indigo-600 transition-colors"
                        >
                            {l.name}
                        </Link>
                    ))}
                </nav>

                {/* Actions */}
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setIsSearchOpen(true)}
                        className="p-2.5 text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-xl transition-all"
                        aria-label="Search"
                    >
                        <Search className="w-5 h-5" />
                    </button>

                    <button
                        onClick={toggleTheme}
                        className="p-2.5 text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-xl transition-all"
                        aria-label="Toggle Theme"
                    >
                        {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                    </button>

                    <button
                        className="md:hidden p-2.5 text-zinc-500"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Nav */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="absolute top-[calc(100%+1rem)] left-6 right-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 rounded-3xl shadow-2xl flex flex-col gap-2"
                    >
                        {[
                            { name: "Explorer", href: "/list/5" },
                            { name: "Journal", href: "/blog" },
                            { name: "About", href: "/about-us" },
                            { name: "Contact", href: "/contact" }
                        ].map((l) => (
                            <Link
                                key={l.name}
                                href={l.href}
                                onClick={() => setMobileMenuOpen(false)}
                                className="text-lg font-semibold p-3 hover:bg-zinc-50 dark:hover:bg-zinc-800 rounded-xl transition-colors"
                            >
                                {l.name}
                            </Link>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Search Overlay */}
            <AnimatePresence>
                {isSearchOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] px-6 bg-white/40 dark:bg-black/40 backdrop-blur-md"
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            className="bg-white dark:bg-zinc-900 w-full max-w-2xl rounded-3xl p-6 shadow-2xl relative border border-zinc-200 dark:border-zinc-800"
                        >
                            <button onClick={() => setIsSearchOpen(false)} className="absolute top-6 right-6 p-2 text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-all">
                                <X className="w-5 h-5" />
                            </button>
                            <h2 className="text-xl font-bold mb-6 px-2">Knowledge Base Search</h2>
                            <form onSubmit={handleSearch}>
                                <div className="relative">
                                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 w-5 h-5" />
                                    <input
                                        autoFocus
                                        type="text"
                                        placeholder="Type to search..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl pl-12 pr-6 py-4 text-lg outline-none focus:ring-4 ring-indigo-500/10 transition-all font-medium"
                                    />
                                </div>
                                <p className="mt-4 px-2 text-xs text-zinc-500 font-medium">Press Enter to search across all dictionaries.</p>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
