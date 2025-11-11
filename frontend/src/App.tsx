import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { MainPage } from './pages/Main.page';

export const App: React.FC = () => {
	return (
		<div>
			<Header />
			<Routes>
				<Route path='/' element={<MainPage />} />
			</Routes>
		</div>
	);
};
