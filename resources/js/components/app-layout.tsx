import React from 'react';
import { AppShell } from '@/components/app-shell';
import { AppHeader } from '@/components/app-header';
import { AppSidebar } from '@/components/app-sidebar';
import { AppContent } from '@/components/app-content';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { Separator } from '@/components/ui/separator';
import { BreadcrumbItem } from '@/types';
import { usePage } from '@inertiajs/react';
import { SharedData } from '@/types';

interface AppLayoutProps {
    children: React.ReactNode;
    breadcrumbs?: BreadcrumbItem[];
}

export default function AppLayout({ children, breadcrumbs }: AppLayoutProps) {
    const { auth } = usePage<SharedData>().props;
    
    if (!auth.user) {
        // For unauthenticated users, use a simple header layout
        return (
            <AppShell variant="header">
                <AppHeader />
                <main className="flex-1">
                    {children}
                </main>
            </AppShell>
        );
    }

    // For authenticated users, use sidebar layout
    return (
        <AppShell variant="sidebar">
            <AppSidebar />
            <SidebarInset>
                <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
                    <div className="flex items-center gap-2 px-4">
                        <SidebarTrigger className="-ml-1" />
                        <Separator orientation="vertical" className="mr-2 h-4" />
                        {breadcrumbs && <Breadcrumbs breadcrumbs={breadcrumbs} />}
                    </div>
                </header>
                <AppContent>
                    {children}
                </AppContent>
            </SidebarInset>
        </AppShell>
    );
}