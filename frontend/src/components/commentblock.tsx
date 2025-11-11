import React from "react";
import { Comment } from "@/types/types";

interface Props {
	comment: Comment;
}

export const CommentBlock: React.FC<Props> = ({ comment }) => {
	const formatDate = (dateString: string) =>
		new Date(dateString).toLocaleString("vi-VN");

	return (
		<div className="bg-[#9600ff] text-white rounded p-4 m-4">
			<div className="flex justify-between items-center mb-2">
				<div className="flex space-x-4">
					<div className="name">{">>"} {comment.user?.username || "Ẩn danh"}</div>
					<div className="date text-sm text-gray-300">{formatDate(comment.created_at)}</div>
				</div>
			</div>

			<div className="content">{comment.content}</div>
		</div>
	);
};
