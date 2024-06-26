import { FC } from "react";

import { DisplayError } from "../ui/error/display-error";
import { ScrollArea } from "../ui/scroll-area";
import { AddPromptSlider } from "./add-new-prompt";
import { PromptCard } from "./prompt-card";
import { PromptHero } from "./prompt-hero/prompt-hero";
import { FindAllPrompts } from "./prompt-service";
import { getCurrentUser, userHashedId } from "../auth-page/helpers";
import { Info } from "lucide-react";

interface ChatSamplePromptProps {}

export const ChatSamplePromptPage: FC<ChatSamplePromptProps> = async (
  props
) => {
  const promptsResponse = await FindAllPrompts();

  if (promptsResponse.status !== "OK") {
    return <DisplayError errors={promptsResponse.errors} />;
  }

  const user = await getCurrentUser();

  const userId = await userHashedId();

  return (
    <ScrollArea className="flex-1 h-full">
      <main className="flex flex-1 flex-col dark:bg-opacity-25 dark:bg-[#262626] bg-[#FFFFFF] bg-opacity-25 m-4 rounded-lg border-0 min-h-screen gap-8 relative">
        <div className="dark:bg-[url('/Quadra_Light_Logo.png')] bg-[url('/Quadra_Dark_Logo.png')] w-28 h-8 bg-contain bg-no-repeat absolute top-8 right-8"></div>
        <PromptHero user={user} />
        <div className="container max-w-4xl py-3 pb-16">
          <h2 className="text-lg font-semibold mb-4 text-primary">
            Prompts List
          </h2>
          {promptsResponse.response.length !== 0 ? (
            <div className="grid grid-cols-3 gap-3">
              {promptsResponse.response.map((prompt) => {
                return (
                  <PromptCard
                    prompt={prompt}
                    key={prompt.id}
                    showContextMenu={prompt.userId === userId || user.isAdmin}
                  />
                );
              })}
            </div>
          ) : (
            <h2 className="text-base font-semibold mt-12  text-muted-foreground text-center">
              <span className="flex items-center justify-center gap-2">
                <Info />
                No prompts found
              </span>
            </h2>
          )}
        </div>
        <AddPromptSlider />
      </main>
    </ScrollArea>
  );
};
