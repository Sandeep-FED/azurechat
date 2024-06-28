import { ExtensionModel } from "@/features/extensions-page/extension-services/models";
import { CHAT_DEFAULT_PERSONA } from "@/features/theme/theme-config";
import { InfoIcon, VenetianMask } from "lucide-react";
import { FC } from "react";
import { ChatDocumentModel, ChatThreadModel } from "../chat-services/models";
import { DocumentDetail } from "./document-detail";
import { ExtensionDetail } from "./extension-detail";
import Image from "next/image";
import { Popover, PopoverContent, PopoverTrigger } from "@/ui/popover";
// import { PersonaDetail } from "./persona-detail";

interface Props {
  chatThread: ChatThreadModel;
  chatDocuments: Array<ChatDocumentModel>;
  extensions: Array<ExtensionModel>;
}

export const ChatHeader: FC<Props> = (props) => {
  const persona =
    props.chatThread.personaMessageTitle === "" ||
    props.chatThread.personaMessageTitle === undefined
      ? CHAT_DEFAULT_PERSONA
      : props.chatThread.personaMessageTitle;

  return (
    <div className="bg-transparent flex items-center py-2 pt-5">
      <div className="container max-w-3xl flex justify-between items-center">
        <div className="flex flex-col">
          {props.chatThread.personaMessageTitle === "Quadra GPT" ? (
            <span>{props.chatThread.name}</span>
          ) : (
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-full dark:bg-white/10 bg-sky-100 flex items-center justify-center top-11">
                <Image
                  src={props.chatThread.personaIcon}
                  alt="persona icon"
                  width={25}
                  height={25}
                />
              </div>
              <div className="flex flex-col gap-1">
                <span>{props.chatThread.name}</span>
                {props.chatThread.personaShortDescription.length > 70 ? (
                  <div className="flex items-center">
                    <p className="text-muted-foreground text-sm font-light">
                      {props.chatThread.personaShortDescription
                        .slice(0, 70)
                        .concat("...")}{" "}
                    </p>
                    <Popover>
                      <PopoverTrigger>
                        <InfoIcon size={16} className="ml-1" />
                      </PopoverTrigger>
                      <PopoverContent className="text-sm font-light text-muted-foreground">
                        {props.chatThread.personaShortDescription}
                      </PopoverContent>
                    </Popover>
                  </div>
                ) : (
                  <p className="text-muted-foreground text-sm font-light">
                    {props.chatThread.personaShortDescription}
                  </p>
                )}
              </div>
            </div>
          )}
          {props.chatThread.personaMessageTitle === "Quadra GPT" && (
            <span className="text-sm text-muted-foreground flex gap-1 items-center">
              <VenetianMask size={18} />
              {persona}
            </span>
          )}
        </div>
        <div className="flex gap-2">
          {/* <PersonaDetail chatThread={props.chatThread} /> */}
          <DocumentDetail chatDocuments={props.chatDocuments} />
          <ExtensionDetail
            disabled={props.chatDocuments.length !== 0}
            extensions={props.extensions}
            installedExtensionIds={props.chatThread.extension}
            chatThreadId={props.chatThread.id}
          />
        </div>
      </div>
    </div>
  );
};
