"use client";

import { Button } from "@/features/ui/button";
import { FC, useEffect, useState } from "react";
import { PersonaModel } from "../persona-services/models";
import { Pin, PinOff } from "lucide-react";
import { addOrUpdatePinPersona } from "../persona-store";

interface Props {
  persona: PersonaModel;
  pinnedPersonas: any;
}

export const PersonaPin: FC<Props> = (props) => {
  const [isPinned, setIsPinned] = useState(false);

  const handlePinToggle = async () => {
    try {
      const action = isPinned ? "unpin" : "pin";
      window.alert(`Do you want to ${action} ${props.persona.name} persona?`);
      const response = await addOrUpdatePinPersona(props.persona, !isPinned);
      if (response.status === "OK") {
        setIsPinned(!isPinned);
        window.alert(`${props.persona.name} persona pinned successfully`);
        window.location.reload();
      }
    } catch (error) {
      console.error("Error toggling persona pin:", error);
    }
  };

  useEffect(() => {
    // Check if the current persona is pinned
    if (props.pinnedPersonas !== undefined) {
      const pinnedStatus = props.pinnedPersonas.some(
        (pinnedPersona: any) =>
          pinnedPersona.personaId === props.persona.id && pinnedPersona.isPinned
      );
      setIsPinned(pinnedStatus);
    }
  }, [props.persona.id, props.pinnedPersonas]);

  return (
    <>
      <Button
        className="rounded-full absolute -top-6 left-2"
        onClick={handlePinToggle}
      >
        {isPinned ? (
          <PinOff size={15} className="text-white" />
        ) : (
          <Pin size={15} className="text-white" />
        )}
      </Button>
    </>
  );
};
