import Link from "next/link";
import { Sparkles, Mail, Globe, Github, Twitter, Instagram } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-zinc-50 dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-900 pt-32 pb-16 px-6">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-20 mb-32">
                    <div className="space-y-8">
                        <Link href="/" className="flex items-center gap-2 group">
                            <div className="w-9 h-9 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-500/10">
                                <Sparkles className="w-5 h-5 fill-current" />
                            </div>
                            <span className="text-xl font-bold tracking-tight">
                                5-Letter<span className="text-indigo-600">Word</span>
                            </span>
                        </Link>
                        <p className="text-zinc-500 font-medium leading-relaxed">
                            Precision linguistic architecture for creators and scholars. The internet's most curated word engine.
                        </p>
                        <div className="flex items-center gap-5">
                            {[Twitter, Instagram, Github].map((Icon, i) => (
                                <Link key={i} href="#" className="p-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 text-zinc-400 hover:text-indigo-600 hover:border-indigo-600 transition-all">
                                    <Icon className="w-5 h-5" />
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h4 className="font-bold mb-8 text-xs tracking-[0.2em] uppercase text-zinc-400">Archival Indices</h4>
                        <ul className="space-y-4">
                            {[3, 4, 5, 6, 7].map((l) => (
                                <li key={l}>
                                    <Link href={`/list/${l}`} className="text-zinc-600 dark:text-zinc-400 hover:text-indigo-600 transition-colors font-semibold text-sm">
                                        Dictionary L{l}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold mb-8 text-xs tracking-[0.2em] uppercase text-zinc-400">Platform</h4>
                        <ul className="space-y-4">
                            {["Journal", "About", "Contact", "Privacy"].map((l) => (
                                <li key={l}>
                                    <Link href={l === 'Privacy' ? '/privacy-policy' : `/${l.toLowerCase()}`} className="text-zinc-600 dark:text-zinc-400 hover:text-indigo-600 transition-colors font-semibold text-sm">
                                        {l}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="space-y-8">
                        <h4 className="font-bold text-xs tracking-[0.2em] uppercase text-zinc-400">Global Connectivity</h4>
                        <p className="text-sm text-zinc-500 font-medium leading-loose">
                            Institutional access or creative inquiries: <br />
                            <span className="text-zinc-900 dark:text-white font-bold">connect@5letterword.com</span>
                        </p>
                        <div className="pt-6 border-t border-zinc-100 dark:border-zinc-900">
                            <div className="flex items-center gap-3">
                                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Network Operational</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="pt-16 border-t border-zinc-200 dark:border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-8">
                    <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest">
                        © 2026 5-LetterWord Syndicate.
                    </p>
                    <div className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-300 dark:text-zinc-700">
                        Designed with Zen Accuracy_
                    </div>
                </div>
            </div>
        </footer>
    );
}
