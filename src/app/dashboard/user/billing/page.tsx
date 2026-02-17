
"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CreditCard, Download, Zap } from "lucide-react";

export default function BillingPage() {
    return (
        <DashboardLayout role="user">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-white mb-2">Billing & Plans</h1>
                <p className="text-slate-400">Manage your subscription and billing information.</p>
            </div>

            <div className="grid gap-8 lg:grid-cols-3 mb-10">
                {/* Current Plan */}
                <Card className="glass-card border-primary/20 bg-primary/5 lg:col-span-2 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4">
                        <Badge className="bg-primary text-white">Current Plan</Badge>
                    </div>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-2xl">
                            <Zap className="h-6 w-6 text-primary" />
                            Free Tier
                        </CardTitle>
                        <CardDescription>You are currently on the free plan.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-300">Video Summaries</span>
                                <span className="text-white font-medium">3 / 5</span>
                            </div>
                            <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                                <div className="h-full bg-primary w-[60%]" />
                            </div>
                            <p className="text-xs text-slate-500">Resets on Mar 1, 2026</p>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-4">
                            <Button className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90">
                                Upgrade to Pro
                            </Button>
                            <Button variant="outline" className="w-full border-white/10 hover:bg-white/5">
                                Cancel Subscription
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Payment Method */}
                <Card className="glass-card border-white/5">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <CreditCard className="h-5 w-5 text-slate-400" />
                            Payment Method
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="p-4 rounded-lg border border-white/5 bg-white/5 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-6 bg-slate-700 rounded flex items-center justify-center text-[10px] font-bold text-slate-300">VISA</div>
                                <span className="text-sm text-slate-300">**** 4242</span>
                            </div>
                            <Badge variant="outline" className="text-xs border-green-500/30 text-green-400 bg-green-500/10">Default</Badge>
                        </div>
                        <Button variant="ghost" className="w-full text-primary hover:text-primary/80 hover:bg-primary/10">
                            + Add New Method
                        </Button>
                    </CardContent>
                </Card>
            </div>

            {/* Invoice History */}
            <Card className="glass-card border-white/5">
                <CardHeader>
                    <CardTitle>Invoice History</CardTitle>
                    <CardDescription>View and download past invoices.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="text-xs text-slate-400 uppercase bg-white/5">
                                <tr>
                                    <th className="px-4 py-3 rounded-l-lg">Invoice ID</th>
                                    <th className="px-4 py-3">Date</th>
                                    <th className="px-4 py-3">Amount</th>
                                    <th className="px-4 py-3">Status</th>
                                    <th className="px-4 py-3 text-right rounded-r-lg">Download</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {[
                                    { id: "INV-001", date: "Feb 1, 2026", amount: "$0.00", status: "Paid" },
                                    { id: "INV-002", date: "Jan 1, 2026", amount: "$0.00", status: "Paid" },
                                ].map((inv) => (
                                    <tr key={inv.id} className="hover:bg-white/5 transition-colors">
                                        <td className="px-4 py-3 font-medium text-white">{inv.id}</td>
                                        <td className="px-4 py-3 text-slate-400">{inv.date}</td>
                                        <td className="px-4 py-3 text-white">{inv.amount}</td>
                                        <td className="px-4 py-3">
                                            <Badge variant="outline" className="border-green-500/30 text-green-400 bg-green-500/10">
                                                {inv.status}
                                            </Badge>
                                        </td>
                                        <td className="px-4 py-3 text-right">
                                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-slate-400 hover:text-white">
                                                <Download className="h-4 w-4" />
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>

        </DashboardLayout>
    );
}
