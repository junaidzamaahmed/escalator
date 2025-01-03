"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Search, Trash2, ExternalLink, ArrowLeft, Filter } from "lucide-react";
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
import { Badge } from "@/components/ui/badge";
import { AddResourceForm } from "@/components/add-resource-form";
import { EditResourceForm } from "@/components/edit-resource-form";
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

const FilterContent = ({
  resourceType,
  setResourceType,
  sortBy,
  setSortBy,
  resourceTypes,
}: any) => (
  <div className="space-y-4">
    <div className="space-y-2">
      <label htmlFor="resourceType" className="text-sm font-medium">
        Resource Type
      </label>
      <Select value={resourceType} onValueChange={setResourceType}>
        <SelectTrigger id="resourceType">
          <SelectValue placeholder="Select type" />
        </SelectTrigger>
        <SelectContent>
          {resourceTypes.map((type: any) => (
            <SelectItem key={type} value={type}>
              {type}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
    <div className="space-y-2">
      <label htmlFor="sortBy" className="text-sm font-medium">
        Sort By
      </label>
      <Select value={sortBy} onValueChange={setSortBy}>
        <SelectTrigger id="sortBy">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="title">Title</SelectItem>
          <SelectItem value="date">Date Added</SelectItem>
        </SelectContent>
      </Select>
    </div>
    <Button className="w-full">Apply Filters</Button>
  </div>
);

export default function CourseResourcesPage() {
  const params = useParams();
  const courseId = parseInt(params.courseId as string);
  const [course, setCourse] = useState<any>(null);
  const [resources, setResources] = useState<any>([]);
  const [filteredResources, setFilteredResources] = useState<any>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [resourceType, setResourceType] = useState("");
  const [sortBy, setSortBy] = useState("title");

  useEffect(() => {
    const courseResources = resources.filter(
      (r: any) => r.courseId === courseId
    );
    setFilteredResources(courseResources);
  }, [courseId, resources]);

  useEffect(() => {
    let filtered = resources.filter(
      (resource: any) =>
        resource.courseId === courseId &&
        resource.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (resourceType) {
      filtered = filtered.filter(
        (resource: any) => resource.type === resourceType
      );
    }

    filtered.sort((a: any, b: any) => {
      if (sortBy === "title") {
        return a.title.localeCompare(b.title);
      } else if (sortBy === "date") {
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      }
      return 0;
    });

    setFilteredResources(filtered);
  }, [searchTerm, resources, courseId, resourceType, sortBy]);

  useEffect(() => {
    async function fetchResources() {
      const response = await fetch(
        process.env.NEXT_PUBLIC_API_URL + `/api/v1/resource/${courseId}`
      );
      const data = await response.json();
      setResources(data.data);
    }
    async function fetchCourse() {
      const response = await fetch(
        process.env.NEXT_PUBLIC_API_URL + `/api/v1/course/${courseId}`
      );
      const data = await response.json();
      setCourse(data.data);
    }
    fetchCourse();
    fetchResources();
  }, [courseId]);
  const handleAddResource = async (newResource: any) => {
    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_API_URL + `/api/v1/resource`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `${localStorage.getItem("escalator_access_token")}`,
          },
          body: JSON.stringify(newResource),
        }
      );
      const data = await response.json();
      setResources([...resources, data.data]);
    } catch (error) {
      console.error("An error occurred", error);
    }
  };

  const handleEditResource = async (id: number, updatedResource: any) => {
    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_API_URL + `/api/v1/resource/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            authorization: `${localStorage.getItem("escalator_access_token")}`,
          },
          body: JSON.stringify(updatedResource),
        }
      );
      const data = await response.json();
      setResources(
        resources.map((resource: any) =>
          resource.id === data.data.id ? data.data : resource
        )
      );
    } catch (error) {
      console.error("An error occurred", error);
    }
  };

  const handleDeleteResource = async (resourceId: any) => {
    try {
      await fetch(
        process.env.NEXT_PUBLIC_API_URL + `/api/v1/resource/${resourceId}`,
        {
          method: "DELETE",
          headers: {
            authorization: `${localStorage.getItem("escalator_access_token")}`,
          },
        }
      );
    } catch (error) {
      console.log("An error occurred", error);
    }
    setResources(
      resources.filter((resource: any) => resource.id !== resourceId)
    );
  };

  const resourceTypes = [
    ...new Set(resources?.map((resource: any) => resource.type)),
  ];

  return (
    <div className="container mx-auto p-4">
      <Link
        href="/resources"
        className="flex items-center mb-4 text-blue-500 hover:underline"
      >
        <ArrowLeft className="mr-2" /> Back to Courses
      </Link>
      <h1 className="text-3xl font-bold mb-2">{course?.code} Resources</h1>
      <h2 className="text-xl text-gray-600 mb-6">{course?.title}</h2>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Filters for larger screens */}
        <div className="hidden md:block w-64 space-y-6">
          <div className="bg-card rounded-lg shadow-sm p-4">
            <h2 className="text-lg font-semibold mb-4">Filters</h2>
            <FilterContent
              resourceType={resourceType}
              setResourceType={setResourceType}
              sortBy={sortBy}
              setSortBy={setSortBy}
              resourceTypes={resourceTypes}
            />
          </div>
        </div>

        <div className="flex-1">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search resources..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full"
              />
            </div>
            <div className="flex items-center space-x-2">
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
                    <SheetTitle>Filter Resources</SheetTitle>
                    <SheetDescription>
                      Apply filters to refine your resource search
                    </SheetDescription>
                  </SheetHeader>
                  <div className="py-4">
                    <FilterContent
                      resourceType={resourceType}
                      setResourceType={setResourceType}
                      sortBy={sortBy}
                      setSortBy={setSortBy}
                      resourceTypes={resourceTypes}
                    />
                  </div>
                </SheetContent>
              </Sheet>
              <AddResourceForm onAdd={handleAddResource} course={course} />
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredResources.map((resource: any) => (
              <Card key={resource.id} className="flex flex-col">
                <CardHeader>
                  <CardTitle className="flex justify-between items-center">
                    <span className="truncate">{resource.title}</span>
                    <Badge variant="secondary">{resource.type}</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-sm text-muted-foreground mb-2">
                    Author: {resource.user.name}
                  </p>
                  <p className="text-sm text-muted-foreground mb-2">
                    Added: {new Date(resource.createdAt).toLocaleDateString()}
                  </p>
                  {resource.url && (
                    <a
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-500 hover:underline flex items-center"
                    >
                      Visit Resource <ExternalLink className="ml-1 h-3 w-3" />
                    </a>
                  )}
                </CardContent>
                <CardFooter className="flex justify-between items-center">
                  <EditResourceForm
                    resource={resource}
                    onSave={handleEditResource}
                    courses={[course]}
                  />
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
                          This action cannot be undone. This will permanently
                          delete the resource.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDeleteResource(resource.id)}
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </CardFooter>
              </Card>
            ))}
          </div>

          {filteredResources.length === 0 && (
            <p className="text-center text-gray-500 mt-8">
              No resources found for this course.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
