"use client";
import { cn } from "@/ui/lib";
import { MenuItem, menuIconProps } from "@/ui/menu";
import { PanelLeftClose } from "lucide-react";
import { menuStore, useMenuState } from "./menu-store";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

export const MenuTrayToggle = () => {
  const { isMenuOpen } = useMenuState();

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <MenuItem onClick={() => menuStore.toggleMenu()}>
            <PanelLeftClose
              {...menuIconProps}
              className={cn(
                "transition-all rotate-180 duration-700",
                isMenuOpen ? "rotate-0" : ""
              )}
            />
          </MenuItem>
        </TooltipTrigger>
        <TooltipContent>
          <p>Show and Hide Menu</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
