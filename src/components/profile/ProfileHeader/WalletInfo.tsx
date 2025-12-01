import { Wallet } from "lucide-react"

interface WalletInfoProps {
    walletBalance?: number;
    layout?: "mobile" | "tablet" | "desktop";
}

const WalletInfo = ({ walletBalance = 0, layout = "desktop" }: WalletInfoProps) => {
    const balance = walletBalance?.toLocaleString() || '0'

    if (layout === "mobile") {
        return (
            <div className="p-4 bg-sky-400/5 border-b border-text-primary/10">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Wallet className="w-4 h-4 text-sky-400" />
                        <span className="text-text-primary/70 text-sm">Balance</span>
                    </div>
                    <div className="text-lg font-bold text-text-primary">${balance}</div>
                </div>
            </div>
        )
    }

    if (layout === "tablet") {
        return (
            <div className="flex-shrink-0">
                <div className="text-right">
                    <div className="text-lg font-bold text-text-primary mb-1">${balance}</div>
                    <div className="text-text-primary/50 text-sm">Wallet Balance</div>
                </div>
            </div>
        )
    }

    return (
        <div className="flex-shrink-0">
            <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                    <div className="text-lg font-bold text-text-primary">${balance}</div>
                    <div className="text-text-primary/50 text-sm">Balance</div>
                </div>
                <div className="text-center">
                    <div className="text-lg font-bold text-text-primary">0</div>
                    <div className="text-text-primary/50 text-sm">Transactions</div>
                </div>
            </div>
        </div>
    )
}

export default WalletInfo