"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { EditSwapRequest } from "@/components/edit-swap-request";
import { CourseSwapsSidebar } from "@/components/course-swap-sidebar";
import { Filter, Search, Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { AddSwapRequest } from "@/components/add-swap-request";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const mockSwaps = [
  {
    id: 1,
    currentCourse: {
      code: "CSE101",
      title: "Introduction to Computer Science",
    },
    currentSection: 1,
    desiredCourse: {
      code: "CSE101",
      title: "Introduction to Computer Science",
    },
    desiredSections: [2, 3],
    user: { name: "John Doe", email: "john@example.com" },
    createdAt: new Date("2024-12-12"),
  },
  {
    id: 2,
    currentCourse: { code: "MAT201", title: "Linear Algebra" },
    currentSection: 2,
    desiredCourse: { code: "MAT201", title: "Linear Algebra" },
    desiredSections: [1, 3],
    user: { name: "Jane Smith", email: "jane@example.com" },
    createdAt: new Date("2024-12-12"),
  },
];

export default function CourseSwapsPage() {
  const [swaps, setSwaps] = useState(mockSwaps);
  const [filteredSwaps, setFilteredSwaps] = useState(mockSwaps);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    courseCode: "",
    currentSection: "",
    desiredSection: "",
    dateRange: [0, 30],
  });

  useEffect(() => {
    applyFiltersAndSearch();
  }, [searchTerm, filters, swaps]);

  const applyFiltersAndSearch = () => {
    let result = swaps.filter((swap) => {
      const matchesSearch =
        swap.currentCourse.code
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        swap.currentCourse.title
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      const matchesCourseCode = filters.courseCode
        ? swap.currentCourse.code
            .toLowerCase()
            .includes(filters.courseCode.toLowerCase())
        : true;
      const matchesCurrentSection = filters.currentSection
        ? swap.currentSection.toString() === filters.currentSection
        : true;
      const matchesDesiredSection = filters.desiredSection
        ? swap.desiredSections.includes(parseInt(filters.desiredSection))
        : true;
      const matchesDateRange =
        swap.createdAt >=
          new Date(Date.now() - filters.dateRange[1] * 24 * 60 * 60 * 1000) &&
        swap.createdAt <=
          new Date(Date.now() - filters.dateRange[0] * 24 * 60 * 60 * 1000);

      return (
        matchesSearch &&
        matchesCourseCode &&
        matchesCurrentSection &&
        matchesDesiredSection &&
        matchesDateRange
      );
    });

    setFilteredSwaps(result);
  };

  const handleSearch = (event: any) => {
    setSearchTerm(event.target.value);
  };

  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters);
  };

  const handleAddSwap = (newSwap: any) => {
    setSwaps([
      ...swaps,
      { ...newSwap, id: swaps.length + 1, createdAt: new Date() },
    ]);
  };

  const handleEditSwap = (updatedSwap: any) => {
    setSwaps(
      swaps.map((swap) => (swap.id === updatedSwap.id ? updatedSwap : swap))
    );
  };

  const handleDeleteSwap = (swapId: any) => {
    setSwaps(swaps.filter((swap) => swap.id !== swapId));
  };
  return (
    <div className="flex flex-col md:flex-row h-screen bg-background">
      <div className="flex flex-col lg:flex-row h-screen bg-background">
        <div className="hidden lg:block">
          <CourseSwapsSidebar onFilterChange={handleFilterChange} />
        </div>
        <div className="w-[90vw] md:w-[70vw] p-4 lg:p-8">
          <div className="container mx-auto">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-4">
              <h1 className="text-3xl font-bold">Course Section Swaps</h1>
              <div className="flex items-center gap-2">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" className="lg:hidden">
                      <Filter className="h-4 w-4 mr-2" />
                      Filters
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left">
                    <SheetHeader>
                      <SheetTitle>Filters</SheetTitle>
                      <SheetDescription>
                        Apply filters to refine your search
                      </SheetDescription>
                    </SheetHeader>
                    <CourseSwapsSidebar onFilterChange={handleFilterChange} />
                  </SheetContent>
                </Sheet>
                <AddSwapRequest onAdd={handleAddSwap} />
              </div>
            </div>

            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search swaps..."
                value={searchTerm}
                onChange={handleSearch}
                className="pl-10 pr-4 py-2 w-full"
              />
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredSwaps.map((swap) => (
                <Card key={swap.id} className="flex flex-col">
                  <CardHeader>
                    <CardTitle className="flex justify-between items-center">
                      <span>{swap.currentCourse.code}</span>
                      <span className="text-sm font-normal text-muted-foreground">
                        {swap.createdAt.toLocaleDateString()}
                      </span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="font-semibold">{swap.currentCourse.title}</p>
                    <p className="text-sm text-muted-foreground mb-2">
                      Current Section: {swap.currentSection}
                    </p>
                    <p className="text-sm">
                      Desired Sections: {swap.desiredSections.join(", ")}
                    </p>
                    <p className="text-sm text-muted-foreground mt-2">
                      Requested by: {swap.user.name}
                    </p>
                  </CardContent>
                  <CardFooter className="flex justify-between items-center">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle>Swap Request Details</DialogTitle>
                          <DialogDescription>
                            Details for swap request #{swap.id}
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div>
                            <h3 className="font-semibold">Current Course</h3>
                            <p>
                              {swap.currentCourse.code} -{" "}
                              {swap.currentCourse.title}
                            </p>
                            <p>Section: {swap.currentSection}</p>
                          </div>
                          <div>
                            <h3 className="font-semibold">Desired Course</h3>
                            <p>
                              {swap.desiredCourse.code} -{" "}
                              {swap.desiredCourse.title}
                            </p>
                            <p>Sections: {swap.desiredSections.join(", ")}</p>
                          </div>
                          <div>
                            <h3 className="font-semibold">Requested By</h3>
                            <p>{swap.user.name}</p>
                            <p>{swap.user.email}</p>
                          </div>
                          <div>
                            <h3 className="font-semibold">Date Requested</h3>
                            <p>{swap.createdAt.toLocaleString()}</p>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                    <div className="flex space-x-2">
                      <EditSwapRequest swap={swap} onSave={handleEditSwap} />
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will
                              permanently delete the swap request.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDeleteSwap(swap.id)}
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>

            <div className="mt-4 flex justify-center">
              <Button variant="outline" size="sm" className="mx-1">
                Previous
              </Button>
              <Button variant="outline" size="sm" className="mx-1">
                Next
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
