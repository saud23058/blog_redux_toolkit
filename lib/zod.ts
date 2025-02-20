import z from "zod"

export const postSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  imageUrl: z.string().url("Invalid image URL"),
  category: z.string().min(1, "Category is required"),
  details: z.string().min(1, "Detail is required"),
});