import React from 'react'
import {
  MultiChatSocket,
  useMultiChatLogic,
  MultiChatWindow
} from "react-chat-engine-advanced";


const ChatsPage = ({user}) => {
  const chatProps = useMultiChatLogic(
    "fbc252c1-112f-4040-9fd0-76a63b2e86e4",
    user.username,
    user.secret
  );
  return (
    <div style={{height:'100vh'}}>
      <MultiChatSocket {...chatProps}/>
      <MultiChatWindow {...chatProps} style={{height:'100%'}}/>
    </div>
  )
}

export default ChatsPage