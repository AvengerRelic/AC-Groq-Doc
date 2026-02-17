
"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { LayoutDashboard, Users, Video, Settings, Shield, LogOut, BarChart3, FileText, MessageSquare, BookOpen, CreditCard, HelpCircle, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SidebarProps {
    role: "admin" | "user";
}

interface ContentProps {
    role: "admin" | "user";
    className?: string;
    onLinkClick?: () => void;
    collapsed?: boolean;
}

export function SidebarContent({ role, className, onLinkClick, collapsed = false }: ContentProps) {
    const pathname = usePathname();

    const adminLinks = [
        { title: "User Management", href: "/dashboard/admin", icon: Users },
        { title: "Analytics", href: "/dashboard/admin/analytics", icon: BarChart3 },
        { title: "Activity Logs", href: "/dashboard/admin/logs", icon: FileText },
        { title: "Support Tickets", href: "/dashboard/admin/support", icon: MessageSquare },
        { title: "Settings", href: "/dashboard/admin/settings", icon: Settings },
    ];

    const userLinks = [
        { title: "Dashboard", href: "/dashboard/user", icon: LayoutDashboard },
        { title: "KnowledgeBase", href: "/dashboard/user/knowledgebase", icon: FileText },
        { title: "My Library", href: "/dashboard/user/library", icon: BookOpen },
        { title: "AI Summarizer", href: "/dashboard/user/summarizer", icon: Video },
        { title: "Billing & Plans", href: "/dashboard/user/billing", icon: CreditCard },
        { title: "Help & Support", href: "/dashboard/user/help", icon: HelpCircle },
        { title: "Settings", href: "/dashboard/user/settings", icon: Settings },
    ];

    const links = role === "admin" ? adminLinks : userLinks;

    return (
        <div className={cn("h-full flex flex-col transition-all duration-300", className)}>
            <div className={cn("flex h-16 items-center border-b border-white/10 transition-all duration-300", collapsed ? "justify-center px-0" : "px-6")}>
                <div className="flex items-center gap-2 font-bold text-xl tracking-tight overflow-hidden whitespace-nowrap">
                    <div className="h-8 w-8 shrink-0 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg shadow-primary/20">
                        <Shield className="h-5 w-5 text-white" />
                    </div>
                    <span className={cn("text-gradient transition-opacity duration-300", collapsed ? "opacity-0 w-0 hidden" : "opacity-100")}>
                        NexDash
                    </span>
                </div>
            </div>

            <div className={cn("space-y-4 py-8 flex-1 transition-all duration-300", collapsed ? "px-2" : "px-4")}>
                {links.map((link) => {
                    const Icon = link.icon;
                    const isActive = pathname === link.href;
                    return (
                        <Link
                            key={link.href}
                            href={link.href}
                            onClick={onLinkClick}
                            title={collapsed ? link.title : undefined}
                            className={cn(
                                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 group relative overflow-hidden",
                                isActive
                                    ? "text-white bg-white/10 shadow-lg shadow-primary/5 border border-white/10"
                                    : "text-slate-400 hover:text-white hover:bg-white/5",
                                collapsed && "justify-center px-2"
                            )}
                        >
                            {isActive && (
                                <div className={cn("absolute inset-y-0 left-0 bg-primary rounded-r-full transition-all", collapsed ? "w-1" : "w-1")} />
                            )}
                            <Icon className={cn("h-5 w-5 shrink-0", isActive ? "text-primary" : "text-slate-400 group-hover:text-white")} />
                            <span className={cn("transition-all duration-300 whitespace-nowrap overflow-hidden", collapsed ? "w-0 opacity-0 hidden" : "w-auto opacity-100")}>
                                {link.title}
                            </span>
                        </Link>
                    );
                })}
            </div>

            <div className={cn("pb-8 space-y-4 mt-auto transition-all duration-300", collapsed ? "px-2" : "px-6")}>
                <Link href="/" className="block">
                    <Button variant="ghost" className={cn("w-full text-slate-400 hover:text-red-400 hover:bg-red-500/10", collapsed ? "justify-center px-0" : "justify-start gap-2")}>
                        <LogOut className="h-4 w-4" />
                        <span className={cn("transition-all duration-300 whitespace-nowrap overflow-hidden", collapsed ? "w-0 opacity-0 hidden" : "w-auto opacity-100")}>
                            Sign Out
                        </span>
                    </Button>
                </Link>

                <div className={cn("glass-card rounded-xl border border-white/5 bg-gradient-to-br from-white/5 to-transparent transition-all duration-300 overflow-hidden", collapsed ? "p-2 flex justify-center" : "p-4")}>
                    {collapsed ? (
                        <div className="h-8 w-8 rounded-full bg-slate-800 flex items-center justify-center text-xs font-bold text-white uppercase">
                            {role.charAt(0)}
                        </div>
                    ) : (
                        <>
                            <p className="text-xs text-slate-400">Logged in as</p>
                            <p className="text-sm font-medium text-white capitalize">{role}</p>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export function Sidebar({ role }: SidebarProps) {
    const [isCollapsed, setIsCollapsed] = useState(false);

    return (
        <div
            className={cn(
                "hidden border-r border-white/10 bg-slate-900/50 backdrop-blur-xl md:flex md:flex-col h-screen sticky top-0 transition-all duration-300 relative group",
                isCollapsed ? "md:w-20" : "md:w-64 lg:w-72"
            )}
        >
            <div className="absolute -right-3 top-20 z-50 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button
                    variant="outline"
                    size="icon"
                    className="h-6 w-6 rounded-full border-white/10 bg-slate-900 text-slate-400 hover:text-white shadow-lg"
                    onClick={() => setIsCollapsed(!isCollapsed)}
                >
                    {isCollapsed ? <ChevronRight className="h-3 w-3" /> : <ChevronLeft className="h-3 w-3" />}
                </Button>
            </div>

            <SidebarContent role={role} collapsed={isCollapsed} />
        </div>
    );
}
