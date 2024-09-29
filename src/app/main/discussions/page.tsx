import Chat from "@/components/chat/Chat";

export default async function DiscussionsPage() {
    return (
      <div  className="flex flex-col items-center justify-between">
        <Chat />
      </div>
    );
  }