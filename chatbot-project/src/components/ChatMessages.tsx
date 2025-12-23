import { useAutoScroll } from "./useAutoScroll";
import { ChatMessage } from "./ChatMessage";
import './ChatMessages.css';

type ChatMessagesProps = {
  chatMessages: {
    id: string;
    message: string;
    sender: 'user' | 'robot';
    time?: string;
  }[];
};

function ChatMessages({ chatMessages }: ChatMessagesProps){
  const chatMessagesRef = useAutoScroll([chatMessages])

  return (
    <div className="chat-messages-container" ref={chatMessagesRef}>
      {chatMessages.map((chatMessage) => {
        return (
          <ChatMessage 
            message={chatMessage.message}
            sender={chatMessage.sender}
            time={chatMessage.time}
            key={chatMessage.id}
          />
        );
      })}
    </div>
  );
}

export default ChatMessages;