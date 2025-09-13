"use client";
import { AppSidebar } from "@/components/AppSideBar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        <AppSidebar />
        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="h-14 border-b bg-card/50 backdrop-blur-sm flex items-center px-4 gap-4">
            <SidebarTrigger />
            <div className="flex-1">
              <h1 className="text-lg font-semibold">
                Anomaly Monitoring Dashboard
              </h1>
            </div>
            <div className="text-sm text-muted-foreground">
              {new Date().toLocaleDateString("id-ID", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
          </header>
          <main className="flex-1 max-screen ">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
