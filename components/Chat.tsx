"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { userInput } from "@/actions/chatAi";

type Message = {
  role: "user" | "assistant" | "system";
  content: string;
  createdAt: number;
};

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: `Hi there! 👋 I'm Alex. How can I help with your web or app development needs today?

Feel free to share your project details, and I'll guide you from there! 😊
      `,
      createdAt: Date.now()
    },
  ]);
  const [value, setValue] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [showChat, setShowChat] = useState<boolean>(false);
  const [newMessage, setNewMessage] = useState<number>(1);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setValue(e.target.value);

  const handleSubmit = async () => {
    if (!value.trim()) return;

    setLoading(true);

    try {
      // Add the user's message to the state
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: "user", content: formatResponse(value), createdAt: Date.now() },
      ]);
      setValue("");

      // Get the chatbot's response
      const result = await userInput(value, messages);

      const formattedResponse: Message = {
        role: "assistant",
        content: formatResponse(result),
        createdAt: Date.now()
      };

      // Add the chatbot's response to the state
      setMessages((prevMessages) => [...prevMessages, formattedResponse]);
    } catch (error) {
      console.error(error);

      // Add an error message to the state
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          role: "assistant",
          content: "Something went wrong. Please try again later.",
          createdAt: Date.now()
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const formatResponse = (text: string) => {
    let formattedText = text.replace(/\n/g, "<br />");
    formattedText = formattedText.replace(/\*\*(.*?)\*\*/g, '<strong style="color: white;">$1</strong>');
    formattedText = formattedText.replace(/\*(.*?)\*/g, "<em>$1</em>");
    return formattedText;
  };

  // Automatically scroll to the bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Disable scrolling when chat is open
  useEffect(() => {
    if (showChat) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [showChat]);

  return (
    <div className={`flex items-end`}>
      {/** Show Hide Chat button */}
      <>
        <button onClick={() => {setShowChat(true); setNewMessage(0)}} className={`
          fixed bottom-10 right-10 z-20
          flex justify-center items-center
          w-[50px] h-[50px] rounded-full
          bg-gradient-6
        `}>
          <div className={`
            flex justify-center items-center
            w-[45px] h-[45px] rounded-full
          bg-[#050322] p-1
          `}>
            <Image
              alt="chat logo"
              src="/icons/logos/bot.svg"
              width={0}
              height={0}
              className="w-[70%] h-[70%]"
            />
          </div>
        </button>
        {/** New Message */}
        { newMessage !== 0 &&
          <p onClick={() => {setShowChat(true)}} className={`
            fixed bottom-[70px] right-[70px] z-20
            flex justify-center items-center
            w-[18px] h-[18px] rounded-full
            bg-[#ff0202] !text-[white]
          `}>{newMessage}</p>
        }
      </>

      {/** Full width chat Layout */}
      <div onClick={() => setShowChat(false)} className={`
        fixed ${showChat ? "right-0" : "-right-full"} bottom-0
        w-full max-w-full
        flex justify-end 
        transition-all duration-300
        min-h-[100dvh] z-20
      `}>
        {/** Chat Container */}
        <div onClick={(e) => e.stopPropagation()} className={`
          relative
          flex flex-col justify-end 
        bg-[white]
          w-[450px] max-w-full
        `}>

          {/** Chat header Container */}
          <div className={`
            absolute top-0 left-0 h-[70px] w-full flex justify-center items-center
            bg-[#050322] !text-[#f3f3f3]
          `}>
            <p onClick={() => setShowChat(false)} className={`absolute left-10 cursor-pointer !text-[#e2e2e2]`}>X</p>
            <p className="!text-[#e2e2e2]">Customer Support</p>
          </div>

          {/** Messeges container */}
          <div onClick={(e) => e.stopPropagation()} className="w-full px-5 flex flex-col items-center flex-grow overflow-y-auto pt-2 bg-[#e6e6e6] mt-[70px] h-[0]">
            { /** Loop throught the Messages */
            messages.map((message, index) => (
              <div 
                key={index}
                className={`
                  mb-1 rounded-md px-3 py-1
                  max-w-[80%] 
                  ${message.role === "assistant" 
                    ? "self-start bg-[#114163]" 
                    : "self-end bg-[#6e236e]"
                  }
                `}
              >
                <p className="leading-[20px] !text-[#e2e2e2]" dangerouslySetInnerHTML={{ __html: message.content }}/>
                <p className={`text-[10px] !text-[#bebebe]`}>
                  {new Date(message.createdAt).toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: true,
                  })}
                </p>
              </div>
            ))}
            {/** Loading the bot message add typing */}
            {loading && <p className={`!text-[#bbbbbb] pb-3 self-start`}>typing...</p>}
            {/* Invisible div to always scroll into view */}
            <div ref={messagesEndRef} />
          </div>

          {/** Input / button container */}
          <form 
          onSubmit={(e) => {e.preventDefault(); handleSubmit()}}
          className="flex w-full px-3 bg-[#050322] border-t border-[#161744] py-4">
            <textarea
              value={value}
              id="messageAi"
              onChange={onChange}
              placeholder="Enter question here"
              className="rounded-[10px] px-3 pt-2 flex-1 bg-[#404463] !text-[white] flex items-center max-h-[100px] overflow-y-auto resize-none"
              rows={1}
              style={{
                height: 'auto',
                maxHeight: '100px',
              }}
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              onInput={(e:any) => {
                e.target.style.height = 'auto'; // Reset the height to auto to calculate new height
                e.target.style.height = `${e.target.scrollHeight}px`; // Set height based on scrollHeight
              }}
            />
            <button
              className="!text-[white] w-[35px] h-[35px] flex justify-center items-center ml-3"
              disabled={loading}
            >
              <Image
                alt="send logo"
                src="/icons/logos/send.svg"
                width={0}
                height={0}
                className="w-full h-full"
              />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}