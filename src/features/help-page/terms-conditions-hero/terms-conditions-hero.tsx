"use client";

import { Hero } from "@/features/ui/hero";
import { FileTextIcon } from "lucide-react";

interface TermsConditionsHeroProps {}

export const TermsConditionsHero = (props: TermsConditionsHeroProps) => {
  return (
    <Hero
      title={
        <>
          <FileTextIcon size={36} strokeWidth={1.5} /> Terms of Use
        </>
      }
      description={`Explore the Terms and Conditions governing your use of Intellient. This page outlines your rights, responsibilities, and the legal framework for accessing and using our services.`}
    ></Hero>
  );
};
