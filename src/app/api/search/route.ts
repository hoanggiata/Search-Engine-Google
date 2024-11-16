import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const searchTerm = request.nextUrl.searchParams.get("term");
    const apiKey = process.env.NEXT_PUBLIC_API_KEY;
    const cx = process.env.NEXT_PUBLIC_ENGINE_ID;
    const url = `https://www.googleapis.com/customsearch/v1?q=${encodeURIComponent(searchTerm)}&key=${apiKey}&cx=${cx}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        return NextResponse.json(data.items || []);
    } catch (error) {
        console.error("Error searching Google:", error);
        return NextResponse.json([]);
    }
}
