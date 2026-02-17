"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { Bell, Search, User as UserIcon, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { SidebarContent } from "@/components/layout/sidebar";

export function Navbar() {
    const pathname = usePathname();
    const role = pathname.includes("/admin") ? "admin" : "user";
    const [open, setOpen] = useState(false);

    return (
        <header className="sticky top-0 z-30 flex h-16 w-full items-center border-b border-white/10 bg-slate-900/50 backdrop-blur-xl px-6 transition-all">
            <div className="mr-4 md:hidden">
                <Sheet open={open} onOpenChange={setOpen}>
                    <SheetTrigger asChild>
                        <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white">
                            <Menu className="h-6 w-6" />
                        </Button>
                    </SheetTrigger>

                    <SheetContent side="left" className="p-0 bg-[#0f172a] border-r border-white/10 w-72">
                        <SidebarContent role={role} onLinkClick={() => setOpen(false)} />
                    </SheetContent>
                </Sheet>
            </div>

            <div className="flex flex-1 items-center gap-4">
                <div className="relative w-full max-w-md hidden md:block">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
                    <Input
                        type="search"
                        placeholder="Search..."
                        className="w-full pl-9 bg-white/5 border-white/10 focus:bg-white/10"
                    />
                </div>
            </div>
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" className="relative text-slate-400 hover:text-white">
                    <Bell className="h-5 w-5" />
                    <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500 ring-2 ring-slate-900"></span>
                </Button>
                <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-primary to-accent p-[1px]">
                    <div className="h-full w-full rounded-full bg-slate-900 flex items-center justify-center">
                        <UserIcon className="h-4 w-4 text-white" />
                    </div>
                </div>
            </div>
        </header>
    );
}
