import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = "http://localhost:3001/";

export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({ baseUrl }),
    tagTypes: ["Post"],
    endpoints: (builder) => ({
        getPosts: builder.query({
            query: () => "posts",
            providesTags: ["Post"]
        }),
        // FIX: Use a template literal to append the ID to the URL path
        getPostByID: builder.query({
            query: (id) => `posts/${id}`,
            providesTags: ["Post"]
        }),
        addPost: builder.mutation({
            query: (post) => ({
                url: "/posts",
                method: "POST",
                body: post
            }),
            invalidatesTags: ["Post"]
        }),
        updatePost: builder.mutation({
            query: ({id, ...updateData}) => ({
                url: `/posts/${id}`,
                method: "PUT",
                body: updateData
            }),
            invalidatesTags: ["Post"]
        }),
        deletePost: builder.mutation({
            query: (id) => ({
                url: `/posts/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["Post"]
        })
    })
});

export const {useGetPostsQuery, useGetPostByIDQuery, useAddPostMutation, useUpdatePostMutation, useDeletePostMutation} = apiSlice;