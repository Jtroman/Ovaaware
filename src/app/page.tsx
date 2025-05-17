import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, ShieldCheck, TrendingUp } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <section className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent to-secondary-foreground">
          Welcome to OvaAware
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
          Empowering you with personalized insights into ovarian cancer risk. Understand your factors and take proactive steps towards your health.
        </p>
        <Button size="lg" asChild className="shadow-lg hover:shadow-xl transition-shadow">
          <Link href="/assessment">Start Your Assessment</Link>
        </Button>
      </section>

      <section className="grid md:grid-cols-3 gap-8 mb-16">
        <Card className="shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader className="items-center text-center">
            <ShieldCheck className="h-12 w-12 text-primary mb-4" />
            <CardTitle className="text-2xl">Personalized Assessment</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-center">
              Receive a risk score based on your unique profile, utilizing established models for a comprehensive understanding.
            </CardDescription>
          </CardContent>
        </Card>
        <Card className="shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader className="items-center text-center">
            <TrendingUp className="h-12 w-12 text-primary mb-4" />
            <CardTitle className="text-2xl">Clear Insights</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-center">
              Understand the key factors influencing your risk and see how they contribute to your overall assessment, presented in an easy-to-digest format.
            </CardDescription>
          </CardContent>
        </Card>
        <Card className="shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader className="items-center text-center">
            <CheckCircle className="h-12 w-12 text-primary mb-4" />
            <CardTitle className="text-2xl">Actionable Next Steps</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-center">
              Get tailored recommendations and guidance on potential next steps you can discuss with your healthcare provider.
            </CardDescription>
          </CardContent>
        </Card>
      </section>
      
      <section className="bg-card p-8 md:p-12 rounded-lg shadow-xl flex flex-col md:flex-row items-center gap-8">
        <div className="md:w-1/2">
          <Image 
            src="https://firebasestorage.googleapis.com/v0/b/carbon-ray-421000.appspot.com/o/92522228-7940-40b9-8a9d-730438f55b07.png?alt=media&token=6f5883ac-3cc5-422d-8766-d195ac897e58" 
            alt="Illustration representing women's health and support" 
            width={600} 
            height={400}
            className="rounded-lg shadow-md"
            data-ai-hint="family health"
          />
        </div>
        <div className="md:w-1/2">
          <h2 className="text-3xl font-semibold mb-4 text-foreground">Your Health Journey, Supported</h2>
          <p className="text-muted-foreground mb-4">
            OvaAware is designed to be a supportive tool in your health journey. We believe in providing information with clarity and care, helping you make informed decisions in consultation with healthcare professionals.
          </p>
          <p className="text-muted-foreground mb-6">
            Our process is simple, secure, and designed with your peace of mind at its core.
          </p>
          <Button variant="secondary" asChild>
            <Link href="/about">Learn More About Us</Link>
          </Button>
        </div>
      </section>

      <section className="text-center mt-16 py-10">
         <h2 className="text-2xl font-semibold mb-4 text-foreground">Ready to understand your risk factors?</h2>
         <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            A few minutes can provide valuable insights. Start your confidential assessment today.
         </p>
         <Button size="lg" asChild className="shadow-lg hover:shadow-xl transition-shadow">
          <Link href="/assessment">Get Started Now</Link>
        </Button>
      </section>
    </div>
  );
}
