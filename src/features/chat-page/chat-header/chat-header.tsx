import { ExtensionModel } from "@/features/extensions-page/extension-services/models";
import { CHAT_DEFAULT_PERSONA } from "@/features/theme/theme-config";
import { InfoIcon, VenetianMask } from "lucide-react";
import { FC } from "react";
import { ChatDocumentModel, ChatThreadModel } from "../chat-services/models";
import { DocumentDetail } from "./document-detail";
import { ExtensionDetail } from "./extension-detail";
import Image from "next/image";
import { Popover, PopoverContent, PopoverTrigger } from "@/ui/popover";
import { cn } from "@/features/ui/lib";
// import { PersonaDetail } from "./persona-detail";

interface Props {
  chatThread: ChatThreadModel;
  chatDocuments: Array<ChatDocumentModel>;
  extensions: Array<ExtensionModel>;
  messages: any;
}

export const ChatHeader: FC<Props> = (props) => {
  const persona =
    props.chatThread.personaMessageTitle === "" ||
    props.chatThread.personaMessageTitle === undefined
      ? CHAT_DEFAULT_PERSONA
      : props.chatThread.personaMessageTitle;

  return (
    <div className="bg-transparent flex items-center py-2 pt-5">
      <div
        className={cn(
          "container max-w-3xl flex justify-between items-center",
          props.messages.length === 0 ? "justify-center" : "justify-between"
        )}
      >
        <div className="flex flex-col">
          {props.chatThread.personaMessageTitle !== "Quadra GPT" && (
            <div
              className={cn(
                "flex gap-4",
                props.messages.length === 0 && "flex-col items-center"
              )}
            >
              {props.chatThread.personaIcon &&
                props.chatThread.personaShortDescription && (
                  <>
                    <div className="w-12 h-12 rounded-full dark:bg-white/10 bg-sky-100 flex items-center justify-center top-11">
                      <Image
                        src={props.chatThread?.personaIcon}
                        alt="persona icon"
                        width={25}
                        height={25}
                      />
                    </div>
                    <div
                      className={
                        (cn("flex gap-1"),
                        props.messages.length === 0
                          ? " flex flex-col items-center"
                          : "flex flex-row items-center")
                      }
                    >
                      <span className="text-lg">{props.chatThread.name}</span>
                      <div className="flex items-center">
                        {props.messages.length === 0 ? (
                          <p className="text-muted-foreground text-sm font-light text-center">
                            {props.chatThread.personaShortDescription}
                          </p>
                        ) : (
                          <Popover>
                            <PopoverTrigger>
                              <InfoIcon size={16} className="ml-1" />
                            </PopoverTrigger>
                            <PopoverContent className="text-sm font-light text-muted-foreground">
                              {props.chatThread.personaShortDescription}
                            </PopoverContent>
                          </Popover>
                        )}
                      </div>
                    </div>
                  </>
                )}
            </div>
          )}
          {props.chatThread.personaIcon &&
            props.chatThread.personaMessageTitle === "Quadra GPT" && (
              <div
                className={cn(
                  "flex gap-4",
                  props.messages.length === 0 && "flex-col items-center"
                )}
              >
                <>
                  <div className="w-12 h-12 rounded-full dark:bg-white/10 bg-sky-100 flex items-center justify-center top-11">
                    <Image
                      src={props.chatThread?.personaIcon}
                      alt="persona icon"
                      width={25}
                      height={25}
                    />
                  </div>
                  <div
                    className={
                      (cn("flex gap-1"),
                      props.messages.length === 0
                        ? " flex flex-col items-center"
                        : "flex flex-row items-center")
                    }
                  >
                    <span className="text-lg">Quadra QBot</span>
                    <div className="flex items-center">
                      {props.messages.length === 0 ? (
                        <p className="text-muted-foreground text-sm font-light text-center">
                          {props.chatThread.personaShortDescription}
                        </p>
                      ) : (
                        <Popover>
                          <PopoverTrigger>
                            <InfoIcon size={16} className="ml-1" />
                          </PopoverTrigger>
                          <PopoverContent className="text-sm font-light text-muted-foreground">
                            {props.chatThread.personaShortDescription}
                          </PopoverContent>
                        </Popover>
                      )}
                    </div>
                  </div>
                </>
              </div>
            )}
        </div>
        {props.messages.length > 0 && (
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
        )}
      </div>
    </div>
  );
};
