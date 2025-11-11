import React from "react";
import Pagination from "@/components/pagination";
import { PostBlock } from "@/components/postblock";

export const TopicPage: React.FC = () => {
    const [currentPage, setCurrentPage] = React.useState(1);
    const totalPages = 10;
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    return (
        <div className=''>
            <div className="w-full bg-[#9600ff]">
                <button className="mx-32 py-4 text-lg">{'<<'}Trở về</button>
            </div>

            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between">
                    <div className="bg-[#C00091] p-4 mt-2 mx-4 rounded-xl">Chủ đề:</div>
                    <div>Bộ lọc</div>
                    <button className="bg-[#ab00c8] p-4 mt-2 mx-4 rounded-xl">Bài viết mới</button>
                </div>
                <PostBlock/>
                
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
            </div>
            
        </div>
    );
};
