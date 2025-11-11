import axiosClient from '@/api/axiosClient';
import { Topic } from '@/types/types';
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

export const NewPostPage: React.FC = () => {
    const navigate = useNavigate();

    const [topics, setTopics] = useState<Topic[]>([]);
    const [selectedTopicId, setSelectedTopicId] = useState<number | null>(null);
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(false);
    const [loadingTopics, setLoadingTopics] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [files, setFiles] = useState<File[]>([]);

    // Giả sử bạn lưu user_id trong localStorage hoặc context
    // Thay đổi theo cách quản lý authentication của bạn
    const currentUserId = 1; // Thay bằng user ID thực tế

    useEffect(() => {
        const fetchTopics = async () => {
            try {
                setLoadingTopics(true);
                const res = await axiosClient.get("/topics");
                setTopics(res.data || []);
            } catch (err: any) {
                console.error('Error fetching topics:', err);
                setError('Không thể tải danh sách chủ đề');
            } finally {
                setLoadingTopics(false);
            }
        };

        fetchTopics();
    }, []);

    // previews for files (images)
    const previews = useMemo(() => {
        return files.map((f) => ({
            url: f.type.startsWith('image/') ? URL.createObjectURL(f) : null,
            name: f.name,
            size: f.size,
            type: f.type,
        }));
    }, [files]);

    useEffect(() => {
        // revoke object URLs on cleanup
        return () => {
            previews.forEach((p) => {
                if (p.url) URL.revokeObjectURL(p.url);
            });
        };
    }, [previews]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const chosen = e.target.files;
        if (!chosen) return;
        const arr = Array.from(chosen);
        setFiles((prev) => [...prev, ...arr]);
    };

    const removeFile = (index: number) => {
        setFiles((prev) => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!selectedTopicId) {
            setError('Vui lòng chọn chủ đề');
            return;
        }

        if (!content.trim() && files.length === 0) {
            setError('Vui lòng nhập nội dung hoặc thêm file');
            return;
        }

        try {
            setLoading(true);
            setError(null);

            const formData = new FormData();
            formData.append('user', JSON.stringify({ user_id: currentUserId }));
            formData.append('topic', JSON.stringify({ topic_id: selectedTopicId }));
            formData.append('content', content.trim());

            files.forEach((f) => {
                formData.append('files', f);
            });

            await axiosClient.post('/posts', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            alert('Đăng bài viết thành công!');
            navigate('/');
        } catch (err: any) {
            console.error('Error creating post:', err);
            setError(err.response?.data?.message || 'Không thể đăng bài viết');
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        if (content.trim() || files.length) {
            if (!confirm('Bạn có chắc muốn hủy? Nội dung sẽ không được lưu.')) return;
        }
        navigate(-1);
    };

    return (
        <div className="fixed inset-0 bg-gradient-to-b from-[#1a0033] to-[#0d001a] flex items-center justify-center p-6">
            <div className="w-full max-w-4xl h-full max-h-[90vh] bg-white text-black rounded-lg shadow-xl overflow-auto">
                <div className="p-6 flex items-center justify-between border-b">
                    <h1 className="text-2xl font-bold text-[#9600ff]">Đăng bài viết mới</h1>
                    <div className="space-x-2">
                        <button onClick={handleCancel} className="px-4 py-2 rounded border">Hủy</button>
                        <button form="new-post-form" type="submit" className="px-4 py-2 rounded bg-[#9600ff] text-white">Đăng</button>
                    </div>
                </div>

                <form id="new-post-form" onSubmit={handleSubmit} className="p-6">
                    <div className="mb-4">
                        <div className="text-sm text-gray-600">Người đăng: <span className="font-semibold">Tên người dùng</span></div>
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-semibold mb-2 text-gray-700">Chọn chủ đề</label>
                        {loadingTopics ? (
                            <div className="text-gray-500">Đang tải chủ đề...</div>
                        ) : (
                            <div className="flex flex-wrap gap-2">
                                {topics.map((t) => (
                                    <button
                                        key={t.topic_id}
                                        type="button"
                                        onClick={() => setSelectedTopicId(t.topic_id)}
                                        className={`px-3 py-1 rounded-full border transition-all ${selectedTopicId === t.topic_id ? 'bg-[#9600ff] text-white border-[#9600ff]' : 'bg-white text-gray-700 border-gray-300 hover:border-[#9600ff]'}`}
                                    >
                                        {t.topic_name}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-semibold mb-2 text-gray-700">Nội dung</label>
                        <textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="Viết điều bạn muốn chia sẻ..."
                            className="w-full min-h-[220px] p-4 border rounded-lg focus:outline-none focus:border-[#9600ff]"
                        />
                        <div className="text-xs text-gray-500 mt-1">{content.length} ký tự</div>
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-semibold mb-2 text-gray-700">Tệp đính kèm</label>
                        <input type="file" multiple onChange={handleFileChange} />

                        {files.length > 0 && (
                            <div className="mt-3 grid grid-cols-3 gap-3">
                                {files.map((f, idx) => (
                                    <div key={idx} className="border rounded p-2 relative">
                                        {f.type.startsWith('image/') ? (
                                            <img src={URL.createObjectURL(f)} alt={f.name} className="w-full h-32 object-cover rounded" />
                                        ) : (
                                            <div className="h-32 flex items-center justify-center text-sm text-gray-600">{f.name}</div>
                                        )}
                                        <button type="button" onClick={() => removeFile(idx)} className="absolute top-1 right-1 bg-white rounded-full p-1 border">x</button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {error && (
                        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>
                    )}

                    <div className="flex items-center justify-end space-x-3 mt-6">
                        <button type="button" onClick={handleCancel} className="px-4 py-2 rounded border">Hủy</button>
                        <button type="submit" disabled={loading} className={`px-4 py-2 rounded font-semibold ${loading ? 'bg-gray-400 text-white' : 'bg-[#9600ff] text-white'}`}>
                            {loading ? 'Đang đăng...' : 'Đăng bài viết'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};