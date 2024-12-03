"use client";
import { User, LogIn, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { toggleLoading, userLogout } from "@/app/redux/slice";

export default function UserButton({ isLoggedIn }: { isLoggedIn: boolean }) {
  const { isLoading } = useSelector((data: any) => data.userData);
  const dispatch = useDispatch();

  const logout = async () => {
    try {
      dispatch(toggleLoading());
      const res = await fetch("api/v1/auth/logout", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      dispatch(userLogout());
      dispatch(toggleLoading());
    } catch (e) {
      dispatch(toggleLoading());
    }
  };

  return isLoggedIn ? (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <User className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Settings</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Button asChild variant="ghost" size="sm" onClick={logout}>
            <span>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </span>
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ) : (
    <Button variant="default" size="sm" asChild disabled={isLoading}>
      <Link href="/login">
        <LogIn className="mr-2 h-4 w-4" />
        <span>Log in</span>
      </Link>
    </Button>
  );
}
