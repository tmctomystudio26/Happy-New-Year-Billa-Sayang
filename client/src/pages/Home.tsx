import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertInquirySchema, type InsertInquiry } from "@shared/schema";
import { useCreateInquiry } from "@/hooks/use-inquiries";
import { Navigation } from "@/components/Navigation";
import { Section } from "@/components/Section";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Textarea } from "@/components/Textarea";
import { ArrowRight, Mail, MapPin } from "lucide-react";

export default function Home() {
  const createInquiry = useCreateInquiry();
  
  const form = useForm<InsertInquiry>({
    resolver: zodResolver(insertInquirySchema),
    defaultValues: {
      name: "",
      email: "",
      message: ""
    }
  });

  const onSubmit = (data: InsertInquiry) => {
    createInquiry.mutate(data, {
      onSuccess: () => form.reset()
    });
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/10">
      <Navigation />

      <main>
        {/* HERO */}
        <Section className="pt-40 md:pt-48 pb-20 min-h-[90vh] flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-medium leading-[1.1] mb-8">
              We craft digital <br />
              <span className="text-foreground/40 italic">experiences</span> that matter.
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed mb-12">
              A minimalist design studio focused on clarity, typography, and essential interactions. We strip away the noise to reveal the signal.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
                Start a Project
              </Button>
              <Button variant="outline" onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}>
                Our Philosophy
              </Button>
            </div>
          </motion.div>
        </Section>

        {/* IMAGE BREAK */}
        <div className="w-full h-[60vh] bg-muted relative overflow-hidden">
          {/* Architecture/Minimalist image from Unsplash */}
          <img 
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2000"
            alt="Minimalist Architecture"
            className="w-full h-full object-cover grayscale opacity-80 hover:scale-105 transition-transform duration-[2s] ease-out"
          />
        </div>

        {/* ABOUT */}
        <Section id="about">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <div>
              <h2 className="text-3xl md:text-4xl font-serif mb-6">Less, but better.</h2>
            </div>
            <div className="space-y-6 text-muted-foreground text-lg leading-relaxed">
              <p>
                We believe that good design is as little design as possible. By concentrating on the essential aspects, the products are not burdened with non-essentials.
              </p>
              <p>
                Back to purity, back to simplicity. Our approach is grounded in the fundamentals of Swiss design and modern web standards. We build fast, accessible, and beautiful websites.
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 text-foreground font-medium text-base">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full"/> Brand Identity
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full"/> Web Development
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full"/> UI/UX Design
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full"/> Strategy
                </li>
              </ul>
            </div>
          </div>
        </Section>

        {/* TESTIMONIAL / QUOTE */}
        <Section className="bg-secondary/30">
          <blockquote className="text-center max-w-4xl mx-auto">
            <p className="text-2xl md:text-4xl font-serif italic leading-tight mb-8">
              "Perfection is achieved, not when there is nothing more to add, but when there is nothing left to take away."
            </p>
            <footer className="text-sm font-medium tracking-widest uppercase text-muted-foreground">
              Antoine de Saint-Exupéry
            </footer>
          </blockquote>
        </Section>

        {/* CONTACT */}
        <Section id="contact" className="pb-32">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
            <div>
              <h2 className="text-4xl md:text-5xl font-serif mb-8">Get in touch.</h2>
              <p className="text-lg text-muted-foreground mb-12">
                Have a project in mind? We'd love to hear about it. Send us a message and we'll get back to you within 24 hours.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-secondary rounded-full">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-medium">Email</h3>
                    <p className="text-muted-foreground">hello@studio.design</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-secondary rounded-full">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-medium">Office</h3>
                    <p className="text-muted-foreground">123 Design District, New York</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-background p-1">
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                    Name
                  </label>
                  <Input 
                    id="name"
                    placeholder="John Doe" 
                    {...form.register("name")}
                    disabled={createInquiry.isPending}
                  />
                  {form.formState.errors.name && (
                    <p className="text-sm text-destructive">{form.formState.errors.name.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                    Email
                  </label>
                  <Input 
                    id="email"
                    type="email" 
                    placeholder="john@example.com" 
                    {...form.register("email")}
                    disabled={createInquiry.isPending}
                  />
                  {form.formState.errors.email && (
                    <p className="text-sm text-destructive">{form.formState.errors.email.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                    Message
                  </label>
                  <Textarea 
                    id="message"
                    placeholder="Tell us about your project..." 
                    {...form.register("message")}
                    disabled={createInquiry.isPending}
                  />
                  {form.formState.errors.message && (
                    <p className="text-sm text-destructive">{form.formState.errors.message.message}</p>
                  )}
                </div>

                <Button 
                  type="submit" 
                  className="w-full sm:w-auto"
                  disabled={createInquiry.isPending}
                >
                  {createInquiry.isPending ? "Sending..." : "Send Message"} 
                  {!createInquiry.isPending && <ArrowRight className="ml-2 w-4 h-4" />}
                </Button>
              </form>
            </div>
          </div>
        </Section>
      </main>

      <footer className="py-8 border-t border-border">
        <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">© 2024 Studio Design. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Twitter</a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Instagram</a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">LinkedIn</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
