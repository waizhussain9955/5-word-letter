import Link from "next/link";
import { BookOpen } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-white dark:bg-black border-t border-gray-200 dark:border-gray-800 py-12 px-6">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 text-center md:text-left">
                <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-center md:justify-start gap-2">
                        <BookOpen className="w-6 h-6 text-indigo-600" />
                        <span className="text-2xl font-bold text-gradient">Lumina</span>
                    </div>
                    <p className="text-sm text-gray-500 max-w-xs mx-auto md:mx-0">
                        Premium word discovery platform for professionals, writers, and puzzle enthusiasts. Simple, fast, and SEO-first.
                    </p>
                </div>

                <div>
                    <h4 className="font-bold mb-4">Lists</h4>
                    <ul className="space-y-2 text-sm text-gray-400">
                        <li><Link href="/list/3">3 Letter Words</Link></li>
                        <li><Link href="/list/4">4 Letter Words</Link></li>
                        <li><Link href="/list/5">5 Letter Words</Link></li>
                        <li><Link href="/list/6">6 Letter Words</Link></li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-bold mb-4">Resources</h4>
                    <ul className="space-y-2 text-sm text-gray-400">
                        <li><Link href="#">Dictionary API</Link></li>
                        <li><Link href="#">Wordle Helper</Link></li>
                        <li><Link href="#">Crossword Solver</Link></li>
                        <li><Link href="#">Blog</Link></li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-bold mb-4">Company</h4>
                    <ul className="space-y-2 text-sm text-gray-400">
                        <li><Link href="#">About Us</Link></li>
                        <li><Link href="#">Privacy Policy</Link></li>
                        <li><Link href="#">Terms of Service</Link></li>
                        <li><Link href="#">Contact</Link></li>
                    </ul>
                </div>
            </div>
            <div className="max-w-7xl mx-auto border-t border-gray-100 dark:border-gray-900 mt-12 pt-8 text-center text-xs text-gray-400">
                &copy; {new Date().getFullYear()} Lumina. All rights reserved. Built for accuracy and design.
            </div>
        </footer>
    );
}
