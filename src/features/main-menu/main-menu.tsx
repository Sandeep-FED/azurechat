import { MenuTrayToggle } from "@/features/main-menu/menu-tray-toggle";
import {
  Menu,
  MenuBar,
  MenuItem,
  MenuItemContainer,
  menuIconProps,
} from "@/ui/menu";
import {
  BookText,
  Home,
  Blocks,
  Sheet,
  VenetianMask,
  HelpCircle,
} from "lucide-react";
import { getCurrentUser } from "../auth-page/helpers";
import { MenuLink } from "./menu-link";
import { UserProfile } from "./user-profile";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

export const MainMenu = async () => {
  const user = await getCurrentUser();

  return (
    <Menu>
      <MenuBar className="bg-gradient-to-t from-[#2b3d64]/30 to-[#24538D]/30 border-0">
        <MenuItemContainer>
          <MenuTrayToggle />
        </MenuItemContainer>
        <MenuItemContainer>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <MenuItem>
                  <MenuLink href="/chat" ariaLabel="Go to the Chat page">
                    <Home {...menuIconProps} />
                  </MenuLink>
                </MenuItem>
              </TooltipTrigger>
              <TooltipContent>
                <p>Home</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <MenuItem>
                  <MenuLink
                    href="/persona"
                    ariaLabel="Go to the Persona configuration page"
                  >
                    <VenetianMask {...menuIconProps} />
                  </MenuLink>
                </MenuItem>
              </TooltipTrigger>
              <TooltipContent>
                <p>Personas</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          {user.isAdmin && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <MenuItem>
                    <MenuLink
                      href="/extensions"
                      ariaLabel="Go to the Extensions configuration page"
                    >
                      <Blocks {...menuIconProps} />
                    </MenuLink>
                  </MenuItem>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Extensions</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <MenuItem>
                  <MenuLink
                    href="/prompt"
                    ariaLabel="Go to the Prompt Library configuration page"
                  >
                    <BookText {...menuIconProps} />
                  </MenuLink>
                </MenuItem>
              </TooltipTrigger>
              <TooltipContent>
                <p>Prompts Library</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          {user.isAdmin && (
            <>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <MenuItem>
                      <MenuLink
                        href="/reporting"
                        ariaLabel="Go to the Admin reporting"
                      >
                        <Sheet {...menuIconProps} />
                      </MenuLink>
                    </MenuItem>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Reports</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </>
          )}
        </MenuItemContainer>
        <MenuItemContainer>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <MenuItem>
                  <MenuLink href="/help" ariaLabel="Go to the FAQ page">
                    <HelpCircle {...menuIconProps} />
                  </MenuLink>
                </MenuItem>
              </TooltipTrigger>
              <TooltipContent>
                <p>Help</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <MenuItem>
                  <UserProfile />
                </MenuItem>
              </TooltipTrigger>
              <TooltipContent>
                <p>Profile</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </MenuItemContainer>
      </MenuBar>
    </Menu>
  );
};
