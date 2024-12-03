"use client";

import { useState, useEffect } from "react";
import { AlertCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useDispatch, useSelector } from "react-redux";
import { refreshAccessToken, toggleLoading } from "@/app/redux/slice";
import { AppDispatch } from "@/app/redux/store";

export function VerificationBanner({}) {
  const [isOpen, setIsOpen] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [error, setError] = useState("");
  const [resendCooldown, setResendCooldown] = useState(0);
  const { user, accessToken, isLoading, isLoggedIn } = useSelector(
    (data: any) => data.userData
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (resendCooldown > 0) {
      timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [resendCooldown]);
  if (!isLoggedIn || user?.isVerified) return null;

  const handleVerify = async (e: any) => {
    e.preventDefault();
    dispatch(toggleLoading());
    try {
      const response = await fetch("api/v1/auth/verify-user", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${accessToken}`,
        },
        body: JSON.stringify({ verificationCode }),
      });
      const data = await response.json();
      if (data.error) {
        setError(data.error);
      } else {
        setIsOpen(false);
        dispatch(refreshAccessToken(true));
      }
    } catch (error) {
      setError("Something went wrong. Please try again.");
    }
    dispatch(toggleLoading());
  };

  const handleResend = async () => {
    // This is where you'd typically make an API call to resend the code

    try {
      const response = await fetch("api/v1/auth/resend-verification-code", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${accessToken}`,
        },
      });
      const data = await response.json();
      if (data.data.message == "User is already verified") {
        setError("");
        setIsOpen(false);
        dispatch(refreshAccessToken(true));
      }
      if (data.error) {
        setError(data.error);
      } else {
        setResendCooldown(60);
        setError("");
      }
    } catch (error) {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <>
      <div className=" bg-yellow-100 py-1 px-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <AlertCircle className="h-5 w-5" />
            <div>
              <p className="font-semibold">Your account is not verified</p>
              <p className="text-sm opacity-90">
                Please verify your account to access all features.
              </p>
            </div>
          </div>
          <Button variant="default" size="sm" onClick={() => setIsOpen(true)}>
            Verify now
          </Button>
        </div>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">
              Verify Your Account
            </DialogTitle>
            <DialogDescription className="text-gray-600 dark:text-gray-300">
              Enter the verification code sent to your email.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-2 py-4">
            <form className="w-full" onSubmit={handleVerify}>
              <Input
                placeholder="Enter verification code"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
              />
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <Button className="w-full mt-2" type="submit">
                Verify
              </Button>
            </form>
            <Button
              variant="outline"
              onClick={handleResend}
              disabled={resendCooldown > 0}
            >
              {resendCooldown > 0
                ? `Resend code (${resendCooldown}s)`
                : "Resend code"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
