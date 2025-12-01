"use client";

// import Navbar from "@/components/navbar/navbar";
import { RootState } from "@/store";
import { useSelector } from "react-redux";
import { usePathname } from "next/navigation";

export default function MainLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const authedUser = useSelector((state: RootState) => state?.auth?.user);
    const pathname = usePathname();

    // ✅ Pages that require approved KYC
    const protectedRoutes = ["/market"];

    const isProtectedPage = protectedRoutes.some((path) =>
        pathname.startsWith(path)
    );

    // ✅ Check if user’s KYC is pending
    const isPendingKyc =
        authedUser && authedUser.kycStatus === "pending" && isProtectedPage;

    return (
        <div className="flex h-screen overflow-hidden">
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Navbar */}
                {/* <Navbar className="sticky top-0 z-50" /> */}

                {/* Conditional Rendering */}
                <main className="flex-1 overflow-y-auto px-6 py-4 pb-[env(safe-area-inset-bottom)]">
                    {isPendingKyc ? (
                        <div className="flex flex-col items-center justify-center h-full text-center text-gray-300">
                            <div className="bg-black/50 border border-[#C99700]/40 rounded-2xl p-8 max-w-md shadow-lg">
                                <h2 className="text-2xl font-bold text-[#C99700] mb-3">
                                    Verification Pending ⏳
                                </h2>
                                <p className="text-sm text-gray-400 mb-6">
                                    Hey {authedUser?.firstName || authedUser?.userName || "User"}, your KYC verification is
                                    still pending. <br />
                                    You’re not authorized to access this page or resource yet.
                                </p>
                                <button
                                    onClick={() => window.history.back()}
                                    className="px-6 py-3 bg-gradient-to-r from-[#C99700] to-[#E8B500] text-black font-semibold rounded-xl hover:from-[#B58900] hover:to-[#C99700] transition-all duration-300 shadow-lg shadow-[#C99700]/20"
                                >
                                    Go Back
                                </button>
                            </div>
                        </div>
                    ) : (
                        children
                    )}
                </main>
            </div>
        </div>
    );
}
