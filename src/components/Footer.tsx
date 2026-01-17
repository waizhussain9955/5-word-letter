import Link from "next/link";
import { Zap, Github, Twitter, Instagram, ArrowUpRight } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-black text-white pt-60 pb-20 px-6 border-t border-zinc-900 overflow-hidden relative">
            {/* Massive Background Text */}
            <div className="absolute top-0 right-0 pointer-events-none select-none opacity-[0.05]">
                <span className="text-[400px] font-heading font-black leading-none -mr-80 block translate-y-20">NOVA</span>
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 mb-60">
                    <div className="lg:col-span-6">
                        <Link href="/" className="inline-block mb-12">
                            <span className="text-6xl font-heading font-black tracking-tighter uppercase italic border-b-8 border-cyan-500 pb-2">NOVA_5.</span>
                        </Link>
                        <p className="text-zinc-500 text-2xl font-bold leading-relaxed max-w-md mb-16">
                            Architecting the future of linguistic intelligence. Providing precision word discovery for the digital era.
                        </p>
                        <div className="flex gap-10">
                            {[Twitter, Instagram, Github].map((Icon, i) => (
                                <Link key={i} href="#" className="w-16 h-16 rounded-full border border-zinc-800 flex items-center justify-center hover:bg-cyan-500 hover:text-black transition-all hover:border-cyan-500 group">
                                    <Icon className="w-6 h-6 group-hover:scale-125 transition-transform" />
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div className="lg:col-span-6 grid grid-cols-2 md:grid-cols-3 gap-12">
                        <div className="space-y-12">
                            <h4 className="text-[10px] font-black text-cyan-500 uppercase tracking-[0.5em]">SYSTEM_MAP</h4>
                            <ul className="space-y-6 font-heading font-black text-sm uppercase">
                                {["Home", "Blog", "About", "Contact"].map((l) => (
                                    <li key={l}><Link href={l === 'Home' ? '/' : `/${l.toLowerCase()}`} className="hover:text-cyan-500 transition-colors flex items-center gap-2 group">
                                        {l} <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </Link></li>
                                ))}
                            </ul>
                        </div>
                        <div className="space-y-12">
                            <h4 className="text-[10px] font-black text-cyan-500 uppercase tracking-[0.5em]">DATA_REGIONS</h4>
                            <ul className="space-y-6 font-heading font-black text-sm uppercase">
                                {[3, 5, 7].map((n) => (
                                    <li key={n}><Link href={`/list/${n}`} className="hover:text-cyan-500 transition-colors">Archive_L{n}</Link></li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="pt-20 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-12">
                    <div className="flex items-center gap-6">
                        <div className="w-2.5 h-2.5 rounded-full bg-cyan-500 shadow-[0_0_15px_rgba(0,242,255,0.5)] animate-pulse" />
                        <span className="text-[10px] font-black tracking-[0.6em] text-zinc-700 uppercase">System Integrity: Nominal</span>
                    </div>
                    <div className="text-[10px] font-black text-zinc-700 uppercase tracking-[0.5em]">
                        © 2026 NOVA_ARCHIVE_SYSTEMS. ALL_PROTOCOL_RESERVED.
                    </div>
                </div>
            </div>
        </footer>
    );
}
