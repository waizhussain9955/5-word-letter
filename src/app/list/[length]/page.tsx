import ListClient from "./ListClient";
import { Metadata } from "next";

type Props = {
    params: { length: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { length } = await params;
    return {
        title: `${length} Letter Words | Browse Complete List & Filter - Lumina`,
        description: `Complete searchable list of ${length} letter English words. Use our advanced filter to find words starting with, ending with, or matching specific patterns.`,
    };
}

export default async function ListPage({ params }: Props) {
    const { length } = await params;
    const wordLength = parseInt(length);

    return (
        <div className="min-h-screen bg-[var(--background)]">
            <div className="max-w-7xl mx-auto px-6 pt-32 pb-24">
                <ListClient length={wordLength} />
            </div>
        </div>
    );
}
