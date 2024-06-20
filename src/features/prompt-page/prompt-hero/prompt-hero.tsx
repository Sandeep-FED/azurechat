"use client";
import { Hero, HeroButton } from "@/features/ui/hero";
import { PlusCircleIcon, BookText, Atom, Frame } from "lucide-react";
import { promptStore } from "../prompt-store";

interface PromptHeroProps {
  user: any;
}

export const PromptHero = (props: PromptHeroProps) => {
  return (
    <div>
      <Hero
        title={
          <>
            <BookText size={36} strokeWidth={1.5} /> Prompt Library
          </>
        }
        description={
          "Prompt templates are statements or questions meant to help users get creative without having to come up with ideas from scratch."
        }
      >
        {props.user.isAdmin && (
          <HeroButton
            title="Add New Prompt"
            description="Build your own prompt template"
            icon={<PlusCircleIcon />}
            onClick={() => promptStore.newPrompt()}
          />
        )}
      </Hero>
    </div>
  );
};
