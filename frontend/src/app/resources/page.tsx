"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter } from "lucide-react";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

// Mock data for courses
const mockCourses = [
  {
    id: 1,
    code: "CSE101",
    name: "Introduction to Computer Science",
    department: "Computer Science",
    level: "Undergraduate",
  },
  {
    id: 2,
    code: "MAT201",
    name: "Linear Algebra",
    department: "Mathematics",
    level: "Undergraduate",
  },
  {
    id: 3,
    code: "PHY301",
    name: "Classical Mechanics",
    department: "Physics",
    level: "Undergraduate",
  },
  {
    id: 4,
    code: "ENG401",
    name: "Advanced Writing",
    department: "English",
    level: "Graduate",
  },
  {
    id: 5,
    code: "BIO501",
    name: "Molecular Biology",
    department: "Biology",
    level: "Graduate",
  },
];

export default function ResourcesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [department, setDepartment] = useState("");
  const [level, setLevel] = useState("");

  const filteredCourses = mockCourses.filter(
    (course) =>
      (course.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.name.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (department === "" || course.department === department) &&
      (level === "" || course.level === level)
  );

  const departments = [
    ...new Set(mockCourses.map((course) => course.department)),
  ];
  const levels = [...new Set(mockCourses.map((course) => course.level))];

  const FilterContent = () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="department" className="text-sm font-medium">
          Department
        </label>
        <Select value={department} onValueChange={setDepartment}>
          <SelectTrigger id="department">
            <SelectValue placeholder="Select department" />
          </SelectTrigger>
          <SelectContent>
            {/* <SelectItem value="">All Departments</SelectItem> */}
            {departments.map((dept) => (
              <SelectItem key={dept} value={dept}>
                {dept}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <label htmlFor="level" className="text-sm font-medium">
          Level
        </label>
        <Select value={level} onValueChange={setLevel}>
          <SelectTrigger id="level">
            <SelectValue placeholder="Select level" />
          </SelectTrigger>
          <SelectContent>
            {/* <SelectItem value="">All Levels</SelectItem> */}
            {levels.map((lvl) => (
              <SelectItem key={lvl} value={lvl}>
                {lvl}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Button className="w-full" onClick={() => {}}>
        Apply Filters
      </Button>
    </div>
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Course Resources</h1>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Filters for larger screens */}
        <div className="hidden md:block w-64 space-y-6">
          <div className="bg-card rounded-lg shadow-sm p-4">
            <h2 className="text-lg font-semibold mb-4">Filters</h2>
            <FilterContent />
          </div>
        </div>

        <div className="flex-1">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full"
              />
            </div>
            {/* Filter button for smaller screens */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="md:hidden">
                  <Filter className="mr-2 h-4 w-4" />
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Filter Courses</SheetTitle>
                  <SheetDescription>
                    Apply filters to refine your course search
                  </SheetDescription>
                </SheetHeader>
                <div className="py-4">
                  <FilterContent />
                </div>
              </SheetContent>
            </Sheet>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredCourses.map((course) => (
              <Link href={`/resources/${course.id}`} key={course.id}>
                <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader>
                    <CardTitle>{course.code}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="font-semibold">{course.name}</p>
                    <p className="text-sm text-muted-foreground mt-2">
                      {course.department}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {course.level}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          {filteredCourses.length === 0 && (
            <p className="text-center text-gray-500 mt-8">
              No courses found matching your criteria.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
