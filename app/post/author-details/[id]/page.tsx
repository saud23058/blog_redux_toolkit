"use client";

import { formateDate } from "@/lib/formatDate";
import { useAuthorDetailsQuery } from "@/lib/redux/features/postApiSlice";
import Link from "next/link";
import { useParams } from "next/navigation";
import React from "react";

const AuthorDetails = () => {
  const params = useParams();
  const id = params.id?.toString();

  const { data, isLoading, error } = useAuthorDetailsQuery(id);

  if (isLoading) return <p className="text-center text-3xl font-bold mt-10">Loading...</p>;
  if (error)
    return (
      <p className="text-center text-red-500 mt-10">
        Error loading author details.
      </p>
    );

  const author = data?.author;

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 py-6">
      <div className="w-[700px] bg-white shadow-lg rounded-lg p-6 border">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          Author Details
        </h2>
        <p className="text-lg text-gray-600">
          <span className="font-semibold">Email:</span> {author?.email}
        </p>
        <p className="text-lg text-gray-600">
          <span className="font-semibold">Joined:</span>{" "}
          {formateDate(author?.createdAt)}
        </p>
      </div>

     
      <div className="w-[700px] mt-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Posts</h2>

        {author?.posts?.length > 0 ? (
          author.posts.map((post: any) => (
            <div
              key={post._id}
              className="bg-white shadow-md rounded-lg p-4 mb-4"
            >
              <h3 className="text-lg font-semibold text-gray-800">
                {post.title}
              </h3>

              <p className="text-gray-500 text-sm mb-2">
                Published: {formateDate(post.createdAt)}
              </p>

              <Link href={`/post/post-details/${post._id}`}>
                <button className="mt-2 px-4 py-2 bg-black text-white rounded ">
                  View Details
                </button>
              </Link>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center">No posts available.</p>
        )}
      </div>
    </div>
  );
};

export default AuthorDetails;
