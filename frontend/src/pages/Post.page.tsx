import React, { useEffect, useState } from "react";
import { PostBlock } from "@/components/postblock";
import { CommentBlock } from "@/components/commentblock";
import { ReplyBlock } from "@/components/replyblock";
import { postApi } from "@/api/postApi";
import { commentApi } from "@/api/commentApi";
import { useParams } from "react-router-dom";
import { Post, Comment } from "@/types/types";
import { useAuth } from "@/auth/AuthContext";

export const PostPage: React.FC = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);

  const currentUserId = user?.user_id || 0;

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
        const postRes = await postApi.getOne(Number(id));
        setPost(postRes.data);

        const commentRes = await commentApi.getByPost(Number(id));
        setComments(commentRes.data);
      } catch (err) {
        console.error('Error fetching post/comments:', err);
      }
    };

    fetchData();
  }, [id]);

  const handleNewComment = async (content: string) => {
    if (!id || !user?.user_id) return;
    
    const newComment = { 
      post_id: Number(id),
      user_id: user.user_id,
      content 
    };
    
    try {
      await commentApi.create(newComment);
      const res = await commentApi.getByPost(Number(id));
      setComments(res.data);
    } catch (err) {
      console.error('Error creating comment:', err);
    }
  };

  if (!post) return <div>Loading...</div>;

  return (
    <div className="bg-black min-h-screen">
      <PostBlock post={post} currentUserId={currentUserId} />
      {comments.map((c) => (
        <CommentBlock key={c.comment_id} comment={c} />
      ))}
      <ReplyBlock onSubmit={handleNewComment} />
    </div>
  );
};
