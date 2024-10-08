"use client";

type ChatBubbleProps = {
  message: string;
  messageDisplayType: "user" | "system";
};

const ChatBubble = (props: ChatBubbleProps) => {
  return (
    <div
      className={`flex mb-1 ${
        props.messageDisplayType === "system" ? "justify-start" : "justify-end"
      }`}
    >
      {props.messageDisplayType === "system" ? (
        <div
          className="p-3 bg-slate-300  inline-block rounded-lg max-w-96 "
          style={{ borderTopLeftRadius: "0px" }}
        >
          <p className="w-full inline-block">{props.message}</p>
        </div>
      ) : (
        <div
          className="p-3 bg-slate-600  inline-block rounded-lg text-white"
          style={{ borderTopRightRadius: "0px" }}
        >
          <p>{props.message}</p>
        </div>
      )}
    </div>
  );
};

export default ChatBubble;
