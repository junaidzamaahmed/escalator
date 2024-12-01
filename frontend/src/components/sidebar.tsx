"use client";
import {
  Home,
  Book,
  Users,
  FileText,
  Settings,
  GraduationCapIcon as Graduation,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";

const menuItems = [
  { icon: Home, label: "Home", href: "/" },
  { icon: Book, label: "Course Swaps", href: "/course-swaps" },
  { icon: FileText, label: "Resources", href: "/resources" },
  { icon: Users, label: "Alumni Network", href: "/alumni" },
  { icon: Graduation, label: "Thesis Groups", href: "/thesis-groups" },
];

export function SidebarComponent() {
  return (
    <Sidebar className="border-r">
      <SidebarHeader className="p-4">
        <h2 className="text-2xl font-bold">Escalator</h2>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu className="px-2">
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.label}>
              <SidebarMenuButton
                asChild
                className="hover:bg-secondary/20 transition-colors"
              >
                <Link
                  href={item.href}
                  className="flex items-center space-x-2 p-2 rounded-md"
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-4">
        <SidebarMenuButton
          asChild
          className="hover:bg-secondary/20 transition-colors w-full"
        >
          <Link
            href="/settings"
            className="flex items-center space-x-2 p-2 rounded-md"
          >
            <Settings className="h-5 w-5" />
            <span>Settings</span>
          </Link>
        </SidebarMenuButton>
      </SidebarFooter>
    </Sidebar>
  );
}
