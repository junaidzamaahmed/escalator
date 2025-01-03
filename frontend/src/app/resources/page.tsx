"use client";

import { useEffect, useState } from "react";
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

export default function ResourcesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [department, setDepartment] = useState("");
  const [departments, setDepartments] = useState<any>([]);
  const [courses, setCourses] = useState<any>([]);

  useEffect(() => {
    // Fetch courses from the backend
    async function fetchCourses() {
      const response = await fetch(
        process.env.NEXT_PUBLIC_API_URL + "/api/v1/course"
      );
      const data = await response.json();
      if (!data.error) {
        setCourses(data.data);
        // Extract unique departments from the courses
        let uniqueDepartments = data.data.map(
          (course: any) => course.Department
        );
        uniqueDepartments = uniqueDepartments.filter(
          (o: any, index: any, arr: any) =>
            arr.findIndex(
              (item: any) => JSON.stringify(item) === JSON.stringify(o)
            ) === index
        );
        setDepartments(uniqueDepartments);
      } else console.log(data.error);
    }
    fetchCourses();
  }, []);

  const filteredCourses = courses.filter(
    (course: any) =>
      (course.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.title.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (department === "" || course.Department.id === department)
  );

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
            {departments.map((dept: any) => (
              <SelectItem key={dept.id} value={dept.id}>
                {dept.name}
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
            {filteredCourses.map((course: any) => (
              <Link href={`/resources/${course.id}`} key={course.id}>
                <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader>
                    <CardTitle>{course.code}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="font-semibold">{course.title}</p>
                    <p className="text-sm text-muted-foreground mt-2">
                      {course.Department.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Undergraduate
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
