import { NextRequest, NextResponse } from "next/server";
import { serverFetch } from "@/lib/server-api";

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const publicId = searchParams.get("public_id");

        if (!publicId) {
            return NextResponse.json(
                { error: "public_id query parameter is required" },
                { status: 400 },
            );
        }

        // Proxy to Flask backend /movies/watch/<public_id> route.
        const flaskRes = await serverFetch(`/movies/watch/${publicId}`, {
            method: "GET",
        });
        console.log('body of movie', flaskRes.body)

        const headers = new Headers(flaskRes.headers);
        return new NextResponse(flaskRes.body, {
            status: flaskRes.status,
            headers,
        });
    } catch (error) {
        console.error("❌ Failed to stream movie:", error);
        return NextResponse.json(
            { error: "Failed to stream movie" },
            { status: 500 },
        );
    }
}

