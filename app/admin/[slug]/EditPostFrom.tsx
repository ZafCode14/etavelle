"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Content, Post } from "@/lib/types";
import { createClient } from "@/utils/supabase/client";
import { useState } from "react";
import AddAndDeleteImage from "../handleImages/AddAndDeleteImage";
import { addHeroImageToPost, addOgImageToPost } from "../handleImages/actions";
import Image from "next/image";
import ContentBlock from "./ContentBlock";
import ActivateBlog from "./ActivateBlog";
import AddNewBlock from "./AddNewBlock";
import GenerateH2s from "./AI/GenerateH2s";

type Props = {
  post: Post;
};

export default function EditPostForm({ post }: Props) {
  const [formData, setFormData] = useState<Partial<Post>>({
    title: post.title || "",
    description: post.description || "",
    slug: post.slug || "",
    hero_image: post.hero_image || {},
    og_image: post.og_image || {},
    content: post.content || [],
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const supabase = createClient();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index?: number
  ) => {
    const { name, value } = e.target;
    const currentContent = formData.content || [];

    if (index !== undefined) {
      const updatedContent = [...currentContent];
      updatedContent[index] = {
        ...updatedContent[index],
        [name]: value,
      };
      setFormData(prev => ({
        ...prev,
        content: updatedContent,
      }));
      return;
    }

    if (name.includes(".")) {
      const [parentKey, childKey] = name.split(".");
      setFormData(prev => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const parent = (prev as any)[parentKey] ?? {};
        return {
          ...prev,
          [parentKey]: {
            ...parent,
            [childKey]: value,
          },
        };
      });
      return;
    }

    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const savePost = async (updatedContent?: Content[]) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const { data, error } = await supabase
        .from('posts')
        .update({
          title: formData.title,
          description: formData.description,
          slug: formData.slug,
          hero_image: formData.hero_image,
          og_image: formData.og_image,
          content: updatedContent ?? formData.content,
          updated_at: new Date().toISOString(),
        })
        .eq('id', post.id)
        .select();

      if (error) {
        console.error(error.message);
        setError(error.message);
      } else if (!data || data.length === 0) {
        setError("No post was updated. You might not have permission.");
      } else {
        setSuccess(true);
      }
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await savePost();
  };

  return (
    <div className="p-4 flex flex-col">
      <div className="self-end">
        <ActivateBlog
          postSlug={post.slug}
          isActive={post.active}
        />
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-4xl  max-w-full mx-auto">
        <div className="flex flex-col gap-2">
          <Label htmlFor="slug">Slug</Label>
          <Input
            id="slug"
            type="text"
            placeholder="Slug"
            value={formData.slug}
            onChange={handleChange}
            name="slug"
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="title">Title</Label>
          <div className="flex">
            <Input
              id="title"
              type="text"
              placeholder="Post Title"
              value={formData.title}
              onChange={handleChange}
              name="title"
              required
              className="mr-5"
            />
            <GenerateH2s title={formData.title} setFormData={setFormData}/>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            placeholder="Post Description"
            value={formData.description}
            onChange={handleChange}
            name="description"
            required
            rows={3}
          />
        </div>

        <h3>Hero Image</h3>
        <AddAndDeleteImage uKey={post.hero_image?.uniqueKey} postSlug={post.slug} addImageToDatabase={addHeroImageToPost} />
        { post.hero_image?.fileUrl &&
        <Image
          alt="hero image"
          src={post.hero_image.fileUrl}
          width={1200}
          height={630}
          className="w-full object-contain"
        />
        }
        {post.hero_image?.fileUrl &&
        <div className="flex flex-col gap-2">
          <Input
            id="hero_image.alt"
            type="text"
            placeholder="Hero Image ALT"
            value={formData.hero_image?.alt || ""}
            onChange={handleChange}
            name="hero_image.alt"
            required
          />
        </div>
        }

        <h3>OpenGraph Image</h3>
        <AddAndDeleteImage uKey={post.og_image?.uniqueKey} postSlug={post.slug} addImageToDatabase={addOgImageToPost} />
        { post.og_image?.fileUrl &&
        <Image
          alt="og image"
          src={post.og_image.fileUrl}
          width={1200}
          height={630}
          className="w-full object-contain"
        />
        }

        <h2 className="mx-auto !mb-0">Content</h2>

        {formData.content?.map((block, index) => (
          <ContentBlock 
            key={index} 
            index={index}
            block={block} 
            savePost={savePost}
            formData={formData}
            setFormData={setFormData}
            post={post}
            handleChange={handleChange}
          />
        ))}

        {formData.content?.length === 0 &&
        <AddNewBlock setFormData={setFormData} index={0}/>
        }

        <Button type="submit" disabled={loading} className="fixed bottom-5 right-5">
          {loading ? "Saving..." : "Save Changes"}
        </Button>

        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">Post updated successfully!</p>}

      </form>
    </div>
  );
}