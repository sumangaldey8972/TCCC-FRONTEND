"use client";

import Footer from "@/components/common/Footer";
import Navbar from "@/components/navbar/Navbar";

export default function PublicLayoutClient({
    children,
}: {
    children: React.ReactNode;
}) {


    return (
        <>
            <Navbar />
            <main>{children}</main>
            <Footer />
        </>
    );
}
