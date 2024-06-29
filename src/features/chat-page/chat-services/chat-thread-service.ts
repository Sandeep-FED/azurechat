"use server";
import "server-only";

import {
  getCurrentUser,
  userHashedId,
  userSession,
} from "@/features/auth-page/helpers";
import { RedirectToChatThread } from "@/features/common/navigation-helpers";
import { ServerActionResponse } from "@/features/common/server-action-response";
import { uniqueId } from "@/features/common/util";
import {
  CHAT_DEFAULT_PERSONA,
  NEW_CHAT_NAME,
} from "@/features/theme/theme-config";
import { SqlQuerySpec } from "@azure/cosmos";
import { HistoryContainer } from "../../common/services/cosmos";
import { DeleteDocuments } from "./azure-ai-search/azure-ai-search";
import { FindAllChatDocuments } from "./chat-document-service";
import { FindAllChatMessagesForCurrentUser } from "./chat-message-service";
import {
  CHAT_THREAD_ATTRIBUTE,
  ChatDocumentModel,
  ChatThreadModel,
} from "./models";

export const FindAllChatThreadForCurrentUser = async (): Promise<
  ServerActionResponse<Array<ChatThreadModel>>
> => {
  try {
    const querySpec: SqlQuerySpec = {
      query:
        "SELECT * FROM root r WHERE r.type=@type AND r.userId=@userId AND r.isDeleted=@isDeleted ORDER BY r.createdAt DESC",
      parameters: [
        {
          name: "@type",
          value: CHAT_THREAD_ATTRIBUTE,
        },
        {
          name: "@userId",
          value: await userHashedId(),
        },
        {
          name: "@isDeleted",
          value: false,
        },
      ],
    };

    const { resources } = await HistoryContainer()
      .items.query<ChatThreadModel>(querySpec, {
        partitionKey: await userHashedId(),
      })
      .fetchAll();
    return {
      status: "OK",
      response: resources,
    };
  } catch (error) {
    return {
      status: "ERROR",
      errors: [{ message: `${error}` }],
    };
  }
};

export const FindChatThreadForCurrentUser = async (
  id: string
): Promise<ServerActionResponse<ChatThreadModel>> => {
  try {
    const querySpec: SqlQuerySpec = {
      query:
        "SELECT * FROM root r WHERE r.type=@type AND r.userId=@userId AND r.id=@id AND r.isDeleted=@isDeleted",
      parameters: [
        {
          name: "@type",
          value: CHAT_THREAD_ATTRIBUTE,
        },
        {
          name: "@userId",
          value: await userHashedId(),
        },
        {
          name: "@id",
          value: id,
        },
        {
          name: "@isDeleted",
          value: false,
        },
      ],
    };

    const { resources } = await HistoryContainer()
      .items.query<ChatThreadModel>(querySpec)
      .fetchAll();

    if (resources.length === 0) {
      return {
        status: "NOT_FOUND",
        errors: [{ message: `Chat thread not found` }],
      };
    }

    return {
      status: "OK",
      response: resources[0],
    };
  } catch (error) {
    return {
      status: "ERROR",
      errors: [{ message: `${error}` }],
    };
  }
};

export const SoftDeleteChatThreadForCurrentUser = async (
  chatThreadID: string
): Promise<ServerActionResponse<ChatThreadModel>> => {
  try {
    const chatThreadResponse = await FindChatThreadForCurrentUser(chatThreadID);

    if (chatThreadResponse.status === "OK") {
      const chatResponse = await FindAllChatMessagesForCurrentUser(
        chatThreadID
      );

      if (chatResponse.status !== "OK") {
        return chatResponse;
      }
      const chats = chatResponse.response;

      chats.forEach(async (chat) => {
        const itemToUpdate = {
          ...chat,
        };
        itemToUpdate.isDeleted = true;
        await HistoryContainer().items.upsert(itemToUpdate);
      });

      const chatDocumentsResponse = await FindAllChatDocuments(chatThreadID);

      if (chatDocumentsResponse.status !== "OK") {
        return chatDocumentsResponse;
      }

      const chatDocuments = chatDocumentsResponse.response;

      if (chatDocuments.length !== 0) {
        await DeleteDocuments(chatThreadID);
      }

      chatDocuments.forEach(async (chatDocument: ChatDocumentModel) => {
        const itemToUpdate = {
          ...chatDocument,
        };
        itemToUpdate.isDeleted = true;
        await HistoryContainer().items.upsert(itemToUpdate);
      });

      chatThreadResponse.response.isDeleted = true;
      await HistoryContainer().items.upsert(chatThreadResponse.response);
    }

    return chatThreadResponse;
  } catch (error) {
    return {
      status: "ERROR",
      errors: [{ message: `${error}` }],
    };
  }
};

export const EnsureChatThreadOperation = async (
  chatThreadID: string
): Promise<ServerActionResponse<ChatThreadModel>> => {
  const response = await FindChatThreadForCurrentUser(chatThreadID);
  const currentUser = await getCurrentUser();
  const hashedId = await userHashedId();

  if (response.status === "OK") {
    if (currentUser.isAdmin || response.response.userId === hashedId) {
      return response;
    }
  }

  return response;
};

export const AddExtensionToChatThread = async (props: {
  chatThreadId: string;
  extensionId: string;
}): Promise<ServerActionResponse<ChatThreadModel>> => {
  try {
    const response = await FindChatThreadForCurrentUser(props.chatThreadId);
    if (response.status === "OK") {
      const chatThread = response.response;

      const existingExtension = chatThread.extension.find(
        (e) => e === props.extensionId
      );

      if (existingExtension === undefined) {
        chatThread.extension.push(props.extensionId);
        return await UpsertChatThread(chatThread);
      }

      return {
        status: "OK",
        response: chatThread,
      };
    }

    return response;
  } catch (error) {
    return {
      status: "ERROR",
      errors: [{ message: `${error}` }],
    };
  }
};

export const RemoveExtensionFromChatThread = async (props: {
  chatThreadId: string;
  extensionId: string;
}): Promise<ServerActionResponse<ChatThreadModel>> => {
  const response = await FindChatThreadForCurrentUser(props.chatThreadId);
  if (response.status === "OK") {
    const chatThread = response.response;
    chatThread.extension = chatThread.extension.filter(
      (e) => e !== props.extensionId
    );

    return await UpsertChatThread(chatThread);
  }

  return response;
};

export const UpsertChatThread = async (
  chatThread: ChatThreadModel
): Promise<ServerActionResponse<ChatThreadModel>> => {
  try {
    if (chatThread.id) {
      const response = await EnsureChatThreadOperation(chatThread.id);
      if (response.status !== "OK") {
        return response;
      }
    }

    chatThread.lastMessageAt = new Date();
    const { resource } = await HistoryContainer().items.upsert<ChatThreadModel>(
      chatThread
    );

    if (resource) {
      return {
        status: "OK",
        response: resource,
      };
    }

    return {
      status: "ERROR",
      errors: [{ message: `Chat thread not found` }],
    };
  } catch (error) {
    return {
      status: "ERROR",
      errors: [{ message: `${error}` }],
    };
  }
};

export const CreateChatThread = async (): Promise<
  ServerActionResponse<ChatThreadModel>
> => {
  try {
    const modelToSave: ChatThreadModel = {
      name: NEW_CHAT_NAME,
      useName: (await userSession())!.name,
      userId: await userHashedId(),
      id: uniqueId(),
      createdAt: new Date(),
      lastMessageAt: new Date(),
      bookmarked: false,
      isDeleted: false,
      type: CHAT_THREAD_ATTRIBUTE,
      personaMessage: "",
      personaMessageTitle: CHAT_DEFAULT_PERSONA,
      extension: [],
      personaIcon:
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAZAAAAGQCAYAAACAvzbMAAAACXBIWXMAAFxGAABcRgEUlENBAAAF8WlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNi4wLWMwMDYgNzkuMTY0NjQ4LCAyMDIxLzAxLzEyLTE1OjUyOjI5ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdEV2dD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlRXZlbnQjIiB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgMjIuMiAoV2luZG93cykiIHhtcDpDcmVhdGVEYXRlPSIyMDIxLTAzLTE3VDEwOjIzOjQwKzA1OjMwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDIxLTAzLTE3VDEwOjIzOjQwKzA1OjMwIiB4bXA6TW9kaWZ5RGF0ZT0iMjAyMS0wMy0xN1QxMDoyMzo0MCswNTozMCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDowODQwZjdkYi03MmZlLWQzNDEtOGMwZi01NTRjNGRmNjcwOGMiIHhtcE1NOkRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDpiYjllNzY3Yi00OTgxLWNhNDQtODBlNi1m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",
      personaShortDescription: "Quadra QBot",
    };

    const { resource } = await HistoryContainer().items.create<ChatThreadModel>(
      modelToSave
    );
    if (resource) {
      return {
        status: "OK",
        response: resource,
      };
    }

    return {
      status: "ERROR",
      errors: [{ message: `Chat thread not found` }],
    };
  } catch (error) {
    return {
      status: "ERROR",
      errors: [{ message: `${error}` }],
    };
  }
};

export const UpdateChatTitle = async (
  chatThreadId: string,
  title: string
): Promise<ServerActionResponse<ChatThreadModel>> => {
  try {
    const response = await FindChatThreadForCurrentUser(chatThreadId);
    if (response.status === "OK") {
      const chatThread = response.response;
      // take the first 30 characters
      chatThread.name = title.substring(0, 30);
      return await UpsertChatThread(chatThread);
    }
    return response;
  } catch (error) {
    return {
      status: "ERROR",
      errors: [{ message: `${error}` }],
    };
  }
};

export const CreateChatAndRedirect = async () => {
  const response = await CreateChatThread();
  if (response.status === "OK") {
    RedirectToChatThread(response.response.id);
  }
};
