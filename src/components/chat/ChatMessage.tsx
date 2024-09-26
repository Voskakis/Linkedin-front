'use client'

import React from 'react';
import styles from '../../styles/chat.module.css';

export default function ChatMessage({ message }: {
    message: string;
}) {
  return (
    <div className={styles.chatMessage}>
      {message}
    </div>
  );
};
