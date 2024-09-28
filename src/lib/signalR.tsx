import { useState, useEffect } from 'react';
import * as signalR from '@microsoft/signalr';

let connection: signalR.HubConnection | null = null;

const createConnection = (hubUrl: string) => {
  return new signalR.HubConnectionBuilder()
    .withUrl(hubUrl)
    .withAutomaticReconnect()
    .configureLogging(signalR.LogLevel.Error)
    .build();
};

export const useSignalR = (hubUrl: string, onMessageReceived: (message: string) => void) => {
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    connection = createConnection(hubUrl);

    connection.on('ReceiveMessage', (message: string) => {
      setMessages((prevMessages) => [...prevMessages, message]);
      onMessageReceived(message);
    });

    const startConnection = async () => {
      try {
        await connection?.start();
      } catch (err) {
        console.error('SignalR connection error:', err);
      }
    };

    startConnection();

    return () => {
      if (connection) {
        connection.stop();
        console.log('SignalR connection closed.');
      }
    };
  }, [hubUrl, onMessageReceived]);

  const sendMessage = async (message: string) => {
    if (connection) {
      try {
        await connection.invoke('SendMessage', message);
      } catch (err) {
        console.error('Error sending message:', err);
      }
    }
  };

  return { messages, sendMessage };
};