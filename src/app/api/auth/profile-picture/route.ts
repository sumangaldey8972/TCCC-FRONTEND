import { NextRequest, NextResponse } from "next/server";
import FormDataNode from "form-data";
import apiClient from "@/lib/apiClient";
import { API_ENDPOINTS } from "@/lib/config/apiConfig";

export async function POST(req: NextRequest) {
    console.log("<<<<<<<<======== Hit ========>>>>>>>> /api/auth/profile-picture");

    try {
        const formData = await req.formData();
        const data = new FormDataNode();

        for (const [key, value] of formData.entries()) {
            if (value instanceof File) {
                // Convert Web File to Buffer
                const arrayBuffer = await value.arrayBuffer();
                const buffer = Buffer.from(arrayBuffer);

                data.append(key, buffer, {
                    filename: value.name,
                    contentType: value.type,
                });
            } else {
                data.append(key, value.toString());
            }
        }

        console.log("Forwarding payload to backend via apiClient...");

        const backendRes = await apiClient.post(API_ENDPOINTS.auth.profilePicture, data, {
            headers: data.getHeaders(), // set proper multipart headers
        });

        console.log("profile picture Response from backend:", backendRes.data);

        return NextResponse.json(backendRes.data, {
            status: backendRes.data.statusCode || 200,
        });
    } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "";
        return NextResponse.json(
            { error: errorMessage || "Profile uplodation failed." },
            { status: 500 }
        );
    }
}
