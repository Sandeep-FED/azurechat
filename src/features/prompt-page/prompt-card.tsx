import { FC } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { PromptModel } from "./models";
import { PromptCardContextMenu } from "./prompt-card-context-menu";
import { Badge } from "../ui/badge";

interface Props {
  prompt: PromptModel;
  showContextMenu: boolean;
}

export const PromptCard: FC<Props> = (props) => {
  const promptType = props.prompt.isPublished ? "Global" : "Personal";

  const { prompt } = props;
  return (
    <Card
      key={prompt.id}
      className="flex flex-col h-auto items-start text-start justify-start dark:bg-opacity-5 dark:bg-[#FFFFFF]  dark:hover:border-fuchsia-400 hover:border-fuchsia-400"
    >
      <CardHeader className="flex flex-row pb-8 w-full items-start h-[85px] mb-4">
        <CardTitle className="flex-1 text-base">
          {prompt.name.length > 50
            ? prompt.name.slice(0, 50).concat("...")
            : prompt.name}
        </CardTitle>
        {props.showContextMenu && (
          <div className="justify-end">
            <PromptCardContextMenu prompt={prompt} />
          </div>
        )}
      </CardHeader>
      <CardContent className="content-stretch w-full gap-4 text-sm text-muted-foreground flex flex-col h-full pb-4 mb-4">
        {prompt.description.length > 90
          ? prompt.description.slice(0, 90).concat("...")
          : prompt.description}
        <Badge
          variant="outline"
          className={`w-fit mt-auto  ${
            promptType === "Global" ? "border-primary" : "border-fuchsia-400"
          }`}
        >
          {promptType}
        </Badge>
      </CardContent>
    </Card>
  );
};
