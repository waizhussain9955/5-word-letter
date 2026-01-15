"use client";

import Link from "next/link";
import { Search, Menu, X, BookOpen, ChevronDown, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isListsOpen, setIsListsOpen] = useState(false);

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
        { name: "About Us", href: "/about-us" },
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
                    ? "bg-white/80 dark:bg-black/80 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.05)] border-b border-gray-200/50 dark:border-gray-800/50 py-3"
                    : "bg-transparent"
            )}
        >
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2.5 group">
                    <div className="relative">
                        <div className="absolute -inset-1 bg-gradient-to-tr from-indigo-600 to-purple-600 rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-300"></div>
                        <div className="relative bg-indigo-600 p-2 rounded-xl group-hover:rotate-6 transition-transform duration-300 shadow-lg shadow-indigo-600/20">
                            <BookOpen className="w-5 h-5 text-white" />
                        </div>
                    </div>
                    <span className="text-2xl font-black tracking-tight text-gray-900 dark:text-white">Lumina</span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-1">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="px-4 py-2 text-sm font-semibold text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-white transition-all rounded-xl hover:bg-gray-50 dark:hover:bg-gray-900"
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
                        <button className="flex items-center gap-1 px-4 py-2 text-sm font-semibold text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-white transition-all rounded-xl hover:bg-gray-50 dark:hover:bg-gray-900">
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
                                    <div className="bg-white dark:bg-black border border-gray-100 dark:border-gray-900 shadow-2xl rounded-3xl p-4 min-w-[240px]">
                                        <div className="grid gap-1">
                                            {wordLists.map((item) => (
                                                <Link
                                                    key={item.name}
                                                    href={item.href}
                                                    className="flex flex-col gap-0.5 p-3 rounded-2xl hover:bg-indigo-50 dark:hover:bg-indigo-900/20 group/item transition-colors"
                                                >
                                                    <span className="text-sm font-bold text-gray-900 dark:text-white group-hover/item:text-indigo-600 transition-colors">{item.name}</span>
                                                    <span className="text-xs text-gray-400">{item.desc}</span>
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
                <div className="flex items-center gap-3">
                    <button className="p-2.5 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900 rounded-xl transition-colors">
                        <Search className="w-5 h-5" />
                    </button>

                    <Link
                        href="/list/5"
                        className="hidden sm:flex items-center gap-2 bg-gray-900 dark:bg-white text-white dark:text-black px-5 py-2.5 rounded-xl font-bold text-sm hover:scale-105 active:scale-95 transition-all shadow-xl shadow-gray-200 dark:shadow-none"
                    >
                        <Sparkles className="w-4 h-4" />
                        Try Generator
                    </Link>

                    <button
                        className="md:hidden p-2.5 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900 rounded-xl transition-colors"
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
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="md:hidden overflow-hidden bg-white dark:bg-black border-t border-gray-100 dark:border-gray-900 mt-4 -mx-6 px-6 pb-8"
                    >
                        <div className="flex flex-col gap-6 pt-8">
                            <div className="grid gap-1">
                                <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-4 mb-2">Main Navigation</span>
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.name}
                                        href={link.href}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="text-lg font-bold p-4 rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-900 text-gray-900 dark:text-white"
                                    >
                                        {link.name}
                                    </Link>
                                ))}
                            </div>

                            <div className="grid gap-1">
                                <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-4 mb-2">Word Databases</span>
                                <div className="grid grid-cols-2 gap-2">
                                    {wordLists.map((link) => (
                                        <Link
                                            key={link.name}
                                            href={link.href}
                                            onClick={() => setMobileMenuOpen(false)}
                                            className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-900 text-sm font-bold text-gray-900 dark:text-white"
                                        >
                                            {link.name}
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
