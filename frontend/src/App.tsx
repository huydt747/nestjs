import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { NewPostPage } from './components/NewPost.page';
import { MainPage } from './pages/Main.page';
import { TopicPage } from './pages/Topic.page';
import { SearchPage } from './pages/Search.page';

export const App: React.FC = () => {
	return (
		<Routes>
			<Route path='/' element={<MainPage />} />
			<Route path='/topic/:id' element={<TopicPage/>} />
			<Route path='/post/new' element={<NewPostPage/>} />
			<Route path='/search/:keyword' element={<SearchPage/>} />
		</Routes>
	);
};
