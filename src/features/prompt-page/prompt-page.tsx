import { FC } from "react";

import { DisplayError } from "../ui/error/display-error";
import { ScrollArea } from "../ui/scroll-area";
import { AddPromptSlider } from "./add-new-prompt";
import { PromptCard } from "./prompt-card";
import { PromptHero } from "./prompt-hero/prompt-hero";
import { FindAllPrompts } from "./prompt-service";
import { getCurrentUser } from "../auth-page/helpers";

interface ChatSamplePromptProps {}

export const ChatSamplePromptPage: FC<ChatSamplePromptProps> = async (
  props
) => {
  const promptsResponse = await FindAllPrompts();

  if (promptsResponse.status !== "OK") {
    return <DisplayError errors={promptsResponse.errors} />;
  }

  const user = await getCurrentUser();

  return (
    <ScrollArea className="flex-1 h-full">
      <main className="flex flex-1 flex-col dark:bg-opacity-25 dark:bg-[#262626] bg-[#FFFFFF] bg-opacity-25 m-4 rounded-lg border-0 min-h-screen gap-8">
        <PromptHero user={user} />
        <div className="container max-w-4xl py-3 pb-16">
          <h2 className="text-base font-semibold mb-4 text-primary">
            Prompts List
          </h2>
          <div className="grid grid-cols-3 gap-3">
            {promptsResponse.response.map((prompt) => {
              return (
                <PromptCard prompt={prompt} key={prompt.id} showContextMenu />
              );
            })}
          </div>
        </div>
        <AddPromptSlider />
      </main>
    </ScrollArea>
  );
};
