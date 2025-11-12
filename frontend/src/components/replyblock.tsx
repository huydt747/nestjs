import React, { useState } from "react";

interface ReplyBlockProps {
	onSubmit: (content: string) => void;
}

export const ReplyBlock: React.FC<ReplyBlockProps> = ({ onSubmit }) => {
	const [content, setContent] = useState("");

	const handleSend = () => {
		if (!content.trim()) return;
		onSubmit(content);
		setContent("");
	};

	return (
		<div className="fixed bottom-3 left-1/2 -translate-x-1/2 w-[1250px] bg-white text-black rounded p-4 shadow-lg">
			<div className="flex justify-between items-center mb-2">
				<div className="flex space-x-4">
					<div className="name">{">>"} Bạn</div>
				</div>
			</div>

			<div className="content flex space-x-4">
				<input
					type="text"
					value={content}
					onChange={(e) => setContent(e.target.value)}
					className="border-gray-400 border-2 rounded-md p-4 w-full"
					placeholder="Nhập bình luận..."
				/>
				<button
					onClick={handleSend}
					className="bg-[#ab00c8] text-white text w-32 rounded-md hover:bg-[#d000ff]"
				>
					Gửi
				</button>
			</div>
		</div>
	);
};
