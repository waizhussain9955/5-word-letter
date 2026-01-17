"use client";

import Link from "next/link";
import { Search, Menu, X, Zap, Sun, Moon, ArrowRight, Ghost } from "lucide-react";
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
            <nav className={cn(
                "fixed top-6 left-0 right-0 z-50 transition-all duration-500 flex justify-center px-4",
                isScrolled ? "top-4" : "top-8"
            )}>
                <div className={cn(
                    "flex items-center justify-between w-full max-w-5xl px-8 py-4 transition-all duration-500",
                    isScrolled
                        ? "bg-white/40 dark:bg-black/40 backdrop-blur-2xl rounded-full border border-white/20 dark:border-white/10 shadow-[0_8px_32px_rgba(0,242,255,0.1)]"
                        : "bg-transparent border-transparent"
                )}>
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-purple-600 rounded-full flex items-center justify-center p-0.5 shadow-lg shadow-cyan-500/20 group-hover:rotate-[360deg] transition-transform duration-700">
                            <div className="w-full h-full bg-white dark:bg-black rounded-full flex items-center justify-center">
                                <Zap className="w-5 h-5 text-cyan-500 fill-current" />
                            </div>
                        </div>
                        <span className="text-2xl font-heading font-black tracking-tighter uppercase italic">
                            NOVA<span className="text-cyan-500">_</span>5
                        </span>
                    </Link>

                    {/* Links */}
                    <div className="hidden md:flex items-center gap-10">
                        {["Explore", "Journal", "About"].map((link) => (
                            <Link
                                key={link}
                                href={link === 'Explore' ? '/list/5' : `/${link.toLowerCase()}`}
                                className="text-xs font-black uppercase tracking-[0.2em] text-zinc-500 hover:text-cyan-500 transition-colors"
                            >
                                {link}
                            </Link>
                        ))}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setIsSearchOpen(true)}
                            className="p-3 bg-zinc-100 dark:bg-zinc-800/50 rounded-full text-zinc-500 hover:text-cyan-500 transition-all"
                        >
                            <Search className="w-4 h-4" />
                        </button>

                        <button
                            onClick={toggleTheme}
                            className="p-3 bg-zinc-100 dark:bg-zinc-800/50 rounded-full text-zinc-500 hover:text-cyan-500 transition-all"
                        >
                            {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
                        </button>

                        <button
                            className="md:hidden p-3 text-zinc-500"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            <Menu className="w-6 h-6" />
                        </button>

                        <Link
                            href="/list/5"
                            className="hidden sm:flex group items-center gap-3 bg-black dark:bg-white text-white dark:text-black px-8 py-3.5 rounded-full font-black text-[10px] uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl shadow-cyan-500/10"
                        >
                            SYNC ARCHIVE <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Futuristic Search Overlay */}
            <AnimatePresence>
                {isSearchOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-3xl flex items-center justify-center p-6"
                    >
                        <button onClick={() => setIsSearchOpen(false)} className="absolute top-10 right-10 p-4 bg-white/10 rounded-full text-white hover:rotate-90 transition-all">
                            <X className="w-8 h-8" />
                        </button>

                        <div className="w-full max-w-4xl text-center">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="mb-10 text-cyan-500 font-mono text-sm tracking-[0.5em] uppercase"
                            >
                                [ Initializing Linguistic Search... ]
                            </motion.div>
                            <form onSubmit={handleSearch} className="relative group">
                                <input
                                    autoFocus
                                    type="text"
                                    placeholder="TYPE COMMAND_WORD..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value.toUpperCase())}
                                    className="w-full bg-transparent border-b-2 border-zinc-800 focus:border-cyan-500 py-10 text-4xl md:text-8xl font-heading font-black text-white outline-none placeholder:text-zinc-900 transition-all text-center tracking-tighter"
                                />
                                <div className="mt-12 flex justify-center gap-6">
                                    <button className="nova-button text-black uppercase text-xs tracking-widest">Execute Search_</button>
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
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        className="fixed inset-0 z-[60] bg-white dark:bg-black p-10 flex flex-col justify-center gap-12"
                    >
                        <button onClick={() => setMobileMenuOpen(false)} className="absolute top-10 right-10"><X className="w-10 h-10" /></button>
                        {["Explore", "Journal", "About", "Contact"].map((link) => (
                            <Link
                                key={link}
                                href={link === 'Explore' ? '/list/5' : `/${link.toLowerCase()}`}
                                onClick={() => setMobileMenuOpen(false)}
                                className="text-6xl font-heading font-black tracking-tighter uppercase text-zinc-900 dark:text-white hover:text-cyan-500 transition-colors"
                            >
                                {link}
                            </Link>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
