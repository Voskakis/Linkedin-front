'use client'

import { Key, useState } from 'react';
import { Box, Typography, Button, TextField } from '@mui/material';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import axios from 'axios';
import authedAxios from '@/lib/axios';

const ArticleItem = ({ article }: { article: any }) => {
  const [likes, setLikes] = useState(article.likes || 0);
  const [liked, setLiked] = useState(false);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState(article.comments || []);

  return (
    <Box border={1} padding={2} marginY={2}>
      <Typography variant="h6">{article.title}</Typography>
      <Typography>{article.content}</Typography>
      <Box display="flex" alignItems="center">
        <Button 
          onClick={async () => {
            setLiked(!liked);
            setLikes(liked ? likes - 1 : likes + 1);
            try {
              await authedAxios.post(`/api/articles/${article.id}/like`);
            } catch (error) {
              console.error('Error liking the article:', error);
            }
          }}
          startIcon={<ThumbUpAltIcon />}
        >
          {likes}
        </Button>
        <form onSubmit={async (e) => {
          e.preventDefault();
          if (!comment) return;
          try {
            const newComment = { text: comment, createdAt: new Date() };
            setComments([...comments, newComment]);
            setComment('');
            await authedAxios.post(`/api/articles/${article.id}/comment`, { text: comment });
          } catch (error) {
            console.error('Error adding comment:', error);
          }
        }}>
          <TextField
            value={comment}
            onChange={e => setComment(e.target.value)}
            placeholder="Write a comment..."
            size="small"
          />
          <Button type="submit">Comment</Button>
        </form>
      </Box>
      <Box>
        {comments.map((cmt: any, idx: Key | null | undefined) => (
          <Typography key={idx} variant="body2">
            {cmt.text}
          </Typography>
        ))}
      </Box>
    </Box>
  );
};

export default ArticleItem;
