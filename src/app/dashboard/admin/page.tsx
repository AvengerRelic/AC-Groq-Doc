"use client";

import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Check, X, Search, Users, UserPlus, UserCheck, Calendar } from "lucide-react";

export default function AdminDashboard() {
    const [users, setUsers] = useState<any[]>([]);
    const [stats, setStats] = useState({ total: 0, active: 0, pending: 0 });
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

    const fetchData = async () => {
        try {
            const res = await fetch("/api/admin/stats");
            if (res.ok) {
                const data = await res.json();
                setUsers(data.users);
                setStats(data.stats);
            }
        } catch (error) {
            console.error("Failed to fetch admin data", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleStatusChange = async (id: string, newStatus: string) => {
        try {
            const res = await fetch("/api/admin/users", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id, status: newStatus }),
            });
            if (res.ok) {
                // Optimistic update
                setUsers(users.map(u => u.id === id ? { ...u, status: newStatus } : u));
                // Refetch to update stats accurately
                fetchData();
            }
        } catch (error) {
            console.error("Update failed", error);
        }
    };

    const filteredUsers = users.filter((user: any) =>
        user.email.toLowerCase().includes(search.toLowerCase()) ||
        (user.name && user.name.toLowerCase().includes(search.toLowerCase()))
    );

    return (
        <DashboardLayout role="admin">
            {/* Stats Overview */}
            <div className="grid gap-4 md:grid-cols-3 mb-8">
                <Card className="glass-card border-white/5">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-slate-200">Total Users</CardTitle>
                        <Users className="h-4 w-4 text-primary" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-white">{stats.total}</div>
                        <p className="text-xs text-slate-400">All registered accounts</p>
                    </CardContent>
                </Card>
                <Card className="glass-card border-white/5">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-slate-200">Active Users</CardTitle>
                        <UserCheck className="h-4 w-4 text-green-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-white">{stats.active}</div>
                        <p className="text-xs text-slate-400">Approved and active</p>
                    </CardContent>
                </Card>
                <Card className="glass-card border-white/5">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-slate-200">Pending Approvals</CardTitle>
                        <UserPlus className="h-4 w-4 text-yellow-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-white">{stats.pending}</div>
                        <p className="text-xs text-slate-400">Waiting for review</p>
                    </CardContent>
                </Card>
            </div>

            {/* User Management Table */}
            <Card className="glass-card border-white/5">
                <CardHeader>
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <CardTitle className="text-xl">User Management</CardTitle>
                            <CardDescription>View and manage all registered users.</CardDescription>
                        </div>
                        <div className="relative w-full md:w-64">
                            <Search className="absolute left-2 top-2.5 h-4 w-4 text-slate-400" />
                            <Input
                                placeholder="Search by email or name..."
                                className="pl-8 bg-white/5 border-white/10 text-white placeholder:text-slate-500"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    {loading ? (
                        <div className="text-center py-12">
                            <div className="animate-spin h-8 w-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
                            <p className="text-slate-400">Loading user data...</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left">
                                <thead className="text-xs text-slate-400 uppercase bg-white/5">
                                    <tr>
                                        <th className="px-4 py-3 rounded-l-lg">User</th>
                                        <th className="px-4 py-3">Role</th>
                                        <th className="px-4 py-3">Status</th>
                                        <th className="px-4 py-3">Joined</th>
                                        <th className="px-4 py-3 text-right rounded-r-lg">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {filteredUsers.length === 0 ? (
                                        <tr>
                                            <td colSpan={5} className="px-4 py-8 text-center text-slate-500">
                                                No users found matching your search.
                                            </td>
                                        </tr>
                                    ) : (
                                        filteredUsers.map((user) => (
                                            <tr key={user.id} className="hover:bg-white/5 transition-colors group">
                                                <td className="px-4 py-3">
                                                    <div className="flex items-center gap-3">
                                                        <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-primary/20 to-secondary/20 flex items-center justify-center text-xs font-bold text-primary border border-primary/20">
                                                            {(user.name || user.email).charAt(0).toUpperCase()}
                                                        </div>
                                                        <div>
                                                            <div className="font-medium text-white">{user.name || "No Name"}</div>
                                                            <div className="text-xs text-slate-400">{user.email}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-4 py-3">
                                                    <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${user.role === 'ADMIN' ? 'bg-purple-500/10 text-purple-400' : 'bg-slate-500/10 text-slate-400'
                                                        }`}>
                                                        {user.role}
                                                    </span>
                                                </td>
                                                <td className="px-4 py-3">
                                                    <Badge variant="outline" className={
                                                        user.status === "APPROVED" ? "bg-green-500/10 text-green-400 border-green-500/20" :
                                                            user.status === "REJECTED" ? "bg-red-500/10 text-red-400 border-red-500/20" :
                                                                "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
                                                    }>
                                                        {user.status}
                                                    </Badge>
                                                </td>
                                                <td className="px-4 py-3 text-slate-400">
                                                    <div className="flex items-center gap-1.5">
                                                        <Calendar className="h-3 w-3" />
                                                        {new Date(user.createdAt).toLocaleDateString()}
                                                    </div>
                                                </td>
                                                <td className="px-4 py-3 text-right">
                                                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                        {user.status !== "APPROVED" && (
                                                            <Button
                                                                size="sm"
                                                                className="h-7 px-2 bg-green-500/20 hover:bg-green-500/30 text-green-400 border border-green-500/20"
                                                                onClick={() => handleStatusChange(user.id, "APPROVED")}
                                                            >
                                                                <Check className="h-3.5 w-3.5 mr-1" /> Approve
                                                            </Button>
                                                        )}
                                                        {user.status !== "REJECTED" && (
                                                            <Button
                                                                size="sm"
                                                                className="h-7 px-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/20"
                                                                onClick={() => handleStatusChange(user.id, "REJECTED")}
                                                            >
                                                                <X className="h-3.5 w-3.5 mr-1" /> Reject
                                                            </Button>
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}
                </CardContent>
            </Card>
        </DashboardLayout>
    );
}
