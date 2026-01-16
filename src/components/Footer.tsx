import Link from "next/link";
import { Command, Mail, Globe, MapPin } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-900 pt-24 pb-12 px-6">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
                    <div className="space-y-6">
                        <Link href="/" className="flex items-center gap-2 group">
                            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white shadow-lg shadow-blue-500/10">
                                <Command className="w-5 h-5" />
                            </div>
                            <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                                5-Letter<span className="text-blue-600">Word</span>
                            </span>
                        </Link>
                        <p className="text-slate-500 font-medium leading-relaxed">
                            A precision-engineered dictionary for the modern web. Helping you find the exact words for any use case.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-bold mb-6 text-slate-900 dark:text-white uppercase text-xs tracking-widest">Navigation</h4>
                        <ul className="space-y-4">
                            {["Home", "Blog", "About Us", "Contact"].map((l) => (
                                <li key={l}>
                                    <Link href={l === 'Home' ? '/' : `/${l.toLowerCase().replace(' ', '-')}`} className="text-slate-500 hover:text-blue-600 transition-colors font-medium">
                                        {l}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold mb-6 text-slate-900 dark:text-white uppercase text-xs tracking-widest">Connect</h4>
                        <ul className="space-y-4">
                            <li className="flex items-center gap-3 text-slate-500 font-medium">
                                <Mail className="w-5 h-5" /> contact@5letterword.com
                            </li>
                            <li className="flex items-center gap-3 text-slate-500 font-medium">
                                <Globe className="w-5 h-5" /> Global Access
                            </li>
                            <li className="flex items-center gap-3 text-slate-500 font-medium">
                                <MapPin className="w-5 h-5" /> Digital-First
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold mb-6 text-slate-900 dark:text-white uppercase text-xs tracking-widest">Legal</h4>
                        <ul className="space-y-4">
                            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((l) => (
                                <li key={l}>
                                    <Link href="/privacy-policy" className="text-slate-500 hover:text-blue-600 transition-colors font-medium">
                                        {l}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="pt-12 border-t border-slate-200 dark:border-slate-900 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-slate-500 text-sm font-medium">
                        © 2026 5-LetterWord. All rights reserved. Built with precision.
                    </p>
                    <div className="flex gap-8">
                        {["Twitter", "LinkedIn", "GitHub"].map((s) => (
                            <Link key={s} href="#" className="text-slate-400 hover:text-blue-600 transition-colors text-sm font-bold uppercase tracking-widest">
                                {s}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}
