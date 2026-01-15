"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Clock, User } from "lucide-react";

const articles = [
    {
        slug: "mastering-wordle",
        title: "Mastering Word Games: The 5-Letter Strategy",
        content: `
            Word games like Wordle have taken the world by storm. But how do you go from guessing randomly to consistent 3-turn wins?
            
            The secret lies in letter frequency and entropy. Words like 'ADIEU' or 'AUDIO' are popular because they eliminate vowels quickly. However, mathematicians suggest that 'CRANE' or 'SLATE' might actually be superior starting words due to their common consonant combinations.
            
            By using Lumina's advanced filtering, you can narrow down thousands of possibilities in milliseconds. If you know the word starts with 'B' and ends with 'H', and you've excluded 'O' and 'A', our engine instantly suggests 'BRUSH', 'BIRCH', or 'BENCH'. Consistently using these data-driven approaches is what separates the masters from the amateurs.
        `,
        date: "Jan 16, 2026",
        author: "Alex Rivera",
        readTime: "5 min read",
        image: "/images/blog/blog_article_wordle_tips_1768520559734.png"
    },
    {
        slug: "linguistics-evolution",
        title: "The Evolution of the English Language",
        content: `
            Language is a living breathing thing. Every year, hundreds of new words are added to major dictionaries, while others fall into obsolescence.
            
            The trend in modern English is leaning towards 'compression'. Digital communication has prioritized short, punchy 3 to 5-letter words that convey complex emotions. Consider how 'LOL' or 'VIBE' have transitioned from slang to structurally significant vocabulary.
            
            At Lumina, we track these shifts. Our 'Scholar Tier' lists are constantly updated to reflect both classic literary standards and modern lexical innovations. Understanding the history of the words we use daily helps us communicate with more precision and empathy.
        `,
        date: "Jan 14, 2026",
        author: "Dr. Sarah Chen",
        readTime: "8 min read",
        image: "/images/blog/blog_article_linguistics_evolution_1768520574105.png"
    }
];

export default function BlogPage() {
    return (
        <div className="pt-32 pb-24 px-6 min-h-screen relative">
            <div className="max-w-7xl mx-auto">
                <header className="text-center mb-24">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-6xl md:text-8xl font-black tracking-tighter mb-6 text-gray-900 dark:text-white"
                    >
                        The <span className="text-gradient">Journal.</span>
                    </motion.h1>
                    <p className="text-gray-500 font-medium max-w-2xl mx-auto text-lg">
                        Deep dives into linguistics, strategy, and the future of communication.
                    </p>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    {articles.map((post, i) => (
                        <motion.article
                            key={post.slug}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="premium-card group cursor-pointer overflow-hidden flex flex-col"
                        >
                            <div className="relative aspect-[16/10] overflow-hidden">
                                <img
                                    src={post.image}
                                    alt={post.title}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            </div>

                            <div className="p-10 flex-grow flex flex-col">
                                <div className="flex items-center gap-6 text-[10px] font-black uppercase tracking-widest text-indigo-600 dark:text-indigo-400 mb-6 font-mono">
                                    <span className="flex items-center gap-1.5"><Clock className="w-3 h-3" /> {post.readTime}</span>
                                    <span className="flex items-center gap-1.5"><User className="w-3 h-3" /> {post.author}</span>
                                </div>

                                <h2 className="text-3xl font-black tracking-tight mb-6 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                                    {post.title}
                                </h2>

                                <p className="text-gray-500 dark:text-zinc-400 leading-relaxed font-medium mb-8 line-clamp-3">
                                    {post.content}
                                </p>

                                <div className="mt-auto flex items-center justify-between pt-8 border-t border-gray-100 dark:border-zinc-800">
                                    <span className="text-xs font-bold text-gray-400">{post.date}</span>
                                    <Link href={`/blog/${post.slug}`} className="flex items-center gap-2 text-sm font-black text-gray-900 dark:text-white group-hover:translate-x-2 transition-transform">
                                        Read Article <ArrowLeft className="w-4 h-4 rotate-180" />
                                    </Link>
                                </div>
                            </div>
                        </motion.article>
                    ))}
                </div>
            </div>
        </div>
    );
}
