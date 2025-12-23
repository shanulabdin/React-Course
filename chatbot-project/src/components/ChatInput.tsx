import { useState, type ReactNode } from "react";
import { Chatbot } from 'supersimpledev'
import LoadingGif from '../assets/loading-spinner.gif';
import './ChatInput.css';
import dayjs from 'dayjs';

type ChatMessage = {
  id: string;
  message: ReactNode;
  sender: 'user' | 'robot';
  time ?: number;
};

type ChatMessages = ChatMessage[];

type ChatInputProps = {
  chatMessages: ChatMessages;
  setChatMessages: (messages: ChatMessages) => void;
};

export function ChatInput({ chatMessages, setChatMessages }: ChatInputProps) {
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  function saveInputText(event: React.ChangeEvent<HTMLInputElement>) {
    setInputText(event.target.value);
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') {
      sendMessage();
    } else if (event.key === 'Escape') {
      setInputText('');
    }
  }

  async function sendMessage() {
    if (isLoading || inputText === '') {
      return;
    }
    setIsLoading(true);

    const newChatMessages: ChatMessages = [
      ...chatMessages,
      {
        message: inputText,
        sender: 'user',
        id: crypto.randomUUID(),
        time: dayjs().valueOf()
      }
    ]

    setChatMessages([
      ...newChatMessages,
      {
        message: (
          <img className="loading-spinner" alt="Loading..." src={LoadingGif} />
        ),
        sender: 'robot',
        id: crypto.randomUUID()
      }
    ]);
    setInputText('');

    const response = await Chatbot.getResponseAsync(inputText);
    setChatMessages([
      ...newChatMessages,
      {
        message: response,
        sender: 'robot',
        id: crypto.randomUUID(),
        time: dayjs().valueOf()
      }
    ]);

    setIsLoading(false);
  }

  function clearMessages() {
    setChatMessages([]);
  }

  return (
    <div className="chat-input-container">
      <input
        placeholder="Send a message to Chatbot"
        size={30}
        onChange={saveInputText}
        onKeyDown={handleKeyDown}
        value={inputText}
        className="chat-input"
      />
      <button
        onClick={sendMessage}
        disabled={isLoading}
        className="send-button"
      >Send</button>
      <button
        onClick={clearMessages}
        className="clear-button">
        Clear
      </button>
    </div>
  )
}