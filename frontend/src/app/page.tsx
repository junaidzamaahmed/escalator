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
      <section className="py-20 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-4">
          Welcome to Escalator
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Elevate your university experience with course swaps, academic
          resources, alumni connections, and thesis group formation.
        </p>
        <Button size="lg" className="animate-pulse">
          Get Started <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </section>

      <section className="py-20">
        <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <Card
              key={feature.title}
              className="hover:shadow-lg transition-shadow"
            >
              <CardHeader>
                <feature.icon className="h-8 w-8 mb-2 text-primary" />
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="py-20 bg-secondary/10 rounded-lg bg-black">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-white">
            Join Escalator Today
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-white">
            Start your journey to a more connected and resourceful university
            experience.
          </p>
        </div>
        <div className="flex justify-center space-x-4">
          <Button size="lg" variant="secondary" asChild>
            <Link href={"/signup"}>Sign Up</Link>
          </Button>
          <Button size="lg" variant="default">
            Learn More
          </Button>
        </div>
      </section>
    </>
  );
}
