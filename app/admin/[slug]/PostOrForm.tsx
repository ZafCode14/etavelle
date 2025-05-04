"use client";
import EditPostForm from "./EditPostFrom";
import { Post } from "@/lib/types";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import PostAdmin from "./Post";

type Props = {
  post: Post
}
export default function PostOrForm({ post }: Props) {
  const [isPreview, setIsPreview] = useState(true);
  return (
    <div>
      <Button onClick={() => setIsPreview((prev) => !prev)} className="
        fixed bottom-20 right-5 z-10
      ">
        {isPreview ? "Edit" : "Preview"}
      </Button>
      {isPreview ?
      <PostAdmin post={post}/> :
      <EditPostForm post={post}/>
      }
    </div>
  )
}
