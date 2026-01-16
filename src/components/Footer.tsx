import Link from "next/link";
import { Sparkles, Twitter, Github, Instagram, ArrowRight } from "lucide-react";

export default function Footer() {
    return (
        <footer className="relative bg-emerald-50 dark:bg-[#020617] pt-32 pb-16 px-6 border-t border-emerald-100 dark:border-emerald-900 overflow-hidden">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/5 blur-[120px] rounded-full -mr-64 -mt-64" />

            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 mb-24">
                    <div className="lg:col-span-5 space-y-8">
                        <Link href="/" className="flex items-center gap-4 group">
                            <div className="bg-emerald-600 p-3 rounded-2xl shadow-2xl shadow-emerald-500/20 group-hover:rotate-12 transition-transform">
                                <Sparkles className="w-6 h-6 text-white" />
                            </div>
                            <span className="text-3xl font-black tracking-tighter text-emerald-950 dark:text-white">5-Letter Word</span>
                        </Link>
                        <p className="text-emerald-800/60 dark:text-emerald-100/40 font-medium text-lg leading-relaxed max-w-sm">
                            The definitive linguistic resource for writers, gamers, and scholars.
                            Crafting precision since 2026.
                        </p>
                        <div className="flex gap-4">
                            {[Twitter, Github, Instagram].map((Icon, i) => (
                                <Link key={i} href="#" className="w-12 h-12 rounded-2xl bg-white dark:bg-slate-900 border border-emerald-100 dark:border-emerald-800 flex items-center justify-center text-emerald-600 hover:bg-emerald-600 hover:text-white transition-all shadow-xl shadow-emerald-500/5">
                                    <Icon className="w-5 h-5" />
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-12">
                        <div className="space-y-8">
                            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-600/50">Core Databases</h4>
                            <ul className="space-y-4">
                                {[3, 4, 5, 6, 7].map((num) => (
                                    <li key={num}>
                                        <Link href={`/list/${num}`} className="text-emerald-950 dark:text-emerald-100 font-black hover:text-emerald-600 transition-colors uppercase text-xs tracking-widest">
                                            {num} Letters
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="space-y-8">
                            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-600/50">Platform</h4>
                            <ul className="space-y-4">
                                {[
                                    { name: "The Journal", href: "/blog" },
                                    { name: "About Us", href: "/about-us" },
                                    { name: "Legal / Privacy", href: "/privacy-policy" },
                                    { name: "Contact Hub", href: "/contact" }
                                ].map((item) => (
                                    <li key={item.name}>
                                        <Link href={item.href} className="text-emerald-950 dark:text-emerald-100 font-black hover:text-emerald-600 transition-colors uppercase text-xs tracking-widest">
                                            {item.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="col-span-2 md:col-span-1 space-y-8">
                            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-600/50">Intelligence</h4>
                            <p className="text-xs font-bold text-emerald-800/40 dark:text-emerald-100/20 leading-relaxed uppercase">Subscribe for high-entropy word drops.</p>
                            <div className="relative group">
                                <input
                                    type="email"
                                    placeholder="HEX@PROTOCOL.COM"
                                    className="w-full bg-white dark:bg-slate-900 border-2 border-emerald-100 dark:border-emerald-800 rounded-2xl px-6 py-4 text-[10px] font-black outline-none focus:border-emerald-500 transition-all uppercase tracking-widest"
                                />
                                <button className="absolute right-2 top-2 bottom-2 px-4 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-colors">
                                    <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="pt-12 border-t border-emerald-100 dark:border-emerald-900 flex flex-col md:flex-row justify-between items-center gap-8">
                    <p className="text-[10px] font-black uppercase tracking-[0.4em] text-emerald-600/30">
                        © 2026 5-LETTER WORD SYSTEMS • ALL RIGHTS RESERVED
                    </p>
                    <div className="flex gap-10">
                        <span className="text-[10px] font-black text-emerald-600/40 uppercase tracking-widest">EN-US</span>
                        <span className="text-[10px] font-black text-emerald-600/40 uppercase tracking-widest">V2.4.0</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
