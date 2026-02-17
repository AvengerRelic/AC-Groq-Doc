
"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Clock, XCircle, MoreHorizontal } from "lucide-react";

const tickets = [
    { id: "T-1024", subject: "Login Issue", user: "dave@example.com", status: "Open", priority: "High", date: "2 hours ago" },
    { id: "T-1023", subject: "Feature Request: Export", user: "eve@example.com", status: "In Progress", priority: "Medium", date: "4 hours ago" },
    { id: "T-1022", subject: "Billing Question", user: "frank@example.com", status: "Resolved", priority: "Low", date: "1 day ago" },
    { id: "T-1021", subject: "API Integration Help", user: "grace@example.com", status: "Open", priority: "Medium", date: "1 day ago" },
];

export default function SupportPage() {
    return (
        <DashboardLayout role="admin">
            <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Support Tickets</h1>
                    <p className="text-slate-400">Manage and resolve user inquiries.</p>
                </div>
                <Button className="bg-primary hover:bg-primary/90">
                    Create Ticket
                </Button>
            </div>

            <div className="grid gap-4">
                {tickets.map((ticket) => (
                    <Card key={ticket.id} className="glass-card border-white/5 hover:bg-white/5 transition-colors cursor-pointer group">
                        <CardContent className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div className="flex items-start gap-4">
                                <div className={`mt-1 p-2 rounded-lg ${ticket.status === 'Open' ? 'bg-blue-500/20 text-blue-400' :
                                    ticket.status === 'Resolved' ? 'bg-green-500/20 text-green-400' :
                                        'bg-orange-500/20 text-orange-400'
                                    }`}>
                                    {ticket.status === 'Open' && <XCircle className="h-5 w-5" />}
                                    {ticket.status === 'Resolved' && <CheckCircle2 className="h-5 w-5" />}
                                    {ticket.status === 'In Progress' && <Clock className="h-5 w-5" />}
                                </div>
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="text-sm font-mono text-slate-500">#{ticket.id}</span>
                                        <h3 className="font-semibold text-white group-hover:text-primary transition-colors">{ticket.subject}</h3>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-slate-400">
                                        <span>{ticket.user}</span>
                                        <span>&bull;</span>
                                        <span>{ticket.date}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 pl-14 sm:pl-0">
                                <Badge variant={
                                    ticket.priority === 'High' ? 'destructive' :
                                        ticket.priority === 'Medium' ? 'warning' : 'secondary'
                                } className="uppercase text-[10px]">
                                    {ticket.priority}
                                </Badge>
                                <Badge variant="outline" className="border-white/10 text-slate-300">
                                    {ticket.status}
                                </Badge>
                                <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-white">
                                    <MoreHorizontal className="h-4 w-4" />
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </DashboardLayout>
    );
}
