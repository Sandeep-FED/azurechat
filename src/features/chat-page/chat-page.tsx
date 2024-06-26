"use client";
import { ChatInput } from "@/features/chat-page/chat-input/chat-input";
import { chatStore, useChat } from "@/features/chat-page/chat-store";
import { ChatLoading } from "@/features/ui/chat/chat-message-area/chat-loading";
import { ChatMessageArea } from "@/features/ui/chat/chat-message-area/chat-message-area";
import ChatMessageContainer from "@/features/ui/chat/chat-message-area/chat-message-container";
import ChatMessageContentArea from "@/features/ui/chat/chat-message-area/chat-message-content";
import { useChatScrollAnchor } from "@/features/ui/chat/chat-message-area/use-chat-scroll-anchor";
import { useSession } from "next-auth/react";
import { FC, useEffect, useRef } from "react";
import { ExtensionModel } from "../extensions-page/extension-services/models";
import { ChatHeader } from "./chat-header/chat-header";
import {
  ChatDocumentModel,
  ChatMessageModel,
  ChatThreadModel,
} from "./chat-services/models";
import MessageContent from "./message-content";
import { useTheme } from "next-themes";
import { cn } from "../ui/lib";

interface ChatPageProps {
  messages: Array<ChatMessageModel>;
  chatThread: ChatThreadModel;
  chatDocuments: Array<ChatDocumentModel>;
  extensions: Array<ExtensionModel>;
}

export const ChatPage: FC<ChatPageProps> = (props) => {
  const { data: session } = useSession();
  const { theme } = useTheme();

  useEffect(() => {
    console.log(props.extensions);

    chatStore.initChatSession({
      chatThread: props.chatThread,
      messages: props.messages,
      userName: session?.user?.name!,
    });
  }, [props.messages, session?.user?.name, props.chatThread]);

  useEffect(() => {
    let isBingExtension = props.extensions.some(
      (ext) => ext.name === "Bing Search"
    );
    console.log(isBingExtension);
    isBingExtension &&
      chatStore.AddExtensionToChatThread(props.extensions[0].id);
  }, []);

  const { messages, loading } = useChat();

  const current = useRef<HTMLDivElement>(null);

  useChatScrollAnchor({ ref: current });

  const botIcon =
    theme === "dark"
      ? "/Intellient_Dark_Icon.png"
      : "/Intellient_Light_Icon.png";

  console.log("chat page message", messages);

  return (
    <main
      className={cn(
        "flex flex-1 relative flex-col",
        messages.length === 0 && "justify-center"
      )}
    >
      <ChatHeader
        chatThread={props.chatThread}
        chatDocuments={props.chatDocuments}
        extensions={props.extensions}
        messages={messages}
      />
      {messages.length > 1 && (
        <ChatMessageContainer ref={current}>
          <ChatMessageContentArea>
            {messages.map((message) => {
              return (
                <ChatMessageArea
                  key={message.id}
                  profileName={message.name}
                  role={message.role}
                  onCopy={() => {
                    navigator.clipboard.writeText(message.content);
                  }}
                  profilePicture={
                    message.role === "assistant"
                      ? botIcon
                      : session?.user?.image
                  }
                >
                  <MessageContent message={message} />
                </ChatMessageArea>
              );
            })}
            {loading === "loading" && <ChatLoading />}
          </ChatMessageContentArea>
        </ChatMessageContainer>
      )}
      <ChatInput />
    </main>
  );
};
