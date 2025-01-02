"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { EditThesisRequest } from "@/components/edit-thesis-request";
import { AddThesisRequest } from "@/components/add-thesis-request";
import { Search, Trash2, Filter, ArrowRight, Edit } from "lucide-react";
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
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { ThesisGroupsSidebar } from "@/components/thesis-groups-sidebar";

export default function ThesisGroupRequestsPage() {
  const [requests, setRequests] = useState<any>([]);
  const [filteredRequests, setFilteredRequests] = useState<any>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    areaOfInterest: "",
    startingSemester: "",
    groupSize: "",
    skills: "",
    dateRange: [0, 30],
  });
  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        process.env.NEXT_PUBLIC_API_URL + "/api/v1/thesis-group"
      );
      const data = await response.json();
      setRequests(data.data);
    }
    fetchData();
  }, []);
  useEffect(() => {
    applyFiltersAndSearch();
  }, [searchTerm, filters, requests]);

  const applyFiltersAndSearch = () => {
    let result = requests.filter((req: any) => {
      const matchesSearch =
        req.thesisTopic.toLowerCase().includes(searchTerm.toLowerCase()) ||
        req.areaOfInterest.some((area: any) =>
          area.toLowerCase().includes(searchTerm.toLowerCase())
        );
      const matchesArea =
        filters.areaOfInterest === "" ||
        filters.areaOfInterest === "all" ||
        req.areaOfInterest.includes(filters.areaOfInterest);
      const matchesSemester =
        filters.startingSemester === "" ||
        filters.startingSemester === "all" ||
        req.startingSemester === filters.startingSemester;
      const matchesGroupSize =
        filters.groupSize === "" ||
        filters.groupSize === "all" ||
        req.currentGroupSize.toString() === filters.groupSize;
      const matchesSkills =
        filters.skills === "" ||
        req.skills.some((skill: any) =>
          skill.toLowerCase().includes(filters.skills.toLowerCase())
        );
      const matchesDateRange =
        new Date(req.createdAt) >=
          new Date(Date.now() - filters.dateRange[1] * 24 * 60 * 60 * 1000) &&
        new Date(req.createdAt) <=
          new Date(Date.now() - filters.dateRange[0] * 24 * 60 * 60 * 1000);

      return (
        matchesSearch &&
        matchesArea &&
        matchesSemester &&
        matchesGroupSize &&
        matchesSkills &&
        matchesDateRange
      );
    });
    setFilteredRequests(result);
  };

  const handleSearch = (event: any) => {
    setSearchTerm(event.target.value);
  };

  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters);
  };

  const handleAddRequest = async (newRequest: any) => {
    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_API_URL + "/api/v1/thesis-group",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: localStorage.getItem("escalator_access_token") || "",
          },
          body: JSON.stringify(newRequest),
          credentials: "include",
        }
      );
      const data = await response.json();
      if (data.error) {
        console.log("Failed to create thesis group request", data.error);
        return;
      }
      setRequests([...requests, data.data]);
    } catch (error) {
      console.error("Failed to create thesis group request", error);
    }
  };

  const handleEditRequest = async (updatedRequest: any) => {
    // setRequests(
    //   requests.map((req: any) =>
    //     req.id === updatedRequest.id ? updatedRequest : req
    //   )
    // );
    console.log(updatedRequest);
    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_API_URL +
          `/api/v1/thesis-group/${updatedRequest.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            authorization: localStorage.getItem("escalator_access_token") || "",
          },
          body: JSON.stringify(updatedRequest),
          credentials: "include",
        }
      );
      const data = await response.json();
      if (data.error) {
        console.log("Failed to update thesis group request", data.error);
        return;
      }
      setRequests(
        requests.map((req: any) =>
          req.id === updatedRequest.id ? data.data : req
        )
      );
    } catch (error) {
      console.log("Failed to update thesis group request", error);
    }
  };

  const handleDeleteRequest = (requestId: any) => {
    try {
      fetch(
        process.env.NEXT_PUBLIC_API_URL + `/api/v1/thesis-group/${requestId}`,
        {
          method: "DELETE",
          headers: {
            authorization: localStorage.getItem("escalator_access_token") || "",
          },
          credentials: "include",
        }
      );
      setRequests(requests.filter((req: any) => req.id !== requestId));
    } catch (error) {
      console.log("Failed to delete thesis group request", error);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-background">
      <div className="hidden lg:block">
        <ThesisGroupsSidebar onFilterChange={handleFilterChange} />
      </div>
      <div className="w-[90vw] md:w-[70vw] p-4 lg:p-8">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-4">
            <h1 className="text-3xl font-bold">Thesis Group Requests</h1>
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
                  <div className="py-4">
                    <ThesisGroupsSidebar onFilterChange={handleFilterChange} />
                  </div>
                </SheetContent>
              </Sheet>
              <AddThesisRequest onAdd={handleAddRequest} />
            </div>
          </div>

          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search by topic or area of interest..."
              value={searchTerm}
              onChange={handleSearch}
              className="pl-10 pr-4 py-2 w-full"
            />
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredRequests.map((request: any) => (
              <Card key={request.id} className="flex flex-col max-w-[80vw]">
                <CardHeader>
                  <CardTitle className="flex justify-between items-center">
                    <span className="truncate">{request.thesisTopic}</span>
                    <Badge variant="secondary">
                      {request.startingSemester}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="font-semibold mb-2">
                    {request.areaOfInterest.join(", ")}
                  </p>
                  <p className="text-sm text-muted-foreground mb-2">
                    Group Size: {request.currentGroupSize}
                  </p>
                  <p className="text-sm mb-2">
                    Skills: {request.skills.join(", ")}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {request.description}
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
                        <DialogTitle>Thesis Group Request Details</DialogTitle>
                        <DialogDescription>
                          Details for request #{request.id}
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div>
                          <h3 className="font-semibold">Thesis Topic</h3>
                          <p>{request.thesisTopic}</p>
                        </div>
                        <div>
                          <h3 className="font-semibold">Area of Interest</h3>
                          <p>{request.areaOfInterest.join(", ")}</p>
                        </div>
                        <div>
                          <h3 className="font-semibold">Starting Semester</h3>
                          <p>{request.startingSemester}</p>
                        </div>
                        <div>
                          <h3 className="font-semibold">Current Group Size</h3>
                          <p>{request.currentGroupSize}</p>
                        </div>
                        <div>
                          <h3 className="font-semibold">Required Skills</h3>
                          <p>{request.skills.join(", ")}</p>
                        </div>
                        <div>
                          <h3 className="font-semibold">Description</h3>
                          <p>{request.description}</p>
                        </div>
                        <div>
                          <h3 className="font-semibold">Requested By</h3>
                          <p>
                            {request.user.name} ({request.user.email})
                          </p>
                        </div>
                        <div>
                          <h3 className="font-semibold">Date Requested</h3>
                          <p>{new Date(request.createdAt).toLocaleString()}</p>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                  <div className="flex space-x-2">
                    <EditThesisRequest
                      request={request}
                      onSave={handleEditRequest}
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
                            delete the thesis group request.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDeleteRequest(request.id)}
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

          <div className="mt-8 flex justify-center">
            <Button variant="outline" size="sm" className="mx-1">
              <ArrowRight className="mr-2 h-4 w-4 rotate-180" />
              Previous
            </Button>
            <Button variant="outline" size="sm" className="mx-1">
              Next
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
