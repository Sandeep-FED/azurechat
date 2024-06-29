import { FC, useEffect, useRef } from "react";
import { Image as ImageIcon, X } from "lucide-react";
import Image from "next/image";
import { Button } from "@/ui/button";
import {
  InputImageStore,
  useInputImage,
} from "@/ui/chat/chat-input-area/input-image-store";

interface IconUploadProps {
  iconUrl: string; // Added the iconUrl prop to receive the persona's icon URL
}

export const IconUpload: FC<IconUploadProps> = ({ iconUrl }) => {
  const { previewImage, base64Image } = useInputImage();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Use useEffect to set the initial preview image to the iconUrl
  useEffect(() => {
    if (iconUrl && previewImage !== iconUrl) {
      InputImageStore.previewImage = iconUrl;
    }
  }, [iconUrl, previewImage]);

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    fileInputRef.current?.click();
  };

  return (
    <div className="flex gap-2">
      {previewImage && (
        <div className="relative overflow-hidden rounded-md w-[35px] h-[35px]">
          <Image src={previewImage} alt="Preview" fill={true} />
        </div>
      )}
      <>
        <input
          type="hidden"
          name="icon-image-base64"
          value={base64Image || (previewImage === iconUrl ? "" : base64Image)}
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
