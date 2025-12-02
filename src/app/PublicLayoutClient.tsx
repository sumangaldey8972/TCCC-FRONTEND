"use client";

import PublicNavbarVTwo from "@/components/landing/PublicNavbarVtwo";
import Navbar from "@/components/navbar/Navbar";

export default function PublicLayoutClient({
    children,
}: {
    children: React.ReactNode;
}) {


    return (
        <>
            {/* <PublicNavbarVTwo /> */}
            <Navbar />
            <main className="min-h-screen">{children}</main>
        </>
    );
}
