
"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { HelpCircle, MessageSquare, FileText, ChevronDown } from "lucide-react";
import { useState } from "react";

const faqs = [
    { q: "How do I generate a summary?", a: "Navigate to the AI Summarizer page, paste a YouTube URL or your text, and click 'Generate Summary'." },
    { q: "What is the limit for the Free plan?", a: "The Free plan allows for 5 summaries per month. You can upgrade to Pro for unlimited access." },
    { q: "Can I export my summaries?", a: "Yes, you can copy the generated summary to your clipboard or save it to your library." },
    { q: "How do I change my password?", a: "Go to Settings > Security to update your password." },
];

export default function HelpPage() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <DashboardLayout role="user">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-white mb-2">Help & Support</h1>
                <p className="text-slate-400">Find answers to common questions or contact us.</p>
            </div>

            <div className="grid gap-8 lg:grid-cols-2">

                {/* FAQ Section */}
                <div className="space-y-6">
                    <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                        <HelpCircle className="h-5 w-5 text-primary" />
                        Frequently Asked Questions
                    </h2>
                    <div className="space-y-4">
                        {faqs.map((faq, idx) => (
                            <Card key={idx} className="glass-card border-white/5 overflow-hidden">
                                <button
                                    onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                                    className="w-full flex items-center justify-between p-6 text-left hover:bg-white/5 transition-colors"
                                >
                                    <span className="font-medium text-slate-200">{faq.q}</span>
                                    <ChevronDown className={`h-4 w-4 text-slate-400 transition-transform duration-200 ${openIndex === idx ? 'rotate-180' : ''}`} />
                                </button>
                                {openIndex === idx && (
                                    <div className="px-6 pb-6 text-slate-400 text-sm animate-in fade-in slide-in-from-top-2">
                                        {faq.a}
                                    </div>
                                )}
                            </Card>
                        ))}
                    </div>
                </div>

                {/* Contact Form */}
                <div className="space-y-6">
                    <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                        <MessageSquare className="h-5 w-5 text-secondary" />
                        Contact Support
                    </h2>
                    <Card className="glass-card border-white/5">
                        <CardHeader>
                            <CardTitle>Send us a message</CardTitle>
                            <CardDescription>We typically respond within 24 hours.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-300">Subject</label>
                                <Input placeholder="Brief description of your issue" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-300">Message</label>
                                <textarea
                                    className="min-h-[150px] w-full rounded-md border border-white/10 bg-black/20 px-3 py-2 text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-primary/50"
                                    placeholder="Describe your issue in detail..."
                                />
                            </div>
                            <Button className="w-full bg-primary hover:bg-primary/90">
                                Send Message
                            </Button>
                        </CardContent>
                    </Card>

                    <Card className="glass-card border-white/5 bg-gradient-to-br from-secondary/10 to-transparent border-secondary/20">
                        <CardContent className="p-6 flex items-center gap-4">
                            <div className="h-10 w-10 rounded-full bg-secondary/20 flex items-center justify-center">
                                <FileText className="h-5 w-5 text-secondary" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-white">Documentation</h3>
                                <p className="text-xs text-slate-400">Read our detailed guides.</p>
                            </div>
                            <Button variant="ghost" className="ml-auto text-secondary hover:text-secondary hover:bg-secondary/10">
                                View
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>

        </DashboardLayout>
    );
}
