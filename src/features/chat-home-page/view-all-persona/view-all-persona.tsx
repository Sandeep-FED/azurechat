"use client";

import { Button } from "@/features/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/features/ui/tooltip";
import { useRouter } from "next/navigation";
import React from "react";

export const ViewAllPersonas = () => {
  const router = useRouter();

  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onClick={() => router.push("/persona")}
              className=" text-primary font-bold pr-0"
              variant="link"
            >
              View All
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>View all personas</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </>
  );
};
