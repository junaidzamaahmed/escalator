"use client";

import { useEffect, useState } from "react";
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

export function AddSwapRequest({ onAdd, courses }: any) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentCourse, setCurrentCourse] = useState(
    courses[0]?.id.toLocaleString() || "2"
  );
  const [currentSection, setCurrentSection] = useState("");
  const [desiredCourse, setDesiredCourse] = useState(
    courses[0]?.id.toLocaleString() || "2"
  );
  const [desiredSection, setDesiredSection] = useState("");
  useEffect(() => {
    setCurrentCourse(courses[0]?.id.toLocaleString() || "2");
    setDesiredCourse(courses[0]?.id.toLocaleString() || "2");
  }, []);
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const newSwap = {
      currentCourseId: parseInt(currentCourse),
      current_section: parseInt(currentSection),
      desiredCourseId: parseInt(desiredCourse),
      desired_section: desiredSection
        .split(",")
        .map((s: string) => parseInt(s.trim())),
    };
    const response = await fetch(
      process.env.NEXT_PUBLIC_API_URL + "/api/v1/section_swap",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: localStorage.getItem("escalator_access_token") || "",
        },
        body: JSON.stringify(newSwap),
      }
    );
    const data = await response.json();
    if (data.error) {
      console.error(data.error);
      return;
    }
    onAdd(data.data);
    setIsOpen(false);
    // Reset form fields
    setCurrentCourse("");
    setCurrentSection("");
    setDesiredCourse("");
    setDesiredSection("");
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
            <Select
              required
              value={currentCourse}
              onValueChange={setCurrentCourse}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select course" />
              </SelectTrigger>
              <SelectContent>
                {courses.map((course: any) => (
                  <SelectItem
                    key={course.code}
                    value={course.id.toLocaleString()}
                  >
                    {course.code}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="currentSection" className="text-right">
              Current Section
            </label>
            <Input
              required
              id="currentSection"
              value={currentSection}
              onChange={(e) => setCurrentSection(e.target.value)}
              placeholder="e.g. 1"
              type="number"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="desiredCourse" className="text-right">
              Desired Course
            </label>
            <Select
              required={true}
              value={desiredCourse}
              onValueChange={setDesiredCourse}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select course" />
              </SelectTrigger>
              <SelectContent>
                {courses.map((course: any) => (
                  <SelectItem
                    key={course.code}
                    value={course.id.toLocaleString()}
                  >
                    {course.code}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="desiredSections" className="text-right">
              Desired Sections
            </label>
            <Input
              required
              id="desiredSections"
              value={desiredSection}
              onChange={(e) => setDesiredSection(e.target.value)}
              placeholder="e.g. 1,2,3"
              // type="number"
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
