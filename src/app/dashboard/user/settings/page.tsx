
"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { User, CreditCard } from "lucide-react";

export default function UserSettings() {
    return (
        <DashboardLayout role="user">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-white mb-2">My Account</h1>
                <p className="text-slate-400">Manage your personal settings and preferences.</p>
            </div>

            <div className="grid gap-8 max-w-4xl">
                <Card>
                    <CardHeader>
                        <div className="flex items-center gap-2">
                            <User className="h-5 w-5 text-primary" />
                            <CardTitle>Personal Information</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-300">Full Name</label>
                                <Input defaultValue="User Name" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-300">Username</label>
                                <Input defaultValue="@username" />
                            </div>
                        </div>
                        <Button>Update Profile</Button>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <div className="flex items-center gap-2">
                            <CreditCard className="h-5 w-5 text-secondary" />
                            <CardTitle>Billing & Plans</CardTitle>
                        </div>
                        <CardDescription>You are currently on the Free Tier.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button variant="secondary" className="w-full sm:w-auto">Upgrade to Pro</Button>
                    </CardContent>
                </Card>
            </div>
        </DashboardLayout>
    );
}
