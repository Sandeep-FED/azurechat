"use client";

import { Hero } from "@/features/ui/hero";
import { MousePointerSquare } from "lucide-react";

interface FAQHeroProps {}

export const GetStartedHero = (props: FAQHeroProps) => {
  return (
    <Hero
      title={
        <>
          <MousePointerSquare size={36} strokeWidth={1.5} />
          Getting Started
        </>
      }
      description={`Tailor your interactions seamlessly with our new Persona feature. Switch between customized profiles to optimize communication and streamline your workflow.`}
    ></Hero>
  );
};
