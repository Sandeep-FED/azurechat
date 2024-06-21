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

export const MainMenu = async () => {
  const user = await getCurrentUser();

  return (
    <Menu>
      <MenuBar className="bg-gradient-to-t from-[#2b3d64]/30 to-[#24538D]/30 border-0">
        <MenuItemContainer>
          {/* <MenuItem tooltip="Home" asChild>
            <MenuLink href="/chat" ariaLabel="Go to the Home page">
              <Home {...menuIconProps} className="dark:text-white" />
            </MenuLink>
          </MenuItem> */}
          <MenuTrayToggle />
        </MenuItemContainer>
        <MenuItemContainer>
          <MenuItem tooltip="Chat">
            <MenuLink href="/chat" ariaLabel="Go to the Chat page">
              <Home {...menuIconProps} />
            </MenuLink>
          </MenuItem>
          <MenuItem tooltip="Persona">
            <MenuLink
              href="/persona"
              ariaLabel="Go to the Persona configuration page"
            >
              <VenetianMask {...menuIconProps} />
            </MenuLink>
          </MenuItem>
          {user.isAdmin && (
            <MenuItem tooltip="Extensions">
              <MenuLink
                href="/extensions"
                ariaLabel="Go to the Extensions configuration page"
              >
                <Blocks {...menuIconProps} />
              </MenuLink>
            </MenuItem>
          )}
          <MenuItem tooltip="Prompts">
            <MenuLink
              href="/prompt"
              ariaLabel="Go to the Prompt Library configuration page"
            >
              <BookText {...menuIconProps} />
            </MenuLink>
          </MenuItem>
          {user.isAdmin && (
            <>
              <MenuItem tooltip="Reporting">
                <MenuLink
                  href="/reporting"
                  ariaLabel="Go to the Admin reporting"
                >
                  <Sheet {...menuIconProps} />
                </MenuLink>
              </MenuItem>
            </>
          )}
        </MenuItemContainer>
        <MenuItemContainer>
          <MenuItem tooltip="Help">
            <MenuLink href="/help" ariaLabel="Go to the FAQ page">
              <HelpCircle {...menuIconProps} />
            </MenuLink>
          </MenuItem>
          <MenuItem tooltip="Profile">
            <UserProfile />
          </MenuItem>
        </MenuItemContainer>
      </MenuBar>
    </Menu>
  );
};
