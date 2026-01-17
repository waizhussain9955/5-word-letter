import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-16 px-4">
            <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-12">
                    <div className="col-span-2">
                        <Link href="/" className="font-heading font-extrabold text-2xl tracking-tight text-blue-600 mb-6 block">
                            5LetterWord.
                        </Link>
                        <p className="text-slate-500 font-medium max-w-xs leading-relaxed">
                            The ultimate tool for gamers and writers. Fast, free, and incredibly simple to use.
                        </p>
                    </div>
                    <div>
                        <h4 className="font-bold text-slate-900 dark:text-white mb-6">Archive</h4>
                        <ul className="space-y-4">
                            {[3, 4, 5, 6, 7].map(n => (
                                <li key={n}><Link href={`/list/${n}`} className="text-slate-500 hover:text-blue-600 transition-colors font-medium">{n} Letter Words</Link></li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold text-slate-900 dark:text-white mb-6">Support</h4>
                        <ul className="space-y-4 font-medium">
                            <li><Link href="/about-us" className="text-slate-500 hover:text-blue-600 transition-colors">About Us</Link></li>
                            <li><Link href="/contact" className="text-slate-500 hover:text-blue-600 transition-colors">Contact</Link></li>
                            <li><Link href="/privacy-policy" className="text-slate-500 hover:text-blue-600 transition-colors">Privacy Policy</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="pt-12 border-t border-slate-200 dark:border-slate-800 flex justify-between items-center text-sm font-medium text-slate-400">
                    <p>© 2026 5LetterWord Archive.</p>
                    <p>Built for Speed.</p>
                </div>
            </div>
        </footer>
    );
}
