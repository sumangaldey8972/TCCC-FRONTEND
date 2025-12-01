import apiClient from "@/lib/apiClient";
import { API_ENDPOINTS } from "@/lib/config/apiConfig";
import { NextRequest, NextResponse } from "next/server";



export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url)

    const userId = searchParams.get("userId") ?? "";

    try {
        const backendRes = await apiClient.get(API_ENDPOINTS.auth.getUserInfo(userId))

        return NextResponse.json(backendRes.data, {
            status: backendRes.data.statusCode ?? 200
        })

    } catch (error) {
        console.error("Error fetching user info", error)
        return NextResponse.json(
            { error: "User info fetching failed" },
            { status: 500 }
        )
    }
}