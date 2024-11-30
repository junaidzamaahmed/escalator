import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Book, Users, FileText, Shuffle, ArrowRight } from "lucide-react";
import Link from "next/link";

const features = [
  {
    icon: Shuffle,
    title: "Course Swaps",
    description:
      "Easily manage and find course section swaps with other students.",
  },
  {
    icon: FileText,
    title: "Academic Resources",
    description:
      "Access a centralized repository of academic resources for your courses.",
  },
  {
    icon: Users,
    title: "Alumni Network",
    description:
      "Connect with university alumni for networking and career guidance.",
  },
  {
    icon: Book,
    title: "Thesis Groups",
    description:
      "Form thesis groups and find members based on skills and interests.",
  },
];

export default function Home() {
  return (
    <>
      <div className="flex justify-center">
        <Card className="w-full max-w-2xl">
          <CardHeader>
            <CardTitle>Page Not Found</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg">
              The page you are looking for does not exist. Please check the URL
              or click the button below to return to the homepage.
            </p>
            <div className="flex justify-center mt-6">
              <Button variant="default" asChild>
                <Link href="/">
                  <ArrowRight className="mr-2" />
                  Return to Homepage
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
