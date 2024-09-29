export type Message = {
  senderId: string;
  content: string;
  sentAt: Date;
};

export type Conversation = {
  userId: string;
  messages: Message[];
};
