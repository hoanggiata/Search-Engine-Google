import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const page = Number(request.nextUrl.searchParams.get("page") ?? "1");
    const startIndex = (page - 1) * 10 + 1;
    const searchTerm = request.nextUrl.searchParams.get("term");  
    const apiKey = process.env.NEXT_PUBLIC_API_KEY as string;
    const cx = process.env.NEXT_PUBLIC_ENGINE_ID as string;
    const url = `https://www.googleapis.com/customsearch/v1?q=${encodeURIComponent(searchTerm)}&key=${apiKey}&cx=${cx}&start=${startIndex}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        return NextResponse.json(data.items || []);
    } catch (error) {
        console.error("Error searching Google:", error);
        return NextResponse.json([]);
    }
}
