import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="text-center py-20">
      <h1 className="text-4xl font-bold mb-4">Welcome to Escalator</h1>
      <p className="text-xl mb-8 max-w-2xl mx-auto">
        Elevate your university experience with course swaps, academic
        resources, alumni connections, and thesis group formation.
      </p>
      <Button size="lg">Get Started</Button>
    </section>
  );
}
