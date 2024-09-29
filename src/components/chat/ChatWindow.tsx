"use client";

import { Conversation } from "@/lib/interfaces/messaging";
import { Box, Typography, TextField, Button } from "@mui/material";
import { useState } from "react";

export default function ChatWindow({
  activeConversation,
  sendMessage,
}: {
  activeConversation: Conversation | null;
  sendMessage: (receiverId: string, content: string) => void;
}) {
  const [message, setMessage] = useState("");

  const handleSendMessage = () => {
    if (activeConversation && message.trim()) {
      sendMessage(activeConversation.userId, message);
      setMessage("");
    }
  };

  const handleKeyUp = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" && message.trim()) {
      handleSendMessage();
    }
  };

  return (
    <Box sx={{ flex: 1, padding: 2, display: "flex", flexDirection: "column" }}>
      {activeConversation ? (
        <>
          <Typography variant="h6">
            Chat with User: {activeConversation.userId}
          </Typography>
          <Box
            sx={{
              flex: 1,
              overflowY: "auto",
              borderBottom: "1px solid #ddd",
              padding: 2,
            }}
          >
            {activeConversation.messages.map((msg, idx) => (
              <Box key={idx} sx={{ marginBottom: 2 }}>
                <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                  {msg.senderId}:
                </Typography>
                <Typography variant="body2">{msg.content}</Typography>
                <Typography variant="caption" color="textSecondary">
                  {new Date(msg.sentAt).toLocaleString()}
                </Typography>
              </Box>
            ))}
          </Box>
          <Box sx={{ display: "flex", marginTop: 2 }}>
            <TextField
              fullWidth
              variant="outlined"
              label="Type a message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyUp={handleKeyUp}
            />
            <Button
              variant="contained"
              sx={{ marginLeft: 1 }}
              onClick={handleSendMessage}
              disabled={!message.trim()}
            >
              Send
            </Button>
          </Box>
        </>
      ) : (
        <Typography variant="h6">
          Select a conversation to start chatting
        </Typography>
      )}
    </Box>
  );
}
