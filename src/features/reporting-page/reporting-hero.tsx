"use client";
import { BookText } from "lucide-react";
import { Hero } from "../ui/hero";

export const ReportingHero = () => {
  return (
    <div>
      <Hero
        title={
          <>
            <BookText size={36} strokeWidth={1.5} /> Chat Report
          </>
        }
        description={
          " Administration view for monitoring conversation history for all users."
        }
      ></Hero>
    </div>
  );
};
