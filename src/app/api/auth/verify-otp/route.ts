import apiClient from "@/lib/apiClient";
import { API_ENDPOINTS } from "@/lib/config/apiConfig";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {

    try {
        const payload = await req.json();
        console.log("checking payload", payload)

        const backendRes = await apiClient.post(
            API_ENDPOINTS.auth.verifyOtp,
            payload
        );

        if (!backendRes?.data) {
            return NextResponse.json(backendRes.data)
        }

        return NextResponse.json(backendRes.data, {
            status: backendRes.data.statusCode
        })


    } catch (err) {
        return NextResponse.json({ error: "Signup failed!", err }, { status: 500 });
    }
}
