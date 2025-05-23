import * as React from "react";

import { cn } from "@/lib/utils";

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-2xl bg-card text-card-foreground shadow-sm",
      className,
    )}
    {...props}
    data-oid="2xlx43w"
  />
));
Card.displayName = "Card";

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
    data-oid="byrhmo8"
  />
));
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<
  HTMLDivElement, // Changed from HTMLParagraphElement to HTMLDivElement for semantic correctness
  React.HTMLAttributes<HTMLHeadingElement> // Changed from HTMLHeadingElement to match typical usage
>(({ className, children, ...props }, ref) => (
  // Use h3 for better semantics, but keep div wrapper for flexibility if needed
  <h3
    ref={ref}
    className={cn(
      "text-lg font-semibold leading-none tracking-tight", // Adjusted size to lg from 2xl
      className,
    )}
    {...props}
    data-oid="qhw9vgt"
  >
    {children}
  </h3>
));
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<
  HTMLParagraphElement, // Changed from HTMLDivElement
  React.HTMLAttributes<HTMLParagraphElement> // Use HTMLParagraphElement attributes
>(({ className, ...props }, ref) => (
  <p // Use p tag for description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
    data-oid="o_om6q3"
  />
));
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("p-6 pt-0", className)}
    {...props}
    data-oid="gy0v19i"
  />
));
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
    data-oid="h7iplo8"
  />
));
CardFooter.displayName = "CardFooter";

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
};
