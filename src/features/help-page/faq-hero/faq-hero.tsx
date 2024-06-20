"use client";

import { Hero } from "@/features/ui/hero";
import { MessageCircleQuestion } from "lucide-react";

interface FAQHeroProps {}

export const FAQHero = (props: FAQHeroProps) => {
  return (
    <Hero
      title={
        <>
          <MessageCircleQuestion size={36} strokeWidth={1.5} /> Frequently Asked
          Questions
        </>
      }
      description={`Discover quick answers to common questions about QBot, Quadra’s enterprise AI assistant. This FAQ guide helps you efficiently navigate and leverage QBot’s powerful features to boost productivity.`}
    ></Hero>
  );
};
