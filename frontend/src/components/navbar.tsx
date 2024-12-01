"use client";
import { Bell, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import Link from "next/link";
import UserButton from "./user";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { refreshAccessToken } from "@/app/redux/slice";
import { AppDispatch } from "@/app/redux/store";

export function Navbar() {
  const { isLoggedIn } = useSelector((data: any) => data.userData);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    const refresh = async () => {
      if (isLoggedIn) {
        dispatch(refreshAccessToken());
      }
    };
    refresh();
  }, [isLoggedIn]);
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center mx-auto">
        <SidebarTrigger className="mr-2" />
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="hidden font-bold sm:inline-block">Escalator</span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <div className="relative">
              <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search..."
                className="pl-8 md:w-[300px] lg:w-[400px]"
              />
            </div>
          </div>
          <nav className="flex items-center space-x-2">
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            {isLoggedIn == true ? (
              <UserButton isLoggedIn />
            ) : (
              <UserButton isLoggedIn={false} />
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
