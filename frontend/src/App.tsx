import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './components/header';
import MainPage from './pages/Main.page';

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
