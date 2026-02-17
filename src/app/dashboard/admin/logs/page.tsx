
"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, FileText, UserPlus, ShieldCheck, Video, Settings } from "lucide-react";

const logs = [
    { id: 1, action: "User Signup", details: "alice@example.com created an account", user: "Alice", time: "2 mins ago", icon: UserPlus, type: "success" },
    { id: 2, action: "Admin Approval", details: "Admin approved Alice's account", user: "Admin", time: "5 mins ago", icon: ShieldCheck, type: "success" },
    { id: 3, action: "Video Summary", details: "Bob generated summary for 'React Hooks'", user: "Bob", time: "1 hour ago", icon: Video, type: "default" },
    { id: 4, action: "Settings Update", details: "System notifications updated", user: "Admin", time: "2 hours ago", icon: Settings, type: "warning" },
    { id: 5, action: "Login Failed", details: "Failed login attempt from 192.168.1.1", user: "Unknown", time: "3 hours ago", icon: ShieldCheck, type: "destructive" },
    { id: 6, action: "User Signup", details: "charlie@example.com created an account", user: "Charlie", time: "5 hours ago", icon: UserPlus, type: "success" },
];

export default function LogsPage() {
    return (
        <DashboardLayout role="admin">
            <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Activity Logs</h1>
                    <p className="text-slate-400">Audit trail of all system activities.</p>
                </div>
                <div className="relative w-full sm:w-64">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                    <Input placeholder="Search logs..." className="pl-10 bg-white/5 border-white/10" />
                </div>
            </div>

            <Card className="glass-card border-white/5">
                <CardHeader>
                    <div className="flex items-center gap-2">
                        <FileText className="h-5 w-5 text-primary" />
                        <CardTitle>Recent Activity</CardTitle>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="relative">
                        {/* Timeline Line */}
                        <div className="absolute left-6 top-0 bottom-0 w-[1px] bg-white/10" />

                        <div className="space-y-8">
                            {logs.map((log) => {
                                const Icon = log.icon;
                                return (
                                    <div key={log.id} className="relative flex items-start gap-4">
                                        <div className={`relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/10 bg-[#0f172a] shadow-sm`}>
                                            <Icon className={`h-5 w-5 ${log.type === 'success' ? 'text-green-400' :
                                                log.type === 'destructive' ? 'text-red-400' :
                                                    log.type === 'warning' ? 'text-yellow-400' :
                                                        'text-blue-400'
                                                }`} />
                                        </div>
                                        <div className="flex flex-col gap-1 min-w-0 flex-1 pt-1">
                                            <div className="flex items-center justify-between gap-2">
                                                <p className="text-sm font-medium text-white">{log.action}</p>
                                                <span className="text-xs text-slate-500 whitespace-nowrap">{log.time}</span>
                                            </div>
                                            <p className="text-sm text-slate-400 truncate">{log.details}</p>
                                            <div className="flex items-center gap-2 mt-1">
                                                <Badge variant="outline" className="text-[10px] h-5 px-1.5 border-white/10 text-slate-400">
                                                    {log.user}
                                                </Badge>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </DashboardLayout>
    );
}
