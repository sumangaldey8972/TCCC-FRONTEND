import apiClient from "@/lib/apiClient";
import { API_ENDPOINTS } from "@/lib/config/apiConfig";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {

    console.log("api hit ednpoint", API_ENDPOINTS.auth.verifyOtp)

    try {

        const payload = await req.json()

        const backendRes = await apiClient.post(API_ENDPOINTS.auth.verifyOtp, payload);

        if (!backendRes?.data?.data) {
            return NextResponse.json(backendRes.data);
        }

        return NextResponse.json(backendRes.data, {
            status: backendRes.data.statusCode,
        });
    } catch (error) {
        console.log("error while submitting otp form", error)
        return NextResponse.json(
            { error: "otp form submission failed." },
            { status: 500 }
        );
    }
}
