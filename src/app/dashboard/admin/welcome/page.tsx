"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Users, BarChart3, FileText } from "lucide-react";
import Link from "next/link";

export default function AdminWelcomePage() {
    return (
        <DashboardLayout role="admin">
            <div className="flex flex-col items-center justify-center min-h-[80vh] text-center space-y-8 animate-in fade-in zoom-in duration-500">

                {/* Hero Section */}
                <div className="space-y-4 max-w-2xl">
                    <div className="mx-auto h-20 w-20 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-2xl shadow-primary/30 mb-6">
                        <Shield className="h-10 w-10 text-white" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
                        Welcome, <span className="text-gradient">Administrator</span>
                    </h1>
                    <p className="text-lg text-slate-400">
                        You have full control over the NexDash platform. Manage users, monitor system health, and review analytics from your command center.
                    </p>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl mt-8">
                    <Card className="glass-card border-white/5 hover:bg-white/5 transition-colors">
                        <CardContent className="p-6 flex flex-col items-center text-center gap-4">
                            <div className="h-12 w-12 rounded-full bg-blue-500/20 flex items-center justify-center">
                                <Users className="h-6 w-6 text-blue-400" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-white mb-1">User Management</h3>
                                <p className="text-sm text-slate-400">Approve new sign-ups, manage roles, and oversee user activity.</p>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="glass-card border-white/5 hover:bg-white/5 transition-colors">
                        <CardContent className="p-6 flex flex-col items-center text-center gap-4">
                            <div className="h-12 w-12 rounded-full bg-purple-500/20 flex items-center justify-center">
                                <BarChart3 className="h-6 w-6 text-purple-400" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-white mb-1">Analytics</h3>
                                <p className="text-sm text-slate-400">Visualize growth trends, system usage, and performance metrics.</p>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="glass-card border-white/5 hover:bg-white/5 transition-colors">
                        <CardContent className="p-6 flex flex-col items-center text-center gap-4">
                            <div className="h-12 w-12 rounded-full bg-green-500/20 flex items-center justify-center">
                                <FileText className="h-6 w-6 text-green-400" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-white mb-1">System Logs</h3>
                                <p className="text-sm text-slate-400">Track all critical system events and security audits in real-time.</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* CTA */}
                <div className="pt-8">
                    <Link href="/dashboard/admin">
                        <Button size="lg" className="h-12 px-8 text-lg gap-2 bg-gradient-to-r from-primary to-secondary hover:opacity-90 shadow-lg shadow-primary/25">
                            Go to Dashboard
                            <ArrowRight className="h-5 w-5" />
                        </Button>
                    </Link>
                </div>

            </div>
        </DashboardLayout>
    );
}
