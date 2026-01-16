import Link from "next/link";
import { ArrowUpRight, Github, Twitter, Instagram } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-black text-white pt-40 pb-20 px-6 border-t border-zinc-900 overflow-hidden relative">
            {/* Massive Background Text */}
            <div className="absolute top-0 right-0 pointer-events-none select-none">
                <span className="text-[300px] font-heading font-black opacity-[0.02] leading-none -mr-40 block">5-LETTER</span>
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 mb-40">
                    <div className="lg:col-span-6">
                        <Link href="/" className="inline-block mb-12">
                            <span className="text-4xl font-heading font-black tracking-tighter uppercase border-b-8 border-amber-500 pb-2">5-Letter Word.</span>
                        </Link>
                        <p className="text-zinc-500 text-xl font-medium leading-relaxed max-w-md mb-12">
                            The internet's most sophisticated linguistic archive. Providing precision word discovery for institutional and creative applications.
                        </p>
                        <div className="flex gap-12 font-heading font-black text-xs uppercase tracking-widest">
                            <Link href="#" className="hover:text-amber-500 transition-colors">Twitter</Link>
                            <Link href="#" className="hover:text-amber-500 transition-colors">GitHub</Link>
                            <Link href="#" className="hover:text-amber-500 transition-colors">Archive_Sync</Link>
                        </div>
                    </div>

                    <div className="lg:col-span-6 grid grid-cols-2 md:grid-cols-3 gap-12">
                        <div className="space-y-10">
                            <h4 className="text-xs font-black text-amber-500 uppercase tracking-widest">ARCHIVE_INDEX</h4>
                            <ul className="space-y-6 font-heading font-black text-sm uppercase">
                                {[3, 5, 7].map((n) => (
                                    <li key={n}><Link href={`/list/${n}`} className="hover:text-amber-500 transition-colors">Length_{n}</Link></li>
                                ))}
                            </ul>
                        </div>
                        <div className="space-y-10">
                            <h4 className="text-xs font-black text-amber-500 uppercase tracking-widest">PLATFORM_HUB</h4>
                            <ul className="space-y-6 font-heading font-black text-sm uppercase">
                                <li><Link href="/blog" className="hover:text-amber-500 transition-colors">Journal</Link></li>
                                <li><Link href="/about-us" className="hover:text-amber-500 transition-colors">Identity</Link></li>
                                <li><Link href="/contact" className="hover:text-amber-500 transition-colors">Terminal</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="pt-20 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-10">
                    <div className="flex items-center gap-6">
                        <span className="text-[10px] font-black tracking-[0.6em] text-zinc-700 uppercase">System Integrity: Nominal</span>
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    </div>
                    <div className="text-[10px] font-black text-zinc-700 uppercase tracking-[0.4em]">
                        © 2026 ARCHIVE_SYSTEMS. ALL_PROTOCOL_RESERVED.
                    </div>
                </div>
            </div>
        </footer>
    );
}
