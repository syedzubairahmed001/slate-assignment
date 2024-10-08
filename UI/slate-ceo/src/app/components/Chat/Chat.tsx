"use client";
import { useState } from "react";

import ChatBubble from "../ChatBubble/ChatBubble";

import axios from "axios";

const Chat = () => {
  const [chatState, setChatState] = useState<any>([
    {
      message: "hi",
      from: "system",
    },
    {
      message: "hi",
      from: "user",
    },
  ]);
  const [input, setInput] = useState<string>("");
  const [isLoading, setisLoading] = useState<boolean>(false);

  const fetchResults = async () => {
    setisLoading(true);
    const i = input;
    setInput("");

    const r = await axios.post("http://localhost:4008/transact", {
      input: i,
    });
    setisLoading(false);
    setChatState((prev: any) => {
      return [
        ...prev,
        {
          message: JSON.stringify(r.data),
          from: "system",
        },
      ];
    });
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-20">
      <div className="flex-grow w-full">
        {chatState &&
          chatState.map((e: any) => (
            <ChatBubble message={e.message} messageDisplayType={e.from} />
          ))}
      </div>
      <div className="w-full flex h-16">
        <div className="flex-grow">
          <input
            className="w-full bg-slate-200 p-3 text-lg rounded-lg"
            value={input}
            onChange={(e) => {
              const val = e.target.value;
              setInput(val);
            }}
          ></input>
        </div>
        <div>
          <button
            className="bg px-9 py-3 bg-slate-600 text-white text-lg rounded-lg ml-3"
            onClick={async () => {
              setChatState((prev: any) => {
                return [
                  ...prev,
                  {
                    message: input,
                    from: "user",
                  },
                ];
              });
              await fetchResults();
            }}
          >
            {isLoading ? "loading..." : "Send"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
