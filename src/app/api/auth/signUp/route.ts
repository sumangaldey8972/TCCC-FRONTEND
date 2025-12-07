import apiClient from "@/lib/apiClient";
import { API_ENDPOINTS } from "@/lib/config/apiConfig";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {

    console.log("api hit ednpoint", API_ENDPOINTS.auth.signUp)

    try {

        const payload = await req.json()

        console.log({ payload })

        const backendRes = await apiClient.post(API_ENDPOINTS.auth.signUp, payload);

        if (!backendRes?.data?.data) {
            return NextResponse.json(backendRes.data);
        }

        return NextResponse.json(backendRes.data, {
            status: backendRes.data.statusCode,
        });
    } catch (error) {
        console.log("error while submitting sign up form", error)
        return NextResponse.json(
            { error: "sign up form submission failed." },
            { status: 500 }
        );
    }
}
