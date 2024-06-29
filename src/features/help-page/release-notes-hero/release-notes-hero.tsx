"use client";

import { Hero } from "@/features/ui/hero";
import { Rocket } from "lucide-react";

interface ReleaseNotesHeroProps {}

export const ReleaseNotesHero = (props: ReleaseNotesHeroProps) => {
  return (
    <Hero
      title={
        <>
          <Rocket size={36} strokeWidth={1.5} /> Release Notes
        </>
      }
      description={`Stay updated with the latest enhancements, features, and bug fixes for Intellient. Our release notes provide detailed information on all updates and improvements to ensure you’re always in the know.`}
    ></Hero>
  );
};
