import { Image as ImageIcon, X } from "lucide-react";
import Image from "next/image";
import { FC, useRef } from "react";
import { Button } from "@/ui/button";
import {
  InputImageStore,
  useInputImage,
} from "@/ui/chat/chat-input-area/input-image-store";

export const IconUpload: FC = () => {
  const { base64Image, previewImage } = useInputImage();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    fileInputRef.current?.click();
  };

  const resetFileInput = () => {
    InputImageStore.Reset();
  };

  return (
    <div className="flex gap-2">
      {previewImage && (
        <div className="relative overflow-hidden rounded-md w-[35px] h-[35px]">
          <Image src={previewImage} alt="Preview" fill={true} />
          <button
            className="absolute right-1 top-1 dark:bg-slate-100 bg-gray-500/50 rounded-full p-[2px]"
            onClick={resetFileInput}
            aria-label="Remove icon"
          >
            <X size={12} className="dark:stroke-black stroke-white" />
          </button>
        </div>
      )}
      <>
        <input
          type="hidden"
          name="image-base64"
          value={base64Image}
          onChange={(e) => InputImageStore.UpdateBase64Image(e.target.value)}
        />
        <input
          type="file"
          accept="image/*"
          name="image"
          ref={fileInputRef}
          className="hidden"
          onChange={(e) => InputImageStore.OnFileChange(e)}
        />
        <Button
          size="icon"
          variant={"default"}
          type="button"
          onClick={handleButtonClick}
          aria-label="Add an icon"
        >
          <ImageIcon size={16} />
        </Button>
      </>
    </div>
  );
};
