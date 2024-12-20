"use client";

import { useState, useEffect } from "react";
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

export function EditSwapRequest({ swap, onSave, onCancel }: any) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentCourse, setCurrentCourse] = useState(swap.currentCourse.code);
  const [currentSection, setCurrentSection] = useState(
    swap.currentSection.toString()
  );
  const [desiredCourse, setDesiredCourse] = useState(swap.desiredCourse.code);
  const [desiredSections, setDesiredSections] = useState(
    swap.desiredSections.join(", ")
  );

  useEffect(() => {
    if (isOpen) {
      setCurrentCourse(swap.currentCourse.code);
      setCurrentSection(swap.currentSection.toString());
      setDesiredCourse(swap.desiredCourse.code);
      setDesiredSections(swap.desiredSections.join(", "));
    }
  }, [isOpen, swap]);

  const handleSubmit = (event: any) => {
    event.preventDefault();
    const updatedSwap = {
      ...swap,
      currentCourse: { ...swap.currentCourse, code: currentCourse },
      currentSection: parseInt(currentSection),
      desiredCourse: { ...swap.desiredCourse, code: desiredCourse },
      desiredSections: desiredSections
        .split(",")
        .map((s: any) => parseInt(s.trim())),
    };
    onSave(updatedSwap);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Swap Request</DialogTitle>
          <DialogDescription>
            Update the details for your swap request.
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
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="currentSection" className="text-right">
              Current Section
            </label>
            <Input
              id="currentSection"
              value={currentSection}
              onChange={(e) => setCurrentSection(e.target.value)}
              className="col-span-3"
            />
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
          <div className="flex justify-end space-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit">Save Changes</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
