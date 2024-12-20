import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";

export function ThesisGroupsSidebar({ onFilterChange }: any) {
  const [areaOfInterest, setAreaOfInterest] = useState("");
  const [startingSemester, setStartingSemester] = useState("");
  const [groupSize, setGroupSize] = useState("");
  const [skills, setSkills] = useState("");
  const [dateRange, setDateRange] = useState([0, 30]);

  const handleFilterChange = () => {
    onFilterChange({
      areaOfInterest,
      startingSemester,
      groupSize,
      skills,
      dateRange,
    });
  };

  return (
    <div className="w-full md:w-64 bg-background p-6 border-r h-full">
      <h2 className="text-lg font-semibold mb-4">Filters</h2>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="areaOfInterest">Area of Interest</Label>
          <Select value={areaOfInterest} onValueChange={setAreaOfInterest}>
            <SelectTrigger id="areaOfInterest">
              <SelectValue placeholder="Select area" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Areas</SelectItem>
              <SelectItem value="Machine Learning">Machine Learning</SelectItem>
              <SelectItem value="Cybersecurity">Cybersecurity</SelectItem>
              <SelectItem value="Natural Language Processing">
                Natural Language Processing
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="startingSemester">Starting Semester</Label>
          <Select value={startingSemester} onValueChange={setStartingSemester}>
            <SelectTrigger id="startingSemester">
              <SelectValue placeholder="Select semester" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Semesters</SelectItem>
              <SelectItem value="Fall 2023">Fall 2023</SelectItem>
              <SelectItem value="Spring 2024">Spring 2024</SelectItem>
              <SelectItem value="Fall 2024">Fall 2024</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="groupSize">Group Size</Label>
          <Select value={groupSize} onValueChange={setGroupSize}>
            <SelectTrigger id="groupSize">
              <SelectValue placeholder="Select size" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Any Size</SelectItem>
              <SelectItem value="1">1 Member</SelectItem>
              <SelectItem value="2">2 Members</SelectItem>
              <SelectItem value="3">3 Members</SelectItem>
              <SelectItem value="4">4 Members</SelectItem>
              <SelectItem value="5+">5+ Members</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="skills">Required Skills</Label>
          <Input
            id="skills"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
            placeholder="e.g., Python, Machine Learning"
          />
        </div>
        <div className="space-y-2">
          <Label>Date Range (last X days)</Label>
          <Slider
            value={dateRange}
            onValueChange={setDateRange}
            max={30}
            step={1}
          />
          <div className="text-sm text-muted-foreground">
            {dateRange[0]} - {dateRange[1]} days
          </div>
        </div>
        <Button onClick={handleFilterChange} className="w-full">
          Apply Filters
        </Button>
      </div>
    </div>
  );
}
