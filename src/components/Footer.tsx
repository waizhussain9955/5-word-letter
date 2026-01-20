import Link from "next/link";
import { Zap } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-white dark:bg-slate-950 border-t-2 border-slate-200 dark:border-slate-800 py-20 px-6">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-20">
                    <div className="md:col-span-5">
                        <Link href="/" className="flex items-center gap-3 mb-8 group">
                            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white">
                                <Zap className="w-5 h-5 fill-current" />
                            </div>
                            <span className="font-heading font-black text-2xl tracking-tighter text-slate-900 dark:text-slate-300 uppercase italic">
                                Word<span className="text-blue-600">Archive</span>
                            </span>
                        </Link>
                        <p className="text-slate-500 font-bold text-sm max-w-sm leading-loose uppercase tracking-widest opacity-80">
                            The definitive linguistic index for digital creators, gamers, and scholars. Precision data, instantaneous results.
                        </p>
                    </div>

                    <div className="md:col-span-2">
                        <h4 className="font-black text-[10px] uppercase tracking-[0.3em] text-blue-600 mb-8">Indices</h4>
                        <ul className="space-y-4">
                            {[3, 4, 5, 6, 7].map(n => (
                                <li key={n}><Link href={`/list/${n}`} className="text-slate-600 dark:text-slate-400 hover:text-blue-600 transition-colors font-bold text-sm uppercase tracking-widest">{n} Letters</Link></li>
                            ))}
                        </ul>
                    </div>

                    <div className="md:col-span-3">
                        <h4 className="font-black text-[10px] uppercase tracking-[0.3em] text-blue-600 mb-8">Navigation</h4>
                        <ul className="space-y-4">
                            {['About Us', 'Contact', 'Journal', 'Privacy Policy'].map(item => (
                                <li key={item}><Link href={`/${item.toLowerCase().replace(' ', '-')}`} className="text-slate-600 dark:text-slate-400 hover:text-blue-600 transition-colors font-bold text-sm uppercase tracking-widest">{item}</Link></li>
                            ))}
                        </ul>
                    </div>

                    <div className="md:col-span-2">
                        <h4 className="font-black text-[10px] uppercase tracking-[0.3em] text-blue-600 mb-8">System</h4>
                        <div className="flex items-center gap-2 text-green-500 font-black text-[10px] uppercase tracking-widest">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                            Operational
                        </div>
                    </div>
                </div>

                <div className="pt-10 border-t-2 border-slate-100 dark:border-slate-900 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">
                    <p>© 2026 5WORD ARCHIVE NODE_01.</p>
                    <p className="text-blue-600">Linguistic Integrity Verified</p>
                </div>
            </div>
        </footer>
    );
}
