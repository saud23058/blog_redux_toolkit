"use client";

import MDEditor from "@uiw/react-md-editor";
import axios from "axios";
import React, { useState } from "react";

const CreatePostForm = () => {
  const [detail, setDetail] = useState("");
  const [error, setError] = useState("");
  const [isPending, setIsPending] = useState(false);

  const submitHandler = async (formData: FormData) => {
    setIsPending(true);
    setError("");

    const formValues = {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      category: formData.get("category") as string,
      imageUrl: formData.get("imageUrl") as string,
      detail,
    };

    try {
      await axios.post(`http://localhost:3000/api/post/create-post`, formValues).then((res) => {
        alert(res.data.message)
      });

    } catch  {
      setError("Failed to create post");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <form action={submitHandler} className="mt-12 mb-8 flex flex-col">
      <div className="flex flex-col w-[583px] h-max pb-3">
        <label className="font-bold text-xl mb-2" htmlFor="title">
          Title
        </label>
        <input
          id="title"
          type="text"
          name="title"
          placeholder="Enter your post title"
          required
          className="outline-none border-4 text-xl border-black p-4 rounded-full"
          maxLength={12}
        />
      </div>
      <div className="flex flex-col w-[583px] h-max pb-3">
        <label className="font-bold text-xl mb-2" htmlFor="description">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          placeholder="Enter your post description"
          required
          className="outline-none border-4 text-xl border-black p-4 rounded-3xl"
        />
      </div>
      <div className="flex flex-col w-[583px] h-max pb-3">
        <label className="font-bold text-xl mb-2" htmlFor="imageUrl">
          Image Link
        </label>
        <input
          id="imageUrl"
          name="imageUrl"
          type="text"
          placeholder="Paste your post url"
          required
          className="outline-none border-4 text-xl border-black p-4 rounded-full"
        />
      </div>
      <div className="flex flex-col w-[583px] h-max pb-3">
        <label className="font-bold text-xl mb-2" htmlFor="category">
          Category
        </label>
        <input
          id="category"
          name="category"
          type="text"
          placeholder="like Health, Technology ...."
          required
          className="outline-none border-4 text-xl border-black p-4 rounded-full"
        />
      </div>
      <div className="flex flex-col w-[583px] h-max pb-3">
        <label className="font-bold text-xl mb-2" htmlFor="detail">
          Details
        </label>
        <MDEditor
          data-color-mode="light"
          value={detail}
          onChange={(e) => setDetail(e as string)}
          id="detail"
          height={350}
          preview="edit"
          style={{ borderRadius: 20, overflow: "hidden" }}
          textareaProps={{
            placeholder: "Provide the detailed information about the post",
          }}
        />
      </div>
      <input type="hidden" name="detail" value={detail} />
      <p className="text-red-500 px-4">{error}</p>
      <button
        disabled={isPending}
        className="mt-4 mb-5 bg-pink-500 text-white p-4 text-xl font-bold rounded-xl border-black border-4"
      >
        {isPending ? "Submitting..." : "Submit your post"}
      </button>
    </form>
  );
};

export default CreatePostForm;