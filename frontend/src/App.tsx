import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { MainPage } from './pages/Main.page';
import { TopicPage } from './pages/Topic.page';
import { SearchPage } from './pages/Search.page';
import { PostPage } from './pages/Post.page';

export const App: React.FC = () => {
	return (
		<Routes>
			<Route path='/' element={<MainPage />} />
			<Route path='/topic/:id' element={<TopicPage/>} />
			<Route path='/post/:id' element={<PostPage/>} />
			<Route path="/search" element={<SearchPage />} />
		</Routes>
	);
};
