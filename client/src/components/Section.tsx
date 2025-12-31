import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface SectionProps {
  id?: string;
  className?: string;
  children: ReactNode;
  dark?: boolean;
}

export function Section({ id, className, children, dark = false }: SectionProps) {
  return (
    <section 
      id={id} 
      className={cn(
        "py-24 md:py-32 px-6",
        dark ? "bg-primary text-primary-foreground" : "bg-background text-foreground",
        className
      )}
    >
      <div className="max-w-3xl mx-auto">
        {children}
      </div>
    </section>
  );
}
