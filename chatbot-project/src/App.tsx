import { useState, useEffect } from 'react'
import { ChatInput } from './components/ChatInput';
import ChatMessages from './components/ChatMessages';
import './App.css';
import { Chatbot } from 'supersimpledev';
import RobotPfp from './assets/robot.png'

function App(){
  const [chatMessages, setChatMessages] = useState(JSON.parse(localStorage.getItem('messages')!) || []);
  // const [chatMessages, setChatMessages] = array;
  // const chatMessages = array[0];
  // const setChatMessages = array[1];
  
  useEffect(() => {
    Chatbot.addResponses({
      greeting: "Hi there! How can I help you today?",
      help: "You can ask me about your account, orders, or general questions.",
      thanks: "You're welcome! 😊",
      welcomeBack: "Welcome back! What would you like to do next?",
      smallTalk: "I'm just a bunch of code, but I'm happy to chat! 😄",
      farewell: "Goodbye! 👋 Have a great day.",
      unknown: "Sorry, I didn’t quite understand that. Could you rephrase?",
      joke: "Why do programmers prefer dark mode? Because light attracts bugs. 🐛",
      askName: "What's your name? I'd love to know who I'm chatting with.",
      mood: "I'm running at 100% CPU happiness right now!",
      
      time: () => `The current time is ${new Date().toLocaleTimeString()}.`,
      date: () => `Today's date is ${new Date().toLocaleDateString()}.`,
    });
  }, []);

  useEffect(() => {
    localStorage.setItem('messages', JSON.stringify(chatMessages));
  })

  const title = chatMessages.length + " Messages";

  return (
    <div className="app-container">
      <title>{title}</title>

      <link rel="icon" type="image/svg+xml" href={RobotPfp} />

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