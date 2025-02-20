import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const postApiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000" }),
  endpoints: (builder) => {
    return {
      getAllPosts: builder.query({
        query: () => {
          return "/posts";
        },
        transformErrorResponse: (data) => {
          return data;
        },
      }),
      createPost: builder.mutation({
        query: (postData) => {
          
          
          return {
            method: "POST",
            url: '/api/post/create-post',
            body: JSON.stringify(postData),
            headers: {
              "Content-Type": "application/json", 
            },
         }
        }
      })
    };
  },
});

export const { useGetAllPostsQuery,useCreatePostMutation } = postApiSlice;
