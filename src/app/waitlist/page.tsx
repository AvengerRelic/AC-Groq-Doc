import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Clock } from "lucide-react";

export default function WaitlistPage() {
    return (
        <div className="flex h-screen items-center justify-center bg-[#0f172a] p-4 text-white">
            <Card className="max-w-md w-full glass-card border-white/5 text-center">
                <CardHeader>
                    <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-yellow-500/20 flex items-center justify-center">
                        <Clock className="h-8 w-8 text-yellow-500" />
                    </div>
                    <CardTitle className="text-2xl">Application Pending</CardTitle>
                    <CardDescription className="text-slate-400">
                        Your account is currently under review by an administrator.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="rounded-lg bg-yellow-500/10 p-4 border border-yellow-500/20 text-yellow-200 text-sm">
                        <p>We'll notify you via email once your account has been approved. This usually takes 24 hours.</p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
