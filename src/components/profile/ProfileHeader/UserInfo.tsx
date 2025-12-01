interface UserInfoProps {
    user: {
        userName: string;
        email: string;
        firstName?: string;
        lastName?: string;
        role: string;
    };
    layout?: "mobile" | "tablet" | "desktop";
}

const UserInfo = ({ user, layout = "desktop" }: UserInfoProps) => {
    const displayName = user.firstName && user.lastName
        ? `${user.firstName} ${user.lastName}`
        : user.userName

    if (layout === "mobile") {
        return (
            <div className="flex-1 min-w-0">
                <h1 className="text-lg font-bold text-text-primary truncate">
                    {displayName}
                </h1>
                <p className="text-text-primary/60 text-xs truncate">@{user.userName}</p>
                <p className="text-text-primary/60 text-xs truncate">{user.email}</p>
            </div>
        )
    }

    if (layout === "tablet") {
        return (
            <div className="flex-1 min-w-0">
                <h1 className="text-xl font-bold text-text-primary truncate">
                    {displayName}
                </h1>
                <p className="text-text-primary/70 text-sm mb-2 truncate">{user.email}</p>
                <p className="text-text-primary/50 text-xs mb-3">@{user.userName} • {user.role}</p>
            </div>
        )
    }

    return (
        <div className="flex-1 min-w-0">
            <h1 className="text-2xl font-bold text-text-primary truncate">
                {displayName}
            </h1>
            <div className="flex items-center gap-6 text-sm mt-2">
                <div>
                    <span className="text-text-primary/70">Email: </span>
                    <span className="text-text-primary">{user.email}</span>
                </div>
                <div>
                    <span className="text-text-primary/70">Username: </span>
                    <span className="text-text-primary">@{user.userName}</span>
                </div>
                <div>
                    <span className="text-text-primary/70">Role: </span>
                    <span className="text-text-primary capitalize">{user.role}</span>
                </div>
            </div>
        </div>
    )
}

export default UserInfo