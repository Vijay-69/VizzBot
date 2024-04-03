"use client";

import { Companion } from "@prisma/client";
import { ChatMessage, ChatMessageProps } from "./chat-message";
import { ElementRef, useEffect, useRef, useState } from "react";
import { time } from "console";

interface ChatMessagesProps {
  messages: ChatMessageProps[];   // imported from chatmessage
  isLoading: boolean;
  companion: Companion
}

export const ChatMessages = ({
  messages = [],
  isLoading,
  companion,
}: ChatMessagesProps) => {

  const scrollRef  = useRef<ElementRef<"div">>(null);

   const[fakeLoading, setfakeLoading] = useState(messages.length===0? true : false);

   useEffect(()=>{
    
    const timeout = setTimeout(() => {
      setfakeLoading(false);
    },1000);

    return () =>{
      clearTimeout(timeout);
    }

   },[]);

   useEffect(() => {
    scrollRef?.current?.scrollIntoView({behavior:"smooth"});
   },[messages.length])

  return (
    <div className="flex-1 overflow-y-auto pr-4">

      <ChatMessage
        isLoading= {fakeLoading}
        src={companion.src}
        role="system"
        content={`Hello, I am ${companion.name},${companion.description}`}
      />
      
    {messages.map((message)=>(
      <ChatMessage
      key = {message.content}
       role={message.role}
        src = {companion.src}
        content={message.content}
      />
    ))}

    {isLoading && (
      <ChatMessage
       role = "system"
       src={companion.src}
       isLoading
      />
    )}
    
    <div ref = {scrollRef}/>
    </div>
  )
}