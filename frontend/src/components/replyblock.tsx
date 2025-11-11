export const ReplyBlock: React.FC = () => {
	return (
		<div className="fixed bottom-3 left-1/2 -translate-x-1/2 w-[1250px] bg-white text-black rounded p-4 shadow-lg">
			<div className="flex justify-between items-center mb-2">
				<div className="flex space-x-4">
					<div className="name">{'>>'}Tên</div>
				</div>
			</div>

			<div className="content flex space-x-4">
				<input
					type="text"
					className="border-gray-400 border-2 rounded-md p-4 w-full"
					placeholder="Nhập bình luận"
				/>
                <button className="bg-[#ab00c8] text-white text w-32 rounded-md">Gửi</button>
			</div>
		</div>
	);
};
