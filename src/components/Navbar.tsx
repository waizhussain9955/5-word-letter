"use client";

import Link from "next/link";
import { Search, Menu, X, Sun, Moon } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/app/ThemeProvider";
import { useRouter } from "next/navigation";

export default function Navbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const { theme, toggleTheme } = useTheme();
    const router = useRouter();

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (!searchQuery) return;
        const length = searchQuery.length;
        // Redirect to appropriate list if length is between 3-7, else default to 5
        const targetLength = (length >= 3 && length <= 7) ? length : 5;
        router.push(`/list/${targetLength}?search=${searchQuery}`);
        setSearchQuery("");
        setMobileMenuOpen(false);
    };

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
            <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
                {/* Brand */}
                <Link href="/" className="font-heading font-extrabold text-xl tracking-tight text-blue-600">
                    5LetterWord.
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-6">
                    {[3, 4, 5, 6, 7].map((n) => (
                        <Link
                            key={n}
                            href={`/list/${n}`}
                            className="text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-blue-600 transition-colors"
                        >
                            {n} Letters
                        </Link>
                    ))}
                </nav>

                {/* Desktop Actions */}
                <div className="hidden md:flex items-center gap-4">
                    <form onSubmit={handleSearch} className="relative">
                        <input
                            type="text"
                            placeholder="Quick search..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="bg-slate-100 dark:bg-slate-800 border-none rounded-full px-4 py-1.5 text-sm w-44 focus:w-64 transition-all outline-none text-slate-900 dark:text-white"
                        />
                        <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    </form>

                    <button
                        onClick={toggleTheme}
                        className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
                    >
                        {theme === 'light' ? <Moon className="w-5 h-5 text-slate-600" /> : <Sun className="w-5 h-5 text-slate-300" />}
                    </button>
                </div>

                {/* Mobile Toggle */}
                <div className="flex items-center gap-2 md:hidden">
                    <button
                        onClick={toggleTheme}
                        className="p-2"
                    >
                        {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                    </button>
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="p-2"
                    >
                        {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="md:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 p-4">
                    <form onSubmit={handleSearch} className="relative mb-6">
                        <input
                            type="text"
                            placeholder="Quick search..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-slate-100 dark:bg-slate-800 border-none rounded-xl px-4 py-3 text-base outline-none text-slate-900 dark:text-white"
                        />
                        <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    </form>
                    <div className="flex flex-col gap-4">
                        {[3, 4, 5, 6, 7].map((n) => (
                            <Link
                                key={n}
                                href={`/list/${n}`}
                                onClick={() => setMobileMenuOpen(false)}
                                className="text-lg font-bold text-slate-700 dark:text-slate-200"
                            >
                                {n} Letter Words
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </header>
    );
}
