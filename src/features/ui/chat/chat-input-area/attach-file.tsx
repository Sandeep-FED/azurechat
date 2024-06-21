import { Paperclip } from "lucide-react";
import { useRef } from "react";
import { Button } from "../../button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../tooltip";

export const AttachFile = (props: {
  onClick: (formData: FormData) => void;
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleClick = () => {
    // Trigger the file input click event
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Create a FormData object and append the selected file
    const file = event.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      props.onClick(formData);
      event.target.value = "";
    }
  };

  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size="icon"
              variant={"ghost"}
              onClick={handleClick}
              type="button"
              aria-label="Attach file to chat"
            >
              <Paperclip size={16} />
            </Button>
          </TooltipTrigger>
          <TooltipContent align="start">
            <p>Attach file to chat</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      {/* This file input is hidden, and opens when the Button is clicked */}
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
    </>
  );
};
