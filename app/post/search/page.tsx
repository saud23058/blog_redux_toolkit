"use client";

import { formateDate } from "@/lib/formatDate";
import { useSearchPostMutation } from "@/lib/redux/features/postApiSlice";
import { PostCardType } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const Search = () => {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState<PostCardType[]>([]);
  const [query, { isLoading, error }] = useSearchPostMutation();

  const searchHandler = async () => {
    const res = await query(search);
    if (res?.data?.posts) {
      setResults(res.data.posts);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 py-6">
      <div className="w-[700px] h-[70px] bg-white mt-3 justify-center border-4 border-black items-center px-3 rounded-xl flex">
        <input
          type="text"
          placeholder="Search for posts"
          className="w-full py-3 text-xl border-none outline-none"
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          onClick={searchHandler}
          className="bg-black p-3 text-xl text-white rounded-md"
        >
          {isLoading ? "Loading..." : "Search"}
        </button>
      </div>

      <div className="mt-6 w-[700px] space-y-4">
        {error && (
          <p className="text-red-500 text-center">Error fetching results</p>
        )}
        {results.length > 0 ? (
          results.map((post) => (
            <div key={post._id} className="bg-white shadow-lg rounded-lg p-5">
              <Image
                src={post.imageUrl}
                alt={post.title}
                width={700}
                height={160}
                className="w-full h-40 object-cover rounded-md"
              />

              <h2 className="text-2xl font-bold mt-3">{post.title}</h2>
              <p className="text-gray-600">{post.description}</p>
              <p className="mt-2 text-gray-800">{post.details}</p>

              <div className="mt-2 flex justify-between text-sm text-gray-500">
                <span>Category: {post.category}</span>
                <span>Views: {post.views}</span>
                <span>{formateDate(post.createdAt)}</span>
              </div>
              <Link href={`/post/post-details/${post._id}`}>
              <button className="bg-black p-2 mt-3 w-20 text-white font-bold rounded-lg">Details</button>
              </Link>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center mt-4">No results found.</p>
        )}
      </div>
     
    </div>
  );
};

export default Search;
