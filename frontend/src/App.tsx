import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { MainPage } from './pages/Main.page';
import AuthPage from './pages/Auth.page';

export const App: React.FC = () => {
	return (
		<div>
			<Routes>
				<Route path='/' element={<MainPage />} />
				<Route path='/auth' element={<AuthPage />} />
			</Routes>
		</div>
	);
};
