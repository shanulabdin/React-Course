import { useState } from "react";
import { Chatbot } from 'supersimpledev'
import LoadingGif from '../assets/loading-spinner.gif';
import './ChatInput.css';
import dayjs from 'dayjs';

export function ChatInput({chatMessages, setChatMessages}){
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  function saveInputText(event) {
    setInputText(event.target.value);
  }

  function handleKeyDown(event){
    if(event.key === 'Enter'){
      sendMessage();
    } else if(event.key === 'Escape'){
      setInputText('');
    }
  }

  async function sendMessage() {
    if(isLoading || inputText === ''){
      return;
    }
    setIsLoading(true);

    const newChatMessages = [
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
        message: <img className="loading-spinner" src={LoadingGif} />,
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

  function clearMessages(){
    setChatMessages([]);
  }

  return (
    <div className="chat-input-container">
      <input 
        placeholder="Send a message to Chatbot" 
        size="30" 
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