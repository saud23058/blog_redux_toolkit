"use client";

import React, { Suspense } from "react";
import markdown from "markdown-it";
import Link from "next/link";
import Image from "next/image";
import { useDetailPostQuery } from "@/lib/redux/features/postApiSlice";
import { formateDate } from "@/lib/formatDate";
import View from "@/components/View";
import { useParams } from "next/navigation";

const md = markdown();

const PostDetails = () => {
  const params = useParams();
  const id = params.id?.toString();

  const { data, isLoading, error } = useDetailPostQuery(id);

  if (isLoading) {
    return (
      <p className="flex w-full justify-center text-3xl mt-20 font-bold">
        Loading...
      </p>
    );
  }

  if (error) {
    return (
      <p className="flex w-full justify-center text-red-800 text-3xl mt-20 font-bold">
        Failed to show details
      </p>
    );
  }

  return (
    <>
      <div className="w-full bg-pink-600 min-h-[330px] pattern flex justify-center items-center flex-col py-10 px-6">
        <div className="w-max bg-yellow-400 mb-4 rounded-md px-4 p-3 text-center">
          {formateDate(data.post?.createdAt)}
        </div>
        <h1 className="w-max bg-black rounded-md text-3xl px-3 py-8 text-white font-extrabold">
          {data.post?.title}
        </h1>
        <p
          className="mt-3 text-white h-36 w-96 overflow-hidden text-ellipsis"
          style={{
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 2,
          }}
        >
          {data.post?.description}
        </p>
      </div>

      <section className="w-full !min-h-[530px] flex flex-col justify-center items-center mb-12">
        <div className="w-[710px] h-[383px] mt-8 bg-green-300 rounded-lg">
          <Image
            src={data.post?.imageUrl}
            width={710}
            height={383}
            alt={"post.title"}
            className="w-full h-full rounded-lg object-cover"
          />
        </div>

        <div className="flex mt-8 w-[710px] justify-between items-center px-4">
          <div className="flex flex-col items-center">
            <Link
              href={`/post/author-details/${data.author?._id}`}
              className="w-14 h-14 rounded-full mt-4 text-white flex justify-center items-center"
            >
              <div className="w-14 h-14 rounded-full overflow-hidden bg-gray-200">
                <Image
                  src={data.author?.profileImage}
                  height={56}
                  width={56}
                  alt={data.author?.username?.charAt(0)}
                  className="w-full h-full object-cover"
                />
              </div>
            </Link>

            <span>{data.author?.username}</span>
          </div>
          <span className="bg-pink-300 w-max rounded-lg text-center p-2">
            {data.post?.category}
          </span>
        </div>

        <h1 className="font-bold text-[30px]">Details</h1>

        <div
          className="mt-4 text-lg"
          dangerouslySetInnerHTML={{ __html: md.render(data.post?.details) }}
        />

        <Suspense fallback={<div>Loading...</div>}>
          <View id={String(data.post?.views)} />
        </Suspense>
      </section>
    </>
  );
};

export default PostDetails;
