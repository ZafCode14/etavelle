import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MoveDown, MoveUp, Trash2 } from "lucide-react";
import AddAndDeleteImage from "../handleImages/AddAndDeleteImage";
import Image from "next/image";
import { Content, Post } from "@/lib/types";
import { handleDelete } from "@/lib/r2storage";
import AddNewBlock from "./AddNewBlock";
import GenerateFromH2 from "./AI/GenerateFromH2";

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  block: any;
  formData: Partial<Post>;
  savePost: (updatedContent?: Content[]) => Promise<void>;
  setFormData: React.Dispatch<React.SetStateAction<Partial<Post>>>;
  index: number;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index?: number) => void;
  post: Post;
};

export default function ContentBlock({ block, formData, savePost, setFormData, index, handleChange, post }: Props) {
  const handleMoveItem = (index: number, direction: "up" | "down") => {
    const currentContent = formData.content || [];
    const updatedContent = [...currentContent];
    const currentItem = updatedContent[index];
    const targetIndex = direction === "up" ? index - 1 : index + 1;

    if (targetIndex >= 0 && targetIndex < updatedContent.length) {
      updatedContent[index] = updatedContent[targetIndex];
      updatedContent[targetIndex] = currentItem;
      setFormData(prev => ({
        ...prev,
        content: updatedContent,
      }));
    }
  };

  const handleDeleteItem = async (index: number, block: {
    type: string;
    value: string | { fileUrl: string; uniqueKey: string };
  }) => {
    const updatedContent = formData.content?.filter((_, i) => i !== index);
    setFormData(prev => ({
      ...prev,
      content: updatedContent,
    }));

    if (block.type === "image" && typeof block.value !== "string") {
      await handleDelete(block.value.uniqueKey);
      await savePost();
    }
  };

  const updateImageBlock = async (index: number, fileUrl: string, uniqueKey: string) => {
    const currentContent = formData.content || [];
    const updatedContent = [...currentContent];

    updatedContent[index] = {
      ...updatedContent[index],
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      value: { fileUrl, uniqueKey } as any,
    };

    setFormData(prev => ({
      ...prev,
      content: updatedContent,
    }));

    // Save immediately after updating
    await savePost(updatedContent);
  };

  return (
    <div className="flex flex-col gap-4 border rounded-xl p-4 relative my-4 bg-[#f3f3f3]">
      <div className="absolute top-2 right-2 flex gap-1">
        {block.type === "h2" &&
          <GenerateFromH2 h2={block.value} setFormData={setFormData} index={index}/>
        }
        <Button
          variant="outline"
          size="icon"
          type="button"
          onClick={() => handleMoveItem(index, "up")}
          disabled={index === 0}
        >
          <MoveUp className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          type="button"
          onClick={() => handleMoveItem(index, "down")}
          disabled={index === (formData.content?.length ?? 0) - 1}
        >
          <MoveDown className="h-4 w-4" />
        </Button>
        <Button
          variant="destructive"
          size="icon"
          type="button"
          onClick={() => handleDeleteItem(index, block)}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>

      <label className="text-sm font-semibold capitalize mb-2">{block.type}</label>

      {block.type === "h1" || block.type === "h2" || block.type === "h3" ? (
        <Input
          type="text"
          placeholder="Enter heading"
          value={typeof block.value === "string" ? block.value : ""}
          onChange={(e) => handleChange({...e, target: { ...e.target, name: "value" }}, index)}
          name="value"
          className="bg-[white]"
        />
      ) : block.type === "p" || block.type === "ul" || block.type === "ol" ? (
        <Textarea
          placeholder={block.type === "ul" || block.type === "ol" ? "Enter list items separated by new lines" : "Enter text"}
          value={typeof block.value === "string" ? block.value : ""}
          onChange={(e) => handleChange({...e, target: { ...e.target, name: "value" }}, index)}
          name="value"
          className="bg-[white]"
          rows={block.type === "p" ? 4 : 6}
        />
      ) : (
        <>
          <AddAndDeleteImage
            postSlug={post.slug}
            uKey={typeof block.value !== "string" ? block.value?.uniqueKey : undefined}
            addImageToDatabase={(x: string, fileUrl: string, uniqueKey: string) => updateImageBlock(index, fileUrl, uniqueKey)}
          />
          
          {typeof block.value !== "string" && block.value?.fileUrl &&
            <>
              <Image
                alt={"content image"}
                src={block.value.fileUrl}
                width={1200}
                height={630}
                className="w-full object-contain"
              />
              
              {/* Input for Alt Text */}
              <Input
                type="text"
                placeholder="Enter alt text"
                value={block.value?.altText || ""}
                onChange={(e) => handleChange({
                  ...e,
                  target: { ...e.target, name: "value", value: { ...block.value, altText: e.target.value } }
                }, index)}
                name="altText"
              />
            </>
          }
        </>
      )}
      <div className="absolute w-full flex justify-center -bottom-12">
        <AddNewBlock setFormData={setFormData} index={index}/>
      </div>
    </div>
  );
}