const blogPosts = [
    {
        title: "Mastering Word Games: Tips and Tricks",
        excerpt: "Learn how to use 5-letter word lists to dominate your daily word challenges.",
        date: "Jan 15, 2026",
        category: "Guides"
    },
    {
        title: "The Evolution of the English Language",
        excerpt: "How seven-letter words became the cornerstone of modern descriptive English.",
        date: "Jan 12, 2026",
        category: "Linguistics"
    },
    {
        title: "Why Minimalist UI Matters in Dictionary Apps",
        excerpt: "Exploring the design philosophy behind Lumina's premiun interface.",
        date: "Jan 10, 2026",
        category: "Design"
    }
];

export default function BlogPage() {
    return (
        <div className="pt-32 pb-24 px-6 min-h-screen">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-20">
                    <h1 className="text-5xl font-black mb-4 text-gradient">Lumina Blog</h1>
                    <p className="text-gray-500">Insights into language, design, and word games.</p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {blogPosts.map((post, i) => (
                        <div key={i} className="group cursor-pointer">
                            <div className="aspect-video bg-gray-100 dark:bg-gray-900 rounded-[2rem] mb-6 overflow-hidden border border-gray-100 dark:border-gray-800">
                                <div className="w-full h-full bg-gradient-to-br from-indigo-500/10 to-purple-500/10 group-hover:scale-110 transition-transform duration-500" />
                            </div>
                            <div className="px-2">
                                <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 mb-2 block">{post.category}</span>
                                <h3 className="text-2xl font-bold mb-3 group-hover:text-indigo-600 transition-colors leading-tight">{post.title}</h3>
                                <p className="text-gray-500 text-sm mb-4 leading-relaxed">{post.excerpt}</p>
                                <span className="text-xs text-gray-400 font-medium">{post.date}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
