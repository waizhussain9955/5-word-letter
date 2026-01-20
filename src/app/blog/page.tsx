"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Clock, User, Filter, Sparkles } from "lucide-react";

const articles = [
    {
        slug: "mastering-wordle",
        title: "Mastering Word Games: The 5-Letter Strategy",
        content: `
            Word games like Wordle have taken the world by storm. But how do you go from guessing randomly to consistent 3-turn wins?
            
            The secret lies in letter frequency and entropy. Words like 'ADIEU' or 'AUDIO' are popular because they eliminate vowels quickly. However, mathematicians suggest that 'CRANE' or 'SLATE' might actually be superior starting words due to their common consonant combinations.
            
            By using our advanced filtering, you can narrow down thousands of possibilities in milliseconds. If you know the word starts with 'B' and ends with 'H', and you've excluded 'O' and 'A', our engine instantly suggests 'BRUSH', 'BIRCH', or 'BENCH'. Consistently using these data-driven approaches is what separates the masters from the amateurs.
        `,
        date: "Jan 16, 2026",
        author: "Alex Rivera",
        readTime: "5 min read",
        image: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?q=80&w=2071&auto=format&fit=crop"
    },
    {
        slug: "linguistics-evolution",
        title: "The Evolution of the English Language",
        content: `
            Language is a living breathing thing. Every year, hundreds of new words are added to major dictionaries, while others fall into obsolescence.
            
            The trend in modern English is leaning towards 'compression'. Digital communication has prioritized short, punchy 3 to 5-letter words that convey complex emotions. Consider how 'LOL' or 'VIBE' have transitioned from slang to structurally significant vocabulary.
            
            At 5WordArchive, we track these shifts. Our 'Scholar Tier' lists are constantly updated to reflect both classic literary standards and modern lexical innovations. Understanding the history of the words we use daily helps us communicate with more precision and empathy.
        `,
        date: "Jan 14, 2026",
        author: "Dr. Sarah Chen",
        readTime: "8 min read",
        image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=1973&auto=format&fit=crop"
    }
];

export default function BlogPage() {
    return (
        <div className="pt-40 pb-32 px-6 min-h-screen">
            <div className="max-w-7xl mx-auto">
                <header className="mb-24 flex flex-col items-center text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-900/20 px-4 py-2 rounded-full text-blue-600 dark:text-blue-400 text-xs font-black mb-10 border border-blue-100 dark:border-blue-800"
                    >
                        <Sparkles className="w-4 h-4 fill-current" />
                        <span>LINGUISTIC INTELLIGENCE</span>
                    </motion.div>
                    <h1 className="text-6xl md:text-9xl font-black tracking-tighter text-slate-500 dark:text-slate-400 mb-8 uppercase leading-[0.8]">
                        The <span className="text-blue-600">Journal.</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-slate-500 font-bold max-w-2xl uppercase text-[10px] tracking-[0.4em]">
                        Diving deep into strategy, entropy, and the atlas of communication.
                    </p>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    {articles.map((post, i) => (
                        <motion.article
                            key={post.slug}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="group p-8 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[3rem] hover:border-blue-500 hover:shadow-2xl transition-all duration-500 overflow-hidden"
                        >
                            <div className="relative aspect-[16/9] overflow-hidden rounded-[2rem] mb-10 shadow-lg">
                                <img
                                    src={post.image}
                                    alt={post.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                />
                                <div className="absolute top-6 left-6 flex gap-3">
                                    <span className="px-4 py-2 bg-white/90 dark:bg-black/90 backdrop-blur-md rounded-full text-[9px] font-black uppercase tracking-widest flex items-center gap-2">
                                        <Clock className="w-3 h-3 text-blue-600" /> {post.readTime}
                                    </span>
                                </div>
                            </div>

                            <div className="px-4">
                                <h2 className="text-4xl font-black tracking-tighter mb-6 group-hover:text-blue-600 transition-colors uppercase leading-none">
                                    {post.title}
                                </h2>

                                <p className="text-slate-500 dark:text-slate-400 font-bold leading-relaxed mb-10 line-clamp-3">
                                    {post.content}
                                </p>

                                <div className="flex items-center justify-between pt-8 border-t border-slate-50 dark:border-slate-800">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-[10px] font-black">{post.author[0]}</div>
                                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{post.author}</span>
                                    </div>
                                    <Link href={`/blog/${post.slug}`} className="flex items-center gap-3 text-xs font-black uppercase tracking-widest text-blue-600 group-hover:gap-5 transition-all">
                                        Open Entry <ArrowLeft className="w-4 h-4 rotate-180" />
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
