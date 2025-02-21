import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const postApiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000" }),
  endpoints: (builder) => {
    return {
      getAllPosts: builder.query({
        query: () => {
          return "/api/post/all-posts";
        },
      }),
      createPost: builder.mutation({
        query: (postData) => {
          return {
            method: "POST",
            url: "/api/post/create-post",
            body: JSON.stringify(postData),
            headers: {
              "Content-Type": "application/json",
            },
          };
        },
      }),
      detailPost: builder.query({
        query: (id) => {
          return { url: `/api/post/post-detail?id=${id}` };
        },
      }),
      authorDetails: builder.query({
        query: (id) => {
          return { url: `/api/author?id=${id}` };
        },
      }),
      searchPost: builder.mutation({
        query: (query) => {
          console.log(query);
          
          return {
            url: "/api/post/search",
            method: 'POST',
            body:JSON.stringify(query),
            headers: {
              "Content-Type": "application/json",
            },
          }
       }
      }),
    };
  },
});

export const {
  useGetAllPostsQuery,
  useCreatePostMutation,
  useDetailPostQuery,
  useSearchPostMutation,
  useAuthorDetailsQuery
} = postApiSlice;
