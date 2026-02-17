
"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
import { Clock, AlertCircle, Video, ArrowRight } from "lucide-react";
import Link from "next/link";

// Mock User Status
import { Status } from "@/types";
const userStatus: Status = "APPROVED"; // Change to APPROVED or REJECTED to test

export default function UserDashboard() {
    if (userStatus === "PENDING") {
        return (
            <DashboardLayout role="user">
                <div className="flex h-[80vh] items-center justify-center">
                    <Card className="max-w-md w-full text-center">
                        <CardHeader>
                            <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-yellow-500/20 flex items-center justify-center">
                                <Clock className="h-8 w-8 text-yellow-500" />
                            </div>
                            <CardTitle className="text-2xl">Account Pending</CardTitle>
                            <CardDescription>
                                Your account is currently under review by an administrator.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="rounded-lg bg-yellow-500/10 p-4 border border-yellow-500/20 text-yellow-200 text-sm">
                                <p>We&apos;ll notify you via email once your account has been approved. This usually takes 24 hours.</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </DashboardLayout>
        );
    }

    if (userStatus === "REJECTED") {
        return (
            <DashboardLayout role="user">
                <div className="flex h-[80vh] items-center justify-center">
                    <Card className="max-w-md w-full text-center border-red-500/30">
                        <CardHeader>
                            <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-red-500/20 flex items-center justify-center">
                                <AlertCircle className="h-8 w-8 text-red-500" />
                            </div>
                            <CardTitle className="text-2xl text-red-200">Access Denied</CardTitle>
                            <CardDescription>
                                Your account application was not approved.
                            </CardDescription>
                        </CardHeader>
                    </Card>
                </div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout role="user">
            <div className="grid gap-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-white mb-2">Welcome back, User!</h1>
                        <p className="text-slate-400">Here&apos;s what&apos;s happening with your projects today.</p>
                    </div>
                    <Button className="gap-2">
                        <Video className="h-4 w-4" />
                        New Summary
                    </Button>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    <Card className="border-primary/30 relative overflow-hidden group">
                        <div className="absolute inset-0 bg-primary/10 group-hover:bg-primary/20 transition-all duration-500" />
                        <CardHeader>
                            <CardTitle>AI Utilities</CardTitle>
                            <CardDescription>Access powerful tools</CardDescription>
                        </CardHeader>
                        <CardContent className="relative z-10">
                            <Link href="/dashboard/user/summarizer">
                                <Button className="w-full justify-between" variant="secondary">
                                    Go to Summarizer
                                    <ArrowRight className="h-4 w-4" />
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Usage Stats</CardTitle>
                            <CardDescription>Your monthly consumption</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-white mb-2">12/50</div>
                            <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                                <div className="h-full bg-gradient-to-r from-secondary to-primary w-[24%]" />
                            </div>
                            <p className="text-xs text-slate-400 mt-2">Summaries generated</p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </DashboardLayout>
    );
}
