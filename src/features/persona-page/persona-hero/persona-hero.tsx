"use client";
import { Hero, HeroButton } from "@/features/ui/hero";
import { VenetianMask, PlusCircle } from "lucide-react";
import { personaStore } from "../persona-store";

interface PersonaHeroProps {
  user: any;
}

export const PersonaHero = (props: PersonaHeroProps) => {
  console.log(props.user);
  return (
    <Hero
      title={
        <>
          <VenetianMask size={36} strokeWidth={1.5} /> Persona
        </>
      }
      description={`Persona is a representation of an AI agent that serves a specific purpose or role.`}
    >
      {props.user?.isAdmin && (
        <HeroButton
          title="New Persona"
          description="Create a new personality that you can use to have a conversation with."
          icon={<PlusCircle />}
          onClick={() =>
            personaStore.newPersonaAndOpen({
              name: "",
              personaMessage: `Personality:
[Describe the personality e.g. the tone of voice, the way they speak, the way they act, etc.]

Expertise:
[Describe the expertise of the personality e.g. Customer service, Marketing copywriter, etc.]

Example:
[Describe an example of the personality e.g. a Marketing copywriter who can write catchy headlines.]`,
              description: "",
            })
          }
        />
      )}
    </Hero>
  );
};
