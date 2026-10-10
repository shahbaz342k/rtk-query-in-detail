import { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDeletePostMutation, useGetPostsQuery } from '../../app/features/api/apiSlice';
import Spinner from '../Spinner';
import { toast } from 'react-toastify';

export interface Post {
    id: number,
    title: string,
    body: string,
}

const PostList = () => {
    const { data: posts = [], isLoading, isError } = useGetPostsQuery(undefined as void);
    const [deletePost] = useDeletePostMutation();
    const navigate = useNavigate();

    const [query, setQuery] = useState('');
    const [pendingDelete, setPendingDelete] = useState<Post | null>(null);
    const [deletingId, setDeletingId] = useState<unknown>(null);

    const filteredPosts = useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q) return posts;
        return posts.filter(
            (post: Post) =>
                post.title?.toLowerCase().includes(q) ||
                post.body?.toLowerCase().includes(q)
        );
    }, [posts, query]);

    if (isLoading) {
        return <Spinner fullScreen label="Loading posts..." />
    }

    if (isError) {
        return (
            <div className="max-w-5xl mx-auto p-10 text-center">
                <p className="text-red-500 font-medium">Something went wrong while fetching posts.</p>
            </div>
        )
    }

    const handleEdit = (id: unknown) => {
        navigate(`/posts/edit/${id}`, { state: { postID: id } })
    }

    const confirmDelete = async () => {
        if (!pendingDelete) return;
        setDeletingId(pendingDelete.id);
        const result = await deletePost(pendingDelete.id);
        setDeletingId(null);
        setPendingDelete(null);
        if ('error' in result) {
            toast.warning('Failed to delete post');
        } else {
            toast.success('Post deleted successfully');
        }
    }

    return (
        <div className="max-w-5xl mx-auto p-5 md:p-8 flex flex-col gap-6 ">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-semibold text-slate-800">Posts</h1>
                    <p className="text-sm text-slate-500 mt-1">
                        {posts.length} post{posts.length === 1 ? '' : 's'} in total
                    </p>
                </div>
                <Link to="/posts/add">
                    <button className="inline-flex items-center gap-2 text-white bg-blue-600 hover:bg-blue-700 px-4 py-2.5 rounded-lg text-sm font-medium shadow-sm transition-colors cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" />
                        </svg>
                        Add Post
                    </button>
                </Link>
            </div>

            <div className="relative max-w-sm">
                <svg xmlns="http://www.w3.org/2000/svg" className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clipRule="evenodd" />
                </svg>
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search posts by title or body..."
                    aria-label="Search posts"
                    className="w-full pl-9 pr-3 py-2.5 text-sm rounded-lg border border-slate-200 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
            </div>

            {filteredPosts.length === 0 ? (
                <div className="flex flex-col items-center justify-center gap-2 py-16 text-center border border-dashed border-slate-200 rounded-xl bg-slate-50">
                    <p className="text-slate-500 font-medium">
                        {posts.length === 0 ? 'No posts yet.' : 'No posts match your search.'}
                    </p>
                    {posts.length === 0 && (
                        <Link to="/posts/add" className="text-blue-600 text-sm font-medium hover:underline">
                            Create your first post
                        </Link>
                    )}
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredPosts.map((post: Post) => (
                        <div
                            key={post.id}
                            className="flex flex-col justify-between bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-md transition-shadow p-5"
                        >
                            <div>
                                <h2 className="font-semibold text-slate-800 line-clamp-2">{post.title}</h2>
                                <p className="text-sm text-slate-500 mt-2 line-clamp-3">
                                    {post.body}
                                </p>
                            </div>
                            <div className="flex items-center gap-3 mt-4 pt-4 border-t border-slate-100">
                                <button
                                    onClick={() => handleEdit(post.id)}
                                    className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 hover:text-blue-700 cursor-pointer"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                                    </svg>
                                    Edit
                                </button>
                                <button
                                    onClick={() => setPendingDelete(post)}
                                    disabled={deletingId === post.id}
                                    className="inline-flex items-center gap-1.5 text-sm font-medium text-red-500 hover:text-red-600 disabled:opacity-50 cursor-pointer"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M8.75 1A2.75 2.75 0 006 3.75v.5h-2.25a.75.75 0 000 1.5h.3l.815 10.59A2.75 2.75 0 007.607 19h4.786a2.75 2.75 0 002.742-2.66l.815-10.59h.3a.75.75 0 000-1.5H14v-.5A2.75 2.75 0 0011.25 1h-2.5zM10 4.25c.414 0 .75.336.75.75v8.5a.75.75 0 01-1.5 0v-8.5c0-.414.336-.75.75-.75z" clipRule="evenodd" />
                                    </svg>
                                    {deletingId === post.id ? 'Deleting...' : 'Delete'}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {pendingDelete && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4">
                    <div className="bg-white rounded-xl shadow-xl max-w-sm w-full p-6">
                        <h3 className="text-lg font-semibold text-slate-800">Delete post?</h3>
                        <p className="text-sm text-slate-500 mt-2">
                            Are you sure you want to delete "<span className="font-medium">{pendingDelete.title}</span>"? This can't be undone.
                        </p>
                        <div className="flex justify-end gap-3 mt-6">
                            <button
                                onClick={() => setPendingDelete(null)}
                                className="px-4 py-2 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-100 cursor-pointer"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmDelete}
                                className="px-4 py-2 rounded-lg text-sm font-medium text-white bg-red-500 hover:bg-red-600 cursor-pointer"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default PostList
