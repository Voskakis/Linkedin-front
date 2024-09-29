"use client";

import { Conversation } from "@/lib/interfaces/messaging";
import {
  List,
  ListItemText,
  Typography,
  Box,
  ListItemButton,
} from "@mui/material";

export default function ConversationsList({
  conversations,
  activeConversation,
  onSelectConversation,
}: {
  conversations: Conversation[];
  activeConversation: Conversation | null;
  onSelectConversation: (userId: string) => void;
}) {
  return (
    <Box>
      <Typography variant="h6">Conversations</Typography>
      <List>
        {conversations.map((conv) => (
          <ListItemButton
            key={conv.userId}
            onClick={() => onSelectConversation(conv.userId)}
            selected={activeConversation?.userId === conv.userId}
          >
            <ListItemText primary={`User: ${conv.userId}`} />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
}
