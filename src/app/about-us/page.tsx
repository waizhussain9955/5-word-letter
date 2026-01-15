import Link from "next/link";

export default function AboutPage() {
    return (
        <div className="pt-32 pb-24 px-6 min-h-screen">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-5xl font-black mb-8 text-gradient">About Lumina</h1>
                <div className="prose prose-lg dark:prose-invert max-w-none space-y-6 text-gray-600 dark:text-gray-400">
                    <p>
                        Lumina is a premium word discovery platform designed for writers, puzzle enthusiasts,
                        and vocabulary builders. Our mission is to provide the most elegant and efficient
                        way to explore the English language.
                    </p>
                    <p>
                        Built with a focus on speed, design, and user experience, Lumina offers
                        instant filtering capabilities and a curated database of thousands of words.
                        Whether you're looking for the perfect 5-letter word for your favorite game
                        or expanding your academic vocabulary, we've got you covered.
                    </p>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-12">Our Philosophy</h2>
                    <p>
                        We believe that software should be beautiful, functional, and lightning-fast.
                        Every pixel in Lumina is carefully considered to ensure a premium experience
                        that respects your time and enhances your creativity.
                    </p>
                </div>
            </div>
        </div>
    );
}
