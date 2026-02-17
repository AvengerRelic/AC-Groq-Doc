
import { Sidebar } from "@/components/layout/sidebar";
import { Navbar } from "@/components/layout/navbar";

interface DashboardLayoutProps {
    children: React.ReactNode;
    role: "admin" | "user";
}

export function DashboardLayout({ children, role }: DashboardLayoutProps) {
    return (
        <div className="flex h-screen w-full bg-[#0f172a] overflow-hidden">
            <Sidebar role={role} />
            <div className="flex flex-1 flex-col overflow-hidden relative">
                {/* Background glow effects */}
                <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-secondary/20 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />

                <Navbar />
                <main className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                    <div className="mx-auto max-w-7xl space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
