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
  const promptType = props.prompt.isPublished ? "General" : "My Prompt";

  const { prompt } = props;
  return (
    <Card
      key={prompt.id}
      className="flex flex-col gap-4 h-auto items-start text-start justify-start dark:bg-opacity-5 dark:bg-[#FFFFFF]  dark:hover:border-fuchsia-400 hover:border-fuchsia-400"
    >
      <CardHeader className="flex flex-row pb-0 w-full items-center">
        <CardTitle className="flex-1 text-base">{prompt.name}</CardTitle>
        {props.showContextMenu && (
          <div className="justify-end">
            <PromptCardContextMenu prompt={prompt} />
          </div>
        )}
      </CardHeader>
      <CardContent className="content-stretch w-full gap-4 text-sm text-muted-foreground flex flex-col">
        {prompt.description.length > 100
          ? prompt.description.slice(0, 100).concat("...")
          : prompt.description}
        <Badge
          variant="outline"
          className={`w-fit ${
            promptType === "General" ? "border-primary" : "border-fuchsia-400"
          }`}
        >
          {promptType}
        </Badge>
      </CardContent>
    </Card>
  );
};
