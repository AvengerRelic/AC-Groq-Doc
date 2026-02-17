"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, BookOpen, Video, Shield } from "lucide-react";
import Link from "next/link";

export default function WelcomePage() {
    return (
        <DashboardLayout role="user">
            <div className="flex flex-col items-center justify-center min-h-[80vh] text-center space-y-8 animate-in fade-in zoom-in duration-500">

                {/* Hero Section */}
                <div className="space-y-4 max-w-2xl">
                    <div className="mx-auto h-20 w-20 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-2xl shadow-primary/30 mb-6">
                        <Sparkles className="h-10 w-10 text-white" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
                        Welcome to <span className="text-gradient">NexDash</span>
                    </h1>
                    <p className="text-lg text-slate-400">
                        Your all-in-one platform for AI-powered video summarization and content management.
                        We&apos;re excited to have you on board!
                    </p>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl mt-8">
                    <Card className="glass-card border-white/5 hover:bg-white/5 transition-colors">
                        <CardContent className="p-6 flex flex-col items-center text-center gap-4">
                            <div className="h-12 w-12 rounded-full bg-blue-500/20 flex items-center justify-center">
                                <Video className="h-6 w-6 text-blue-400" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-white mb-1">AI Summarizer</h3>
                                <p className="text-sm text-slate-400">Transform long videos into concise summaries instantly.</p>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="glass-card border-white/5 hover:bg-white/5 transition-colors">
                        <CardContent className="p-6 flex flex-col items-center text-center gap-4">
                            <div className="h-12 w-12 rounded-full bg-purple-500/20 flex items-center justify-center">
                                <BookOpen className="h-6 w-6 text-purple-400" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-white mb-1">My Library</h3>
                                <p className="text-sm text-slate-400">Save, organize, and revisit your generated content anytime.</p>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="glass-card border-white/5 hover:bg-white/5 transition-colors">
                        <CardContent className="p-6 flex flex-col items-center text-center gap-4">
                            <div className="h-12 w-12 rounded-full bg-green-500/20 flex items-center justify-center">
                                <Shield className="h-6 w-6 text-green-400" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-white mb-1">Secure & Private</h3>
                                <p className="text-sm text-slate-400">Your data is encrypted and protected with enterprise-grade security.</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* CTA */}
                <div className="pt-8">
                    <Link href="/dashboard/user">
                        <Button size="lg" className="h-12 px-8 text-lg gap-2 bg-gradient-to-r from-primary to-secondary hover:opacity-90 shadow-lg shadow-primary/25">
                            Get Started
                            <ArrowRight className="h-5 w-5" />
                        </Button>
                    </Link>
                </div>

            </div>
        </DashboardLayout>
    );
}
