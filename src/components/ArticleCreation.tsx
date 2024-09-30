'use client'

import { useState } from 'react';
import { Box, Button, Dialog, TextField } from '@mui/material';
import authedAxios from '@/lib/axios';

const ArticleCreationPrompt = () => {
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState('');
  
  const handleCreateArticle = async () => {
    try {
      await authedAxios.post('/api/articles', { content });
      setOpen(false);
    } catch (err) {
      console.error('Failed to create article:', err);
    }
  };

  return (
    <Box>
      <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
        Create New Article
      </Button>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <Box padding={3}>
          <TextField
            label="Write your article..."
            fullWidth
            multiline
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <Button onClick={handleCreateArticle} variant="contained" color="primary">
            Post Article
          </Button>
        </Box>
      </Dialog>
    </Box>
  );
};

export default ArticleCreationPrompt;
