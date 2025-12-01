import apiClient from "@/lib/apiClient";
import { API_ENDPOINTS } from "@/lib/config/apiConfig";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);

    const transactionTypeParams = searchParams.get("transactionType")
    const page = searchParams.get("page") ?? "1";
    const limit = searchParams.get("limit") ?? "10";

    const statusParams = searchParams.get("status");
    const transactionTypePrams = searchParams.get("transactionType");

    const dateRangeParam = searchParams.get("dateRange");

    const searchTerm = searchParams.get("searchTerm") ?? ""

    let status: string[] = []
    let transactionType: string[] = []
    let dateRange: { start?: string; end?: string } = {};

    if (statusParams) {
        try {
            status = JSON.parse(statusParams)
        } catch (error) {
            console.log("error while parsing status params", error)
        }
    }

    if (transactionTypePrams) {
        try {
            transactionType = JSON.parse(transactionTypePrams)
        } catch (error) {
            console.log("error while parsing status params", error)
        }
    }


    // ✅ Parse dateRange
    if (dateRangeParam) {
        try {
            dateRange = JSON.parse(dateRangeParam);
        } catch (error) {
            console.log("error while parsing dateRange params", error);
        }
    }

    try {
        const backendRes = await apiClient.get(
            API_ENDPOINTS.approvals.kyc.getKyc(searchTerm, status, transactionType, dateRange, page, limit)
        );

        return NextResponse.json(backendRes.data, {
            status: backendRes.data.statusCode ?? 200,
        });
    } catch (error) {
        console.error("Error fetching transaction list:", error);
        return NextResponse.json(
            { error: "Transaction list fetching failed." },
            { status: 500 }
        );
    }
}
