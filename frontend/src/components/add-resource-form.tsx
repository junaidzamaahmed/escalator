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

export function AddResourceForm({ onAdd, courses }: any) {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    url: "",
    type: "",
    author: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    onAdd({
      ...formData,
      courseId: courses[0].id,
    });
    setIsOpen(false);
    setFormData({ title: "", url: "", type: "", author: "" });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>Add Resource</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Resource</DialogTitle>
          <DialogDescription>
            Enter the details for the new resource for {courses[0].code}.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="title" className="text-right">
              Title
            </label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="col-span-3"
              required
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="url" className="text-right">
              URL
            </label>
            <Input
              id="url"
              name="url"
              value={formData.url}
              onChange={handleChange}
              className="col-span-3"
              type="url"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="type" className="text-right">
              Type
            </label>
            <Select
              name="type"
              value={formData.type}
              onValueChange={(value) =>
                setFormData((prev) => ({ ...prev, type: value }))
              }
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Article">Article</SelectItem>
                <SelectItem value="Book">Book</SelectItem>
                <SelectItem value="Video">Video</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="author" className="text-right">
              Author
            </label>
            <Input
              id="author"
              name="author"
              value={formData.author}
              onChange={handleChange}
              className="col-span-3"
            />
          </div>
          <Button type="submit" className="ml-auto">
            Add Resource
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
