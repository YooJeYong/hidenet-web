export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex-1 min-h-0 overflow-y-auto">
            <div className="flex-1 flex items-center justify-center p-4">
                {children}
            </div>
        </div>
    );
}
