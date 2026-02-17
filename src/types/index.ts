
export type Role = 'admin' | 'user';
export type Status = 'PENDING' | 'APPROVED' | 'REJECTED';

export interface User {
    id: string;
    name: string;
    email: string;
    role: Role;
    status: Status;
    avatar?: string;
    createdAt: string;
}

export interface NavItem {
    title: string;
    href: string;
    icon: React.ComponentType<{ className?: string }>;
}
