import React from 'react';

export interface PaginationProps {
	currentPage: number;
	totalPages: number;
	onPageChange: (page: number) => void;
	className?: string;
	showPageInfo?: boolean;
	totalItems?: number;
	itemsPerPage?: number;
}

export const Pagination: React.FC<PaginationProps> = ({
	currentPage,
	totalPages,
	onPageChange,
	className = '',
	showPageInfo = false,
	totalItems,
	itemsPerPage
}) => {
	if (totalPages <= 1) return null;

	const showPages = 5;
	let start = Math.max(1, currentPage - Math.floor(showPages / 2));
	let end = Math.min(totalPages, start + showPages - 1);
	if (end - start + 1 < showPages) start = Math.max(1, end - showPages + 1);

	const pages: (number | string)[] = [];
	if (start > 1) {
		pages.push(1);
		if (start > 2) pages.push('...');
	}
	for (let i = start; i <= end; i++) pages.push(i);
	if (end < totalPages) {
		if (end < totalPages - 1) pages.push('...');
		pages.push(totalPages);
	}

	const pageInfo =
		showPageInfo && totalItems && itemsPerPage
			? `Hiển thị ${(currentPage - 1) * itemsPerPage + 1}-${Math.min(currentPage * itemsPerPage, totalItems)} trong tổng số ${totalItems} kết quả`
			: '';

	const btnClass = 'px-3 py-2 border rounded-md transition-colors';

	return (
		<div className={`flex flex-col items-center gap-4 ${className}`}>
			{pageInfo && (
				<div className='text-sm text-gray-600'>{pageInfo}</div>
			)}

			<div className='flex items-center gap-2'>
				<button
					onClick={() => onPageChange(currentPage - 1)}
					disabled={currentPage === 1}
					className={`${btnClass} border-gray-300 hover:bg-gray-100 hover:text-black disabled:opacity-50`}
				>
					‹ Trước
				</button>

				{pages.map((p, idx) =>
					typeof p === 'number' ? (
						<button
							key={idx}
							onClick={() => onPageChange(p)}
							className={`${btnClass} ${
								currentPage === p
									? 'bg-white text-black border-blue-500'
									: 'border-gray-300 hover:bg-gray-100 hover:text-black'
							}`}
							aria-current={
								currentPage === p ? 'page' : undefined
							}
						>
							{p}
						</button>
					) : (
						<span key={idx} className='px-2 text-gray-400'>
							...
						</span>
					)
				)}

				<button
					onClick={() => onPageChange(currentPage + 1)}
					disabled={currentPage === totalPages}
					className={`${btnClass} border-gray-300 hover:bg-gray-100 hover:text-black disabled:opacity-50`}
				>
					Sau ›
				</button>
			</div>

			<div className='text-xs text-gray-500'>
				Trang {currentPage} / {totalPages}
			</div>
		</div>
	);
};

export const usePagination = (initialPage = 1) => {
	const [currentPage, setCurrentPage] = React.useState(initialPage);
	const [totalPages, setTotalPages] = React.useState(1);
	const [totalItems, setTotalItems] = React.useState(0);

	const handlePageChange = (page: number) => {
		if (page >= 1 && page <= totalPages && page !== currentPage) {
			setCurrentPage(page);
		}
	};

	const updatePagination = (total: number, itemsPerPage: number) => {
		setTotalItems(total);
		setTotalPages(Math.ceil(total / itemsPerPage));
	};

	return {
		currentPage,
		totalPages,
		totalItems,
		handlePageChange,
		updatePagination,
		resetToFirstPage: () => setCurrentPage(1)
	};
};

export default Pagination;
