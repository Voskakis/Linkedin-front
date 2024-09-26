'use client'

import ChatMessage from './ChatMessage';
import styles from '../../styles/chat.module.css';

export default function ChatWindow({ messages }: {
  messages: string[]
}) {
  return (
    <div className={styles.chatWindow}>
      {messages.map((msg, index) => (
        <ChatMessage key={index} message={msg} />
      ))}
    </div>
  );
};
