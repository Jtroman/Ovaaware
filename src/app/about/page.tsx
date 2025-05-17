import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { ShieldCheck, Lightbulb, Users } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <section className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">About OvaAware</h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
          Dedicated to empowering individuals with knowledge and insights about ovarian cancer risk through accessible technology.
        </p>
      </section>

      <section className="mb-16">
        <Image 
            src="https://placehold.co/1200x400.png" 
            alt="Diverse group of women collaborating on health initiatives" 
            width={1200} 
            height={400}
            className="rounded-lg shadow-md mx-auto"
            data-ai-hint="team collaboration"
          />
      </section>

      <section className="grid md:grid-cols-3 gap-8 mb-16">
        <Card className="text-center shadow-lg">
          <CardHeader>
            <div className="mx-auto bg-primary/20 text-primary rounded-full p-3 w-fit mb-4">
              <ShieldCheck className="h-8 w-8" />
            </div>
            <CardTitle>Our Mission</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              To provide a user-friendly, AI-powered tool that helps individuals understand their potential risk factors for ovarian cancer, fostering proactive health discussions and decisions.
            </p>
          </CardContent>
        </Card>
        <Card className="text-center shadow-lg">
          <CardHeader>
            <div className="mx-auto bg-primary/20 text-primary rounded-full p-3 w-fit mb-4">
              <Lightbulb className="h-8 w-8" />
            </div>
            <CardTitle>Our Vision</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              We envision a future where early awareness and personalized information contribute to better health outcomes and reduced anxiety surrounding ovarian cancer.
            </p>
          </CardContent>
        </Card>
        <Card className="text-center shadow-lg">
          <CardHeader>
            <div className="mx-auto bg-primary/20 text-primary rounded-full p-3 w-fit mb-4">
              <Users className="h-8 w-8" />
            </div>
            <CardTitle>Our Values</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-none space-y-1 text-muted-foreground">
              <li><strong>Empathy:</strong> Designing with care and understanding.</li>
              <li><strong>Accuracy:</strong> Grounding insights in established models.</li>
              <li><strong>Clarity:</strong> Communicating complex information simply.</li>
              <li><strong>Accessibility:</strong> Ensuring our tool is available to all.</li>
            </ul>
          </CardContent>
        </Card>
      </section>

      <section className="text-center bg-card p-8 md:p-12 rounded-lg shadow-xl">
        <h2 className="text-3xl font-semibold mb-4">Join Us on Our Journey</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
          OvaAware is committed to continuous improvement and collaboration with health experts to enhance our platform. We believe that together, we can make a difference in women&apos;s health.
        </p>
        {/* Add Call to action or contact info if needed */}
      </section>
    </div>
  );
}
