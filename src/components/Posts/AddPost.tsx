import React from 'react'
import { useAddPostMutation } from '../../app/features/api/apiSlice';
import { useNavigate, NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';

interface Post {
    title: string;
    body: string;
}

const AddPost = () => {
    const [formData, setFormData] = React.useState<Post>({
        title: '',
        body: ''
    });
    const [addPost, { isLoading }] = useAddPostMutation();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!formData.title || !formData.body) {
            toast.warning('Please fill in both title and body!');
            return;
        }
        const result = await addPost(formData);
        if ('error' in result) {
            console.error('Failed to add post:', result.error);
            toast.error('Failed to add post!');
        } else {
            toast.success('Post added successfully');
            setFormData({ title: '', body: '' });
            navigate('/posts');
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    }

    return (
        <div className="max-w-lg mx-auto p-5 md:p-8">
            <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6 md:p-8">
                <h2 className="text-xl font-semibold text-slate-800 mb-6">Add New Post</h2>
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    <div>
                        <label htmlFor="title" className="block mb-2 text-sm font-medium text-slate-700">
                            Title
                        </label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="Enter post title"
                            className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-colors"
                        />
                    </div>
                    <div>
                        <label htmlFor="body" className="block mb-2 text-sm font-medium text-slate-700">
                            Body
                        </label>
                        <textarea
                            id="body"
                            name="body"
                            rows={5}
                            value={formData.body}
                            onChange={handleChange}
                            placeholder="Write your post content..."
                            className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-colors resize-none"
                        />
                    </div>

                    <div className="flex items-center justify-between pt-2">
                        <NavLink to="/posts" className="text-sm font-medium text-slate-500 hover:text-slate-700">
                            ← Back to posts
                        </NavLink>
                        <button
                            disabled={isLoading}
                            type="submit"
                            className="inline-flex items-center gap-2 text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed px-5 py-2.5 rounded-lg text-sm font-medium shadow-sm transition-colors cursor-pointer"
                        >
                            {isLoading ? 'Adding...' : 'Add Post'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddPost
