"use client";

import Link from "next/link";
import { Search, Menu, X, Sun, Moon, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/app/ThemeProvider";
import { useRouter } from "next/navigation";

export default function Navbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const { theme, toggleTheme } = useTheme();
    const router = useRouter();

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (!searchQuery) return;
        const length = searchQuery.length;
        // Redirect to appropriate list if length is between 3-7, else default to 5
        const targetLength = (length >= 3 && length <= 7) ? length : 5;
        router.push(`/list/${targetLength}?search=${searchQuery.toLowerCase()}`);
        setSearchQuery("");
        setMobileMenuOpen(false);
        setDropdownOpen(false);
    };

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800">
            <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">

                {/* Brand Logo */}
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-blue-500/20">
                        5
                    </div>
                    <span className="font-heading font-black text-2xl tracking-tighter text-slate-900 dark:text-white">
                        Word<span className="text-blue-600 font-black">Archive</span>
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden lg:flex items-center gap-8">
                    <Link href="/" className="text-sm font-bold text-slate-600 dark:text-slate-400 hover:text-blue-600 transition-colors">
                        Home
                    </Link>

                    {/* Letters Dropdown */}
                    <div className="relative group">
                        <button
                            onMouseEnter={() => setDropdownOpen(true)}
                            className="flex items-center gap-1.5 text-sm font-bold text-slate-600 dark:text-slate-400 hover:text-blue-600 transition-colors"
                        >
                            Dictionaries <ChevronDown className={cn("w-4 h-4 transition-transform", dropdownOpen && "rotate-180")} />
                        </button>

                        <div
                            onMouseLeave={() => setDropdownOpen(false)}
                            className={cn(
                                "absolute top-full left-0 mt-2 w-48 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl p-2 transition-all transform origin-top",
                                dropdownOpen ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
                            )}
                        >
                            {[3, 4, 5, 6, 7].map((n) => (
                                <Link
                                    key={n}
                                    href={`/list/${n}`}
                                    className="block px-4 py-2.5 text-sm font-bold text-slate-600 dark:text-slate-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 rounded-xl transition-all"
                                >
                                    {n} Letter Words
                                </Link>
                            ))}
                        </div>
                    </div>

                    <Link href="/blog" className="text-sm font-bold text-slate-600 dark:text-slate-400 hover:text-blue-600 transition-colors">
                        Journal
                    </Link>
                    <Link href="/about-us" className="text-sm font-bold text-slate-600 dark:text-slate-400 hover:text-blue-600 transition-colors">
                        About
                    </Link>
                    <Link href="/contact" className="text-sm font-bold text-slate-600 dark:text-slate-400 hover:text-blue-600 transition-colors">
                        Contact
                    </Link>
                </nav>

                {/* Actions: Search & Theme */}
                <div className="flex items-center gap-4">
                    <form onSubmit={handleSearch} className="hidden md:flex relative group">
                        <input
                            type="text"
                            placeholder="Find any word..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="bg-slate-100 dark:bg-slate-900 border border-transparent focus:border-blue-500 rounded-2xl px-5 py-2.5 text-sm w-48 focus:w-64 transition-all outline-none font-semibold text-slate-900 dark:text-white"
                        />
                        <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-600">
                            <Search className="w-5 h-5" />
                        </button>
                    </form>

                    <button
                        onClick={toggleTheme}
                        className="p-3 bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-2xl transition-all shadow-sm"
                    >
                        {theme === 'light' ? <Moon className="w-5 h-5 text-slate-600" /> : <Sun className="w-5 h-5 text-slate-300" />}
                    </button>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="lg:hidden p-3 bg-slate-100 dark:bg-slate-900 rounded-2xl"
                    >
                        {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Navigation Overlay */}
            {mobileMenuOpen && (
                <div className="lg:hidden bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 p-6 shadow-2xl animate-in slide-in-from-top duration-300">
                    <form onSubmit={handleSearch} className="relative mb-8">
                        <input
                            type="text"
                            placeholder="Search words..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl px-5 py-4 text-lg outline-none font-bold"
                        />
                        <button type="submit" className="absolute right-5 top-1/2 -translate-y-1/2 text-blue-600">
                            <Search className="w-6 h-6" />
                        </button>
                    </form>

                    <div className="grid grid-cols-1 gap-4">
                        <Link href="/" onClick={() => setMobileMenuOpen(false)} className="text-xl font-bold p-4 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-2xl">Home</Link>
                        <div className="py-2">
                            <div className="text-sm font-black text-slate-400 uppercase tracking-[0.2em] mb-4 px-4">Linguistic Indices</div>
                            <div className="grid grid-cols-2 gap-3">
                                {[3, 4, 5, 6, 7].map((n) => (
                                    <Link
                                        key={n}
                                        href={`/list/${n}`}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="text-lg font-bold p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl text-center border border-slate-100 dark:border-slate-800"
                                    >
                                        L{n}
                                    </Link>
                                ))}
                            </div>
                        </div>
                        <Link href="/blog" onClick={() => setMobileMenuOpen(false)} className="text-xl font-bold p-4 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-2xl">Journal</Link>
                        <Link href="/about-us" onClick={() => setMobileMenuOpen(false)} className="text-xl font-bold p-4 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-2xl">About</Link>
                        <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="text-xl font-bold p-4 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-2xl">Contact</Link>
                    </div>
                </div>
            )}
        </header>
    );
}
