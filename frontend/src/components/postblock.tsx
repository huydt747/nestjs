export const PostBlock: React.FC = () => {
	return (
		<div className="border-[#c00091] border-2 rounded p-4 m-4 text-white">
			<div className="flex justify-between items-center mb-2">
				<div className="flex space-x-4">
					<div className="name">{'>>'}Tên</div>
					<div className="date">Ngày</div>
				</div>
				<div className="topic px-2 py-1 bg-[#c00091] rounded">
					Talk
				</div>
			</div>

			<div className="content mb-2">ok</div>

			<div className="interact flex space-x-4">
				<div className="comment-count">Comment</div>
				<div className="like-count">Like</div>
			</div>
		</div>
	);
};
