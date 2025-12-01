"use client";

import PublicNavbarVTwo from "@/components/landing/PublicNavbarVtwo";

export default function PublicLayoutClient({
    children,
}: {
    children: React.ReactNode;
}) {


    return (
        <>
            <PublicNavbarVTwo

            />
            <main className="min-h-screen">{children}</main>
        </>
    );
}
