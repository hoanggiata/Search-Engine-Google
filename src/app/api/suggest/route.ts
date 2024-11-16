import { NextRequest, NextResponse } from "next/server";
var Suggest = require("node-suggest");

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const term = searchParams.get("term");
    const result = await Suggest.google(term);
    return Response.json(result);
}
