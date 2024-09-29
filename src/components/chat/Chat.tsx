"use client";

import { Box, Divider } from "@mui/material";
import ConversationsList from "./ConversationsList";
import ChatWindow from "./ChatWindow";
import { useChat } from "@/lib/contexts/ChatContext";

export default function ChatPage() {
  const chatContext = useChat();
  if (!chatContext) {
    return <p>Loading chat...</p>;
  }
  const {
    conversations,
    activeConversation,
    setActiveConversation,
    sendMessage,
  } = chatContext;
  return (
    <Box sx={{ display: "flex" }}>
      <ConversationsList
        conversations={conversations}
        activeConversation={activeConversation}
        onSelectConversation={setActiveConversation}
      />
      <Divider orientation="vertical" flexItem />
      <ChatWindow
        activeConversation={activeConversation}
        sendMessage={sendMessage}
      />
    </Box>
  );
}
