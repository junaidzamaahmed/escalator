"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function AddSwapRequest({ onAdd }: { onAdd: any }) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentCourse, setCurrentCourse] = useState("");
  const [currentSection, setCurrentSection] = useState("");
  const [desiredCourse, setDesiredCourse] = useState("");
  const [desiredSections, setDesiredSections] = useState("");

  const handleSubmit = (event: any) => {
    event.preventDefault();
    const newSwap = {
      currentCourse: { code: currentCourse, title: "Course Title" }, // In a real app, you'd fetch the title
      currentSection: parseInt(currentSection),
      desiredCourse: { code: desiredCourse, title: "Course Title" }, // In a real app, you'd fetch the title
      desiredSections: desiredSections
        .split(",")
        .map((s) => parseInt(s.trim())),
      user: { name: "Current User", email: "user@example.com" }, // In a real app, you'd get this from the user's session
    };
    onAdd(newSwap);
    setIsOpen(false);
    // Reset form fields
    setCurrentCourse("");
    setCurrentSection("");
    setDesiredCourse("");
    setDesiredSections("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>Add Swap Request</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Swap Request</DialogTitle>
          <DialogDescription>
            Enter the details for your new swap request.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="currentCourse" className="text-right">
              Current Course
            </label>
            <Select value={currentCourse} onValueChange={setCurrentCourse}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select course" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="CSE101">CSE101</SelectItem>
                <SelectItem value="MAT201">MAT201</SelectItem>
                <SelectItem value="PHY301">PHY301</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="currentSection" className="text-right">
              Current Section
            </label>
            <Select value={currentSection} onValueChange={setCurrentSection}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select section" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Section 1</SelectItem>
                <SelectItem value="2">Section 2</SelectItem>
                <SelectItem value="3">Section 3</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="desiredCourse" className="text-right">
              Desired Course
            </label>
            <Select value={desiredCourse} onValueChange={setDesiredCourse}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select course" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="CSE101">CSE101</SelectItem>
                <SelectItem value="MAT201">MAT201</SelectItem>
                <SelectItem value="PHY301">PHY301</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="desiredSections" className="text-right">
              Desired Sections
            </label>
            <Input
              id="desiredSections"
              value={desiredSections}
              onChange={(e) => setDesiredSections(e.target.value)}
              placeholder="e.g., 1, 2, 3"
              className="col-span-3"
            />
          </div>
          <Button type="submit" className="ml-auto">
            Submit Request
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
