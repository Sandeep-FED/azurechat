"use client";

import React from "react";
import { LoadingIndicator } from "../../loading";

interface ChatInputAreaProps {
  status?: string;
}

export const ChatInputForm = React.forwardRef<
  HTMLFormElement,
  React.HTMLAttributes<HTMLFormElement> & ChatInputAreaProps // Add ChatInputAreaProps to the type definition
>(({ status, ...props }, ref) => (
  <div className="absolute bottom-0 w-full py-4 ">
    <div className="container max-w-3xl flex flex-col gap-1">
      <ChatInputStatus status={status} />
      <div className="backdrop-blur-xl dark:bg-black/25 bg-gray-200/25  rounded-md overflow-hidden dark:focus-within:border-gray-300 focus-within:border-gray-900 border">
        <form ref={ref} className="p-[2px]" {...props}>
          {props.children}
        </form>
      </div>
    </div>
  </div>
));
ChatInputForm.displayName = "ChatInputArea";

export const ChatInputStatus = (props: { status?: string }) => {
  if (props.status === undefined || props.status === "") return null;
  return (
    <div className=" flex justify-center">
      <div className="border bg-background p-2 px-5  rounded-full flex gap-2 items-center text-sm">
        <LoadingIndicator isLoading={true} /> {props.status}
      </div>
    </div>
  );
};

export const ChatInputActionArea = (props: { children?: React.ReactNode }) => {
  return <div className="flex justify-between p-2">{props.children}</div>;
};

export const ChatInputPrimaryActionArea = (props: {
  children?: React.ReactNode;
}) => {
  return <div className="flex gap-2">{props.children}</div>;
};

export const ChatInputSecondaryActionArea = (props: {
  children?: React.ReactNode;
}) => {
  return <div className="flex">{props.children}</div>;
};
