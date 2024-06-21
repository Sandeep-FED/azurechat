"use client";

import {
  ChatDocumentModel,
  ChatMessageModel,
} from "@/features/chat-page/chat-services/models";
import { ChatMessageArea } from "@/features/ui/chat/chat-message-area/chat-message-area";
import ChatMessageContainer from "@/features/ui/chat/chat-message-area/chat-message-container";
import ChatMessageContentArea from "@/features/ui/chat/chat-message-area/chat-message-content";
import MessageContent from "../chat-page/message-content";
import { useTheme } from "next-themes";

interface ReportingChatPageProps {
  messages: Array<ChatMessageModel>;
  chatDocuments: Array<ChatDocumentModel>;
}

export default function ReportingChatPage(props: ReportingChatPageProps) {
  const { theme } = useTheme();

  const botIcon =
    theme === "dark" ? "/QBot_Dark_Icon.svg" : "/QBot_Light_Icon.svg";

  return (
    <main className="flex flex-1 relative flex-col">
      <ChatMessageContainer>
        <ChatMessageContentArea>
          {props.messages.map((message) => {
            return (
              <ChatMessageArea
                key={message.id}
                profileName={message.name}
                role={message.role}
                onCopy={() => {
                  navigator.clipboard.writeText(message.content);
                }}
                profilePicture={
                  message.role === "assistant" ? botIcon : undefined
                }
              >
                <MessageContent message={message} />
              </ChatMessageArea>
            );
          })}
        </ChatMessageContentArea>
      </ChatMessageContainer>
    </main>
  );
}
