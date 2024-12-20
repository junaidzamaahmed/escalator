"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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

export function AddThesisRequest({ onAdd }: any) {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    startingSemester: "",
    areaOfInterest: "",
    thesisTopic: "",
    currentGroupSize: "1",
    skills: "",
    description: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    onAdd({
      ...formData,
      skills: formData.skills.split(",").map((skill) => skill.trim()),
      areaOfInterest: [formData.areaOfInterest], // Convert to array as per schema
    });
    setIsOpen(false);
    setFormData({
      startingSemester: "",
      areaOfInterest: "",
      thesisTopic: "",
      currentGroupSize: "1",
      skills: "",
      description: "",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>Add Thesis Group Request</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Thesis Group Request</DialogTitle>
          <DialogDescription>
            Fill in the details for your new thesis group request.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="startingSemester" className="text-right">
              Starting Semester
            </label>
            <Input
              id="startingSemester"
              name="startingSemester"
              value={formData.startingSemester}
              onChange={handleChange}
              className="col-span-3"
              placeholder="e.g., Fall 2023"
              required
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="areaOfInterest" className="text-right">
              Area of Interest
            </label>
            <Input
              id="areaOfInterest"
              name="areaOfInterest"
              value={formData.areaOfInterest}
              onChange={handleChange}
              className="col-span-3"
              placeholder="e.g., Machine Learning"
              required
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="thesisTopic" className="text-right">
              Thesis Topic
            </label>
            <Input
              id="thesisTopic"
              name="thesisTopic"
              value={formData.thesisTopic}
              onChange={handleChange}
              className="col-span-3"
              placeholder="Enter your thesis topic"
              required
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="currentGroupSize" className="text-right">
              Current Group Size
            </label>
            <Select
              name="currentGroupSize"
              value={formData.currentGroupSize}
              onValueChange={(value) =>
                setFormData((prev) => ({ ...prev, currentGroupSize: value }))
              }
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select group size" />
              </SelectTrigger>
              <SelectContent>
                {[1, 2, 3, 4, 5].map((size) => (
                  <SelectItem key={size} value={size.toString()}>
                    {size}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="skills" className="text-right">
              Required Skills
            </label>
            <Input
              id="skills"
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              className="col-span-3"
              placeholder="e.g., Python, Data Analysis (comma-separated)"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="description" className="text-right">
              Description
            </label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="col-span-3"
              placeholder="Provide a brief description of your thesis project"
              required
            />
          </div>
          <Button type="submit" className="ml-auto">
            Create Request
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
