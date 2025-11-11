export const CommentBlock: React.FC = () => {
	return (
		<div className="bg-[#9600ff] text-white rounded p-4 m-4">
			<div className="flex justify-between items-center mb-2">
				<div className="flex space-x-4">
					<div className="name">{'>>'}Tên</div>
					<div className="date">Ngày</div>
				</div>
			</div>

			<div className="content">content</div>
		</div>
	);
};
