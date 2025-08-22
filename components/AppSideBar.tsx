import { Map, FileText, User, Settings } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import Link from "next/link";

const navigationItems = [
  { title: "Dashboard", url: "/", icon: Map },
  { title: "Logs", url: "/logs", icon: FileText },
  { title: "Profile", url: "/profile", icon: User },
  { title: "Settings", url: "/settings", icon: Settings },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";
  return (
    <Sidebar
      className="border-r bg-card/50 backdrop-blur-sm"
      collapsible="icon"
    >
      <SidebarContent className={isCollapsed ? "p-0" : "p-4"}>
        <div className="mb-6">
          <div
            className={
              isCollapsed
                ? "flex items-center justify-center pt-4"
                : "flex items-center  gap-3"
            }
          >
            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">PLN</span>
            </div>
            {!isCollapsed && (
              <div>
                <h1 className="font-bold text-lg">Anomaly Tracker</h1>
                <p className="text-xs text-muted-foreground">
                  Infrastructure Monitor
                </p>
              </div>
            )}
          </div>
        </div>
        <SidebarGroup>
          <SidebarGroupLabel className={isCollapsed ? "sr-only" : ""}>
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon className="w-5 h-5 " />
                      {!isCollapsed && (
                        <span className="font-medium">{item.title}</span>
                      )}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            {!isCollapsed && (
              <div className="mt-auto pt-4 border-t">
                <div className="text-xs text-muted-foreground px-3">
                  <p>PLN Infrastructure</p>
                  <p>Monitoring System</p>
                </div>
              </div>
            )}
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
