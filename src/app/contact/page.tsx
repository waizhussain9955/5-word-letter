import { Mail, MapPin, Phone } from "lucide-react";

export default function ContactPage() {
    return (
        <div className="pt-32 pb-24 px-6 min-h-screen">
            <div className="max-w-4xl mx-auto text-center">
                <h1 className="text-5xl font-black mb-6 text-gradient">Get in Touch</h1>
                <p className="text-xl text-gray-500 mb-16">Have questions or feedback? We'd love to hear from you.</p>

                <div className="grid md:grid-cols-3 gap-8 mb-16">
                    <div className="p-8 rounded-3xl bg-white dark:bg-black border border-gray-100 dark:border-gray-900 shadow-sm">
                        <div className="w-12 h-12 bg-indigo-50 dark:bg-indigo-900/30 rounded-2xl flex items-center justify-center text-indigo-600 mx-auto mb-6">
                            <Mail className="w-6 h-6" />
                        </div>
                        <h3 className="font-bold mb-2">Email Us</h3>
                        <p className="text-sm text-gray-500">support@lumina.word</p>
                    </div>
                    <div className="p-8 rounded-3xl bg-white dark:bg-black border border-gray-100 dark:border-gray-900 shadow-sm">
                        <div className="w-12 h-12 bg-purple-50 dark:bg-purple-900/30 rounded-2xl flex items-center justify-center text-purple-600 mx-auto mb-6">
                            <Phone className="w-6 h-6" />
                        </div>
                        <h3 className="font-bold mb-2">Call Us</h3>
                        <p className="text-sm text-gray-500">+1 (555) 123-4567</p>
                    </div>
                    <div className="p-8 rounded-3xl bg-white dark:bg-black border border-gray-100 dark:border-gray-900 shadow-sm">
                        <div className="w-12 h-12 bg-rose-50 dark:bg-rose-900/30 rounded-2xl flex items-center justify-center text-rose-600 mx-auto mb-6">
                            <MapPin className="w-6 h-6" />
                        </div>
                        <h3 className="font-bold mb-2">Visit Us</h3>
                        <p className="text-sm text-gray-500">San Francisco, CA</p>
                    </div>
                </div>

                <div className="max-w-xl mx-auto bg-gray-50 dark:bg-gray-900/20 p-8 rounded-[2.5rem] border border-gray-100 dark:border-gray-900">
                    <form className="space-y-4">
                        <input type="text" placeholder="Your Name" className="w-full px-6 py-4 rounded-2xl bg-white dark:bg-black border border-gray-200 dark:border-gray-800 focus:ring-2 ring-indigo-500 outline-none transition-all" />
                        <input type="email" placeholder="Your Email" className="w-full px-6 py-4 rounded-2xl bg-white dark:bg-black border border-gray-200 dark:border-gray-800 focus:ring-2 ring-indigo-500 outline-none transition-all" />
                        <textarea placeholder="Your Message" rows={4} className="w-full px-6 py-4 rounded-2xl bg-white dark:bg-black border border-gray-200 dark:border-gray-800 focus:ring-2 ring-indigo-500 outline-none transition-all"></textarea>
                        <button className="w-full py-4 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-600/20">Send Message</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
