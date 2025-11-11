import { PostBlock } from "@/components/postblock";
import { CommentBlock } from "@/components/commentblock";
import { ReplyBlock } from "@/components/replyblock";
import { Link } from 'react-router-dom';

export const MainPage: React.FC = () => {
	return (
		<div className='main max-w-7xl mx-auto'>
			<div className='flex justify-end p-4'>
				<Link to='/auth' className='px-3 py-1 rounded btn-outline'>Đăng nhập / Đăng ký</Link>
			</div>
			<PostBlock/>
			<CommentBlock/>
			<ReplyBlock/>
		</div>
	);
};
