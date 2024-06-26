import { FC } from "react";
import { ScrollArea } from "../ui/scroll-area";
import { HelpToggle } from "./help-toggle/help-toggle";

interface Props {}

export const HelpPage: FC<Props> = async (props) => {
  return (
    <ScrollArea className="flex-1">
      <main className="flex flex-1 flex-col dark:bg-opacity-25 dark:bg-[#262626] bg-[#FFFFFF] bg-opacity-25 m-4 rounded-lg border-0 min-h-screen relative">
        <div className="dark:bg-[url('/Quadra_Light_Logo.png')] bg-[url('/Quadra_Dark_Logo.png')] w-28 h-8 bg-contain bg-no-repeat absolute top-8 right-8"></div>
        <div className="container max-w-4xl py-12 pb-8">
          <div className="w-full items-center flex flex-col">
            <HelpToggle />
          </div>
        </div>
      </main>
    </ScrollArea>
  );
};
