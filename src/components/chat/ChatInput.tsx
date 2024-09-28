'use client'

import { useState } from 'react';
import styles from "@/styles/chat.module.css"

export default function ChatInput({ sendMessage }: {
  sendMessage: (message: string) => void;
}) {
  const [input, setInput] = useState('');

  return (
    <form onSubmit={(e) => {
        e.preventDefault();
        if (input.trim()) {
          sendMessage(input);
          setInput('');
        }}}
      className={styles.chatForm}>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className={styles.inputField}
        placeholder="Type a message..."
      />
      <button type="submit" className={styles.sendButton}>
        Send
      </button>
    </form>
  );
};
