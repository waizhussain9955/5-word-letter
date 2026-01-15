import Link from "next/link";
import { BookOpen, Twitter, Github, Instagram, ArrowRight } from "lucide-react";

export default function Footer() {
    return (
        <footer className="relative bg-white dark:bg-[#0b0c10] pt-24 pb-12 px-6 border-t border-gray-100 dark:border-gray-900 overflow-hidden">
            {/* Decorative element */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/5 blur-[120px] rounded-full -mr-48 -mt-48" />

            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-20">
                    <div className="lg:col-span-5 flex flex-col gap-6">
                        <Link href="/" className="flex items-center gap-2.5">
                            <div className="bg-indigo-600 p-2 rounded-xl shadow-lg shadow-indigo-600/20">
                                <BookOpen className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-2xl font-black tracking-tight text-gray-900 dark:text-white">Lumina</span>
                        </Link>
                        <p className="text-gray-500 dark:text-gray-400 max-w-sm leading-relaxed">
                            Lumina is the world's most advanced word discovery platform.
                            Built for professionals, writers, and language enthusiasts who
                            demand speed, accuracy, and premium design.
                        </p>
                        <div className="flex items-center gap-4">
                            {[Twitter, Github, Instagram].map((Icon, i) => (
                                <Link key={i} href="#" className="p-2.5 rounded-xl border border-gray-100 dark:border-gray-800 text-gray-500 hover:text-indigo-600 hover:border-indigo-600 transition-all">
                                    <Icon className="w-5 h-5" />
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-12">
                        <div>
                            <h4 className="font-black text-xs uppercase tracking-widest text-gray-400 mb-6">Databases</h4>
                            <ul className="space-y-4">
                                {[3, 4, 5, 6, 7].map((num) => (
                                    <li key={num}>
                                        <Link href={`/list/${num}`} className="text-gray-600 dark:text-gray-400 font-bold hover:text-indigo-600 transition-colors text-sm">
                                            {num} Letter Words
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-black text-xs uppercase tracking-widest text-gray-400 mb-6">Platform</h4>
                            <ul className="space-y-4">
                                {[
                                    { name: "Blog", href: "/blog" },
                                    { name: "About Us", href: "/about-us" },
                                    { name: "Contact", href: "/contact" },
                                    { name: "Privacy Policy", href: "/privacy-policy" },
                                    { name: "Admin Center", href: "/admin" }
                                ].map((item) => (
                                    <li key={item.name}>
                                        <Link href={item.href} className="text-gray-600 dark:text-gray-400 font-bold hover:text-indigo-600 transition-colors text-sm">
                                            {item.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="col-span-2 md:col-span-1">
                            <h4 className="font-black text-xs uppercase tracking-widest text-gray-400 mb-6">Newsletter</h4>
                            <p className="text-xs text-gray-500 mb-4 font-medium leading-relaxed">Get curated word lists and linguistic insights weekly.</p>
                            <div className="relative group">
                                <input
                                    type="email"
                                    placeholder="your@email.com"
                                    className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl px-4 py-3 text-xs outline-none focus:ring-2 ring-indigo-500 transition-all"
                                />
                                <button className="absolute right-1 top-1 bottom-1 px-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                                    <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="pt-8 border-t border-gray-100 dark:border-gray-900 flex flex-col md:flex-row items-center justify-between gap-6">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
                        &copy; {new Date().getFullYear()} Lumina Platforms Inc. All Rights Reserved.
                    </p>
                    <div className="flex items-center gap-6">
                        <Link href="#" className="text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-indigo-600">Terms</Link>
                        <Link href="/privacy-policy" className="text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-indigo-600">Privacy</Link>
                        <Link href="#" className="text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-indigo-600">Sitemap</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
