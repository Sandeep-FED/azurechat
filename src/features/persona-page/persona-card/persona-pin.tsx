"use client";

import { FC, useEffect, useState } from "react";
import { PersonaModel } from "../persona-services/models";
import { Pin, PinOff } from "lucide-react";
import { addOrUpdatePinPersona } from "../persona-store";
import { LoadingIndicator } from "@/features/ui/loading";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/features/ui/tooltip";

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
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <PinOff
                  size={17}
                  className="dark:text-gray-200 text-gray-400 cursor-pointer"
                  onClick={handlePinToggle}
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>Unpin persona</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )
      ) : isLoading ? (
        <LoadingIndicator isLoading={isLoading} />
      ) : (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Pin
                size={18}
                className="dark:text-gray-200 text-gray-400 cursor-pointer"
                onClick={handlePinToggle}
              />
            </TooltipTrigger>
            <TooltipContent>
              <p>Pin persona</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </>
  );
};
