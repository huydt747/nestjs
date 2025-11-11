import React from "react";
import { Link } from "react-router-dom";

export const NewPostPage: React.FC = () => {

    return (
        <div className="max-w-7xl mx-auto bg-white text-black rounded p-4 ">
            Đăng bài viết mới
			<div className="flex justify-between items-center mb-2">
				<div className="flex space-x-4">
					<div className="name">{'>>'}Tên</div>
				</div>
			</div>
            <div>Chọn chủ đề:</div>
			<div className="content flex space-x-4">
				<input
					type="text"
					className="border-gray-400 border-2 rounded-md p-4 w-full"
					placeholder="Nhập bình luận"
				/>
			</div>
            <button className="bg-[#9600ff] text-white text pt-4 px-8 mt-4 rounded-md">Gửi</button>
		</div>
    );
};
