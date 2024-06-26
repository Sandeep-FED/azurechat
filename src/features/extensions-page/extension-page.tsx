import { FC } from "react";
import { ScrollArea } from "../ui/scroll-area";
import { AddExtension } from "./add-extension/add-new-extension";
import { ExtensionCard } from "./extension-card/extension-card";
import { ExtensionHero } from "./extension-hero/extension-hero";
import { ExtensionModel } from "./extension-services/models";
import { getCurrentUser } from "../auth-page/helpers";

interface Props {
  extensions: ExtensionModel[];
}

export const ExtensionPage: FC<Props> = async (props) => {
  const user = await getCurrentUser();

  return (
    <ScrollArea className="flex-1">
      <main className="flex flex-1 flex-col dark:bg-opacity-25 dark:bg-[#262626] bg-[#FFFFFF] bg-opacity-25 m-4 rounded-lg border-0 min-h-screen gap-8 relative">
        <div className="dark:bg-[url('/Quadra_Light_Logo.png')] bg-[url('/Quadra_Dark_Logo.png')] w-28 h-8 bg-contain bg-no-repeat absolute top-8 right-8"></div>
        <ExtensionHero user={user} />
        <div className="container max-w-4xl py-3 pb-16">
          <h2 className="text-lg font-semibold mb-4 text-primary">
            Extensions List
          </h2>
          <div className="grid grid-cols-3 gap-3">
            {props.extensions.map((extension) => {
              return (
                <ExtensionCard
                  extension={extension}
                  key={extension.id}
                  showContextMenu
                />
              );
            })}
          </div>
        </div>
        <AddExtension />
      </main>
    </ScrollArea>
  );
};
