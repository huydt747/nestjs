import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { AuthProvider } from './auth/AuthContext';
import { Header } from './components';
import { NewPostPage } from './components/NewPost.page';
import { MainPage } from './pages/Main.page';
import { TopicPage } from './pages/Topic.page';

export const App: React.FC = () => {
	return (
		<AuthProvider>
			<div>
				<Header />
				<Routes>
					<Route path='/' element={<MainPage />} />
					<Route path='/topic/:id' element={<TopicPage/>} />
					<Route path='/post/new' element={<NewPostPage/>} />
				</Routes>
			</div>
		</AuthProvider>
	);
};
