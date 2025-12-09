import { useState, useRef, useEffect } from 'react'
import { Chatbot } from 'supersimpledev'
import './App.css'

function ChatInput({chatMessages, setChatMessages}){
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
        id: crypto.randomUUID()
      }
    ]

    setChatMessages([
      ...newChatMessages, 
      {
        message: <img className="loading-spinner" src="../loading-spinner.gif" />,
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
        id: crypto.randomUUID()
      }
    ]);

    setIsLoading(false);
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
    </div>
  )
}

function ChatMessage( {message, sender} ){
  // const message = props.message;
  // const sender = props.sender;

  // const {message, sender} = props;

  /*
  if (sender === 'robot'){
    return (
      <div>
        <img src="../robot.png" width="50" />
        {message}
      </div>
    );
  }
  */

  return (
    <div className={
      sender === 'user' 
        ? 'chat-message-user' 
        : 'chat-messege-robot'
    }>
      {sender === 'robot' && (
        <img src="../robot.png" className="chat-message-profile" />
      )}

      <div className="chat-messege-text">
        {message}
      </div>
      {sender === 'user' && (
        <img src="../user.png" className="chat-message-profile" />
      )}
    </div>
  );
}

function useAutoScroll(dependencies){
  const containerRef = useRef(null);

  useEffect(() => {
    const containerElem = containerRef.current;
    if (containerElem) {
      containerElem.scrollTop = containerElem.scrollHeight;
    }
  }, dependencies);

  return containerRef;
}

function ChatMessages({ chatMessages }){
  const chatMessagesRef = useAutoScroll([chatMessages])

  return (
    <div className="chat-messages-container" ref={chatMessagesRef}>
      {chatMessages.map((chatMessage) => {
        return (
          <ChatMessage 
            message={chatMessage.message}
            sender={chatMessage.sender}
            key={chatMessage.id}
          />
        );
      })}
    </div>
  );
}

function App(){
  const [chatMessages, setChatMessages] = useState([]);
  // const [chatMessages, setChatMessages] = array;
  // const chatMessages = array[0];
  // const setChatMessages = array[1];
  
  return (
    <div className="app-container">
      {chatMessages.length === 0 && (
        <p className="wellcome-message" >Welcome to the chatbot project! Send a message using the textbox below.</p>
      )}
      <ChatMessages 
        chatMessages={chatMessages}
      />
      <ChatInput 
        chatMessages={chatMessages}
        setChatMessages={setChatMessages}
      />
    </div>
  );
}

export default App
