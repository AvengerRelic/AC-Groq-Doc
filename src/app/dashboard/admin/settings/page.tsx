
"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Bell, Shield, Key } from "lucide-react";

export default function AdminSettings() {
    return (
        <DashboardLayout role="admin">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
                <p className="text-slate-400">Manage your account and system preferences.</p>
            </div>

            <div className="grid gap-8 max-w-4xl">
                <Card>
                    <CardHeader>
                        <div className="flex items-center gap-2">
                            <Shield className="h-5 w-5 text-primary" />
                            <CardTitle>Admin Profile</CardTitle>
                        </div>
                        <CardDescription>Update your public profile information.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-300">Display Name</label>
                                <Input defaultValue="Admin User" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-300">Email</label>
                                <Input defaultValue="admin@example.com" disabled className="opacity-50" />
                            </div>
                        </div>
                        <div className="pt-2">
                            <Button>Save Changes</Button>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <div className="flex items-center gap-2">
                            <Bell className="h-5 w-5 text-secondary" />
                            <CardTitle>System Notifications</CardTitle>
                        </div>
                        <CardDescription>Configure alerts for new user signups.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between p-4 rounded-lg bg-white/5 border border-white/10">
                            <div>
                                <p className="font-medium text-white">New User Registration</p>
                                <p className="text-sm text-slate-400">Receive email when a user signs up.</p>
                            </div>
                            <Badge variant="success">Enabled</Badge>
                        </div>
                        <div className="flex items-center justify-between p-4 rounded-lg bg-white/5 border border-white/10">
                            <div>
                                <p className="font-medium text-white">Security Alerts</p>
                                <p className="text-sm text-slate-400">Receive alerts for suspicious activity.</p>
                            </div>
                            <Badge variant="success">Enabled</Badge>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <div className="flex items-center gap-2">
                            <Key className="h-5 w-5 text-accent" />
                            <CardTitle>Security</CardTitle>
                        </div>
                        <CardDescription>Two-factor authentication and password monitoring.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button variant="outline" className="w-full justify-between">
                            Change Password
                            <Key className="h-4 w-4" />
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </DashboardLayout>
    );
}
