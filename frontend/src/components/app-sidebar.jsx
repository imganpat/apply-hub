"use client"

import * as React from "react"
import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { LayoutDashboardIcon, Settings2Icon, User, Briefcase, FileText, BarChart3 } from "lucide-react"
import Link from "next/link"

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: (
        <LayoutDashboardIcon />
      ),
    },
    {
      title: "Applications",
      url: "/dashboard/applications",
      icon: (
        <FileText />
      ),
    },
    {
      title: "Analytics",
      url: "/dashboard/analytics",
      icon: (
        <BarChart3 />
      ),
    },
    {
      title: "Profile",
      url: "/dashboard/profile",
      icon: (
        <User />
      ),
    },
    {
      title: "Settings",
      url: "/dashboard/settings",
      icon: (
        <Settings2Icon />
      ),
    },
  ],
}

export function AppSidebar({
  ...props
}) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="group-data-[collapsible=icon]:size-12!"
            >
              <Link href="/dashboard">
                <div className="flex aspect-square size-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <Briefcase className="size-4" />
                </div>

                <div className="grid flex-1 text-left text-sm leading-tight group-data-[collapsible=icon]:hidden">
                  <span className="truncate font-semibold">
                    ApplyHub
                  </span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar >
  );
}