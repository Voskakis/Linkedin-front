"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { HubConnection } from "@microsoft/signalr";
import { createSignalRConnection } from "@/lib/signalR";
import { useSession } from "next-auth/react";
import { Conversation } from "../interfaces/messaging";

type ChatContextType = {
  conversations: Conversation[];
  activeConversation: Conversation | null;
  setActiveConversation: (userId: string) => void;
  sendMessage: (receiverId: string, content: string) => void;
};

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("UseChat must be used within a ChatProvider");
  }
  return context;
};

export const ChatProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: session } = useSession();
  const [connection, setConnection] = useState<HubConnection | null>(null);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConversation, setActiveConversation] =
    useState<Conversation | null>(null);

  useEffect(() => {
    if (session?.user.AccessToken) {
      const newConnection = createSignalRConnection(session.user.AccessToken);
      newConnection
        .start()
        .then(() => {
          console.log("Connected to SignalR Hub");
        })
        .catch(console.error);

      newConnection.on("ReceiveMessage", (senderId, content, sentAt) => {
        setConversations((prevConversations) => {
          const updatedConversations = prevConversations.map((conversation) =>
            conversation.userId === senderId
              ? {
                  ...conversation,
                  messages: [
                    ...conversation.messages,
                    { senderId, content, sentAt },
                  ],
                }
              : conversation
          );
          return updatedConversations;
        });
      });

      setConnection(newConnection);

      return () => {
        newConnection.stop();
      };
    }
  }, [session]);

  const sendMessage = useCallback(
    (receiverId: string, content: string) => {
      if (connection) {
        connection.send("SendMessageAsync", {
          ReceiverId: receiverId,
          Content: content,
        });
      }
    },
    [connection]
  );

  return (
    <ChatContext.Provider
      value={{
        conversations,
        activeConversation,
        setActiveConversation: (userId: string) => {
          const selectedConversation = conversations.find(
            (conv) => conv.userId === userId
          );
          if (selectedConversation) {
            setActiveConversation(selectedConversation);
          }
        },
        sendMessage,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
