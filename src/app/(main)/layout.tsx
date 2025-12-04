
export default function MainLayout({
    children,
}: {
    children: React.ReactNode;
}) {

    return (
        <div className="flex overflow-hidden">
            <main className="flex-1 overflow-y-auto">
                {children}
            </main>
        </div>
    );
}
