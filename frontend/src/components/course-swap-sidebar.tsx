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

export function CourseSwapsSidebar({
  onFilterChange,
}: {
  onFilterChange: any;
}) {
  const [courseCode, setCourseCode] = useState("");
  const [currentSection, setCurrentSection] = useState("");
  const [desiredSection, setDesiredSection] = useState("");
  const [dateRange, setDateRange] = useState([0, 30]);

  const handleFilterChange = () => {
    onFilterChange({
      courseCode,
      currentSection,
      desiredSection,
      dateRange,
    });
  };

  return (
    <div className="w-64 bg-background p-6 border-r h-full">
      <h2 className="text-lg font-semibold mb-4">Filters</h2>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="courseCode">Course Code</Label>
          <Input
            id="courseCode"
            value={courseCode}
            onChange={(e) => setCourseCode(e.target.value)}
            placeholder="e.g., CSE101"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="currentSection">Current Section</Label>
          <Select value={currentSection} onValueChange={setCurrentSection}>
            <SelectTrigger id="currentSection">
              <SelectValue placeholder="Select section" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any</SelectItem>
              <SelectItem value="1">Section 1</SelectItem>
              <SelectItem value="2">Section 2</SelectItem>
              <SelectItem value="3">Section 3</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="desiredSection">Desired Section</Label>
          <Select value={desiredSection} onValueChange={setDesiredSection}>
            <SelectTrigger id="desiredSection">
              <SelectValue placeholder="Select section" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any</SelectItem>
              <SelectItem value="1">Section 1</SelectItem>
              <SelectItem value="2">Section 2</SelectItem>
              <SelectItem value="3">Section 3</SelectItem>
            </SelectContent>
          </Select>
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
