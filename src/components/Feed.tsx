'use client'

import { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import axios from 'axios';
import NewArticlePrompt from './ArticleCreation';
import ArticleItem from './ArticleItem';

export default function Timeline() {
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTimeline = async () => {
      try {
        const response = await axios.get('/api/timeline');
        setArticles(response.data);
      } catch (error) {
        console.error('Error fetching timeline:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTimeline();
  }, []);

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box>
      {/* New article creation */}
      <NewArticlePrompt />

      {/* List of articles */}
      {articles.length ? (
        articles.map(article => (
          <ArticleItem key={article.id} article={article} />
        ))
      ) : (
        <Typography>No articles to show</Typography>
      )}
    </Box>
  );
};
