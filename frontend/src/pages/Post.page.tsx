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

  useEffect(() => {
    if (!id) return;
    postApi.getOne(Number(id)).then((res) => setPost(res.data));
    commentApi.getByPost(Number(id)).then((res) => setComments(res.data));
  }, [id]);

  const handleNewComment = async (content: string) => {
    if (!id || !user?.user_id) return;
    
    const newComment = { 
      post_id: Number(id),
      user_id: user.user_id,
      content 
    };
    
    await commentApi.create(newComment);
    const res = await commentApi.getByPost(Number(id));
    setComments(res.data);
  };

  if (!post) return <div>Loading...</div>;

  return (
    <div className="bg-black min-h-screen">
      <PostBlock post={post} />
      {comments.map((c) => (
        <CommentBlock key={c.comment_id} comment={c} />
      ))}
      <ReplyBlock onSubmit={handleNewComment} />
    </div>
  );
};