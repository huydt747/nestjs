import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { MainPage } from './pages/Main.page';
import { Header } from './components';
import { NewPostPage } from './pages/NewPost.page';
import { TopicPage } from './pages/Topic.page';

export const App: React.FC = () => {
	return (
		<div>
			<Header />
			<Routes>
				<Route path='/' element={<MainPage />} />
				<Route path='/topic/:id' element={<TopicPage/>} />
				<Route path='/post/new' element={<NewPostPage/>} />
			</Routes>
		</div>
	);
};
