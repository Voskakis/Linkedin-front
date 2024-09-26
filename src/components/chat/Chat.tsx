'use client'

import { useState } from 'react';
import ChatWindow from './ChatWindow';
import ChatInput from './ChatInput';
import { useSignalR } from '@/lib/signalR';
import { Fab, Box, Modal, IconButton } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import CloseIcon from '@mui/icons-material/Close';

export default function Chat() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const { messages, sendMessage } = useSignalR('https://your-api-url/chatHub', (message: string) => {
    console.log('New message received: ', message);
  });

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <div>
      <Fab 
        color="primary" 
        aria-label="chat" 
        onClick={toggleChat} 
        style={{ position: 'fixed', bottom: 20, right: 20 }}>
        <ChatIcon />
      </Fab>

      <Modal open={isChatOpen} onClose={toggleChat}>
        <Box sx={{
          position: 'fixed',
          bottom: 0,
          right: 0,
          width: '300px',
          height: '400px',
          backgroundColor: 'white',
          borderRadius: '10px 10px 0 0',
          boxShadow: 24,
          padding: 2,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3>Chat</h3>
            <IconButton onClick={toggleChat}>
              <CloseIcon />
            </IconButton>
          </Box>

          <Box sx={{ flex: 1, overflowY: 'auto', marginBottom: 2 }}>
            <ChatWindow messages={messages} />
          </Box>

          <ChatInput sendMessage={sendMessage} />
        </Box>
      </Modal>
    </div>
  );
};