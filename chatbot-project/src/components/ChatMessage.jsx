import RobotProfileImage from '../assets/robot.png';
import UserProfileImage from '../assets/pfp.jpg';
import './ChatMessage.css';

export function ChatMessage( {message, sender} ){
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
 console.log(UserProfileImage)

  return (
    <div className={
      sender === 'user' 
        ? 'chat-message-user' 
        : 'chat-messege-robot'
    }>
      {sender === 'robot' && (
        <img src={RobotProfileImage} className="chat-message-profile" />
      )}

      <div className="chat-messege-text">
        {message}
      </div>
      {sender === 'user' && (
        <img src={UserProfileImage} className="chat-message-profile" />
      )}
    </div>
  );
}