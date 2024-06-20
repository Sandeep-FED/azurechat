import React from "react";

export const ChatTextInput = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement> // Add ChatInputAreaProps to the type definition
>(({ ...props }, ref) => {
  return (
    <textarea
      ref={ref}
      className="p-4 w-full focus:outline-none bg-transparent resize-none
            text-sm ring-offset-background  placeholder:text-gray-600 focus-visible:outline-none dark:focus-visible:border-white border-white focus-visible:border-gray-900
      "
      placeholder="How can I make your day easier?"
      {...props}
    />
  );
});
ChatTextInput.displayName = "ChatTextInput";
