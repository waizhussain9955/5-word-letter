export default function PrivacyPage() {
    return (
        <div className="pt-32 pb-24 px-6 min-h-screen">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-5xl font-black mb-8 text-gradient">Privacy Policy</h1>
                <div className="prose prose-lg dark:prose-invert max-w-none space-y-6 text-gray-600 dark:text-gray-400">
                    <p className="italic">Last updated: January 16, 2026</p>
                    <p>
                        At Lumina, we take your privacy seriously. This Policy explains how we collect, use,
                        and protect your information when you use our word discovery platform.
                    </p>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-12">1. Data Collection</h2>
                    <p>
                        Lumina is a privacy-first platform. We do not require account creation to browse
                        our word lists. We only collect anonymous usage statistics to improve performance
                        and user experience.
                    </p>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-12">2. Cookies</h2>
                    <p>
                        We use minimal cookies strictly for functional purposes, such as remembering your
                        theme preference (dark/light mode).
                    </p>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-12">3. Third Parties</h2>
                    <p>
                        We do not sell or share your data with third parties. Your word searches are
                        kept private and are not tracked.
                    </p>
                </div>
            </div>
        </div>
    );
}
