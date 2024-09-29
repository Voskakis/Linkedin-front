'use client'

import { Conversation } from '@/lib/interfaces/messaging';
import { List, ListItem, ListItemText, Typography, Box } from '@mui/material';

export default function ConversationsList({ conversations, activeConversation, onSelectConversation }: {
  conversations: Conversation[];
    activeConversation: Conversation | null;
    onSelectConversation: (userId: string) => void;
}) {
    return (
        <Box sx={{ width: '300px', borderRight: '1px solid #ddd', padding: 2 }}>
            <Typography variant="h6">Conversations</Typography>
            <List>
                {conversations.map((conv) => (
                    <ListItem
                        button
                        key={conv.userId}
                        onClick={() => onSelectConversation(conv.userId)}
                        selected={activeConversation?.userId === conv.userId}
                    >
                        <ListItemText primary={`User: ${conv.userId}`} />
                    </ListItem>
                ))}
            </List>
        </Box>
    );
};
