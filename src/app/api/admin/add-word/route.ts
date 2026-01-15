import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function POST(request: Request) {
    try {
        const { word, length } = await request.json();

        if (!word || !length) {
            return NextResponse.json({ message: "Invalid parameters" }, { status: 400 });
        }

        const filePath = path.join(process.cwd(), 'public', 'data', `${length}-letter-words.json`);

        // Read existing words
        const fileContent = await fs.readFile(filePath, 'utf-8');
        const words: string[] = JSON.parse(fileContent);

        if (words.includes(word.toLowerCase())) {
            return NextResponse.json({ message: "Word already exists in database" }, { status: 400 });
        }

        // Add word and sort
        words.push(word.toLowerCase());
        words.sort();

        // Write back to file
        await fs.writeFile(filePath, JSON.stringify(words, null, 2));

        return NextResponse.json({ message: "Success" });
    } catch (error) {
        console.error("Admin API Error:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}
