"use client";

import { FC, useEffect, useState } from "react";
import { PersonaModel } from "../persona-services/models";
import { Pin, PinOff } from "lucide-react";
import { addOrUpdatePinPersona } from "../persona-store";
import { LoadingIndicator } from "@/features/ui/loading";

interface Props {
  persona: PersonaModel;
  pinnedPersonas: any;
}

export const PersonaPin: FC<Props> = (props) => {
  const [isPinned, setIsPinned] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handlePinToggle = async () => {
    try {
      setIsLoading(true);
      const response = await addOrUpdatePinPersona(props.persona, !isPinned);
      if (response.status === "OK") {
        setIsPinned(!isPinned);
        setIsLoading(false);
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
      {isPinned ? (
        isLoading ? (
          <LoadingIndicator isLoading={isLoading} />
        ) : (
          <PinOff
            size={17}
            className="dark:text-gray-500 text-gray-400 cursor-pointer"
            onClick={handlePinToggle}
          />
        )
      ) : isLoading ? (
        <LoadingIndicator isLoading={isLoading} />
      ) : (
        <Pin
          size={18}
          className="dark:text-gray-500 text-gray-400 cursor-pointer"
          onClick={handlePinToggle}
        />
      )}
    </>
  );
};
