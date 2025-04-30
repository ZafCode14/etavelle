import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select";
import { Post } from "@/lib/types";
import { Plus} from "lucide-react";
import { useState } from "react";

type Props = {
  setFormData: React.Dispatch<React.SetStateAction<Partial<Post>>>;
  index: number;
}
export default function AddNewBlock({ setFormData, index }: Props) {
  const [selectedBlockType, setSelectedBlockType] = useState("");

  return (
    <div className="flex items-center gap-2 mx-auto">
      <Select 
        value={selectedBlockType}
        onValueChange={(value) => {
          const newBlock = {
            type: value as "h1" | "h2" | "h3" | "p" | "ul" | "ol" | "image",
            value: "",
          };

          setFormData(prev => {
            const content = prev.content ? [...prev.content] : [];
            content.splice(index + 1, 0, newBlock);
            return { ...prev, content };
          });

          setSelectedBlockType("");
        }}
      >
        <SelectTrigger className="cursor-pointer">
          <Plus />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="h1" className="cursor-pointer">h1</SelectItem>
          <SelectItem value="h2" className="cursor-pointer">h2</SelectItem>
          <SelectItem value="h3" className="cursor-pointer">h3</SelectItem>
          <SelectItem value="p" className="cursor-pointer">p</SelectItem>
          <SelectItem value="ul" className="cursor-pointer">ul</SelectItem>
          <SelectItem value="ol" className="cursor-pointer">ol</SelectItem>
          <SelectItem value="image" className="cursor-pointer">image</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
