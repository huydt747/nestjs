import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { MainPage } from './pages/Main.page';

export const App: React.FC = () => {
	return (
		<div>
			<Routes>
				<Route path='/' element={<MainPage />} />

				{/* <Route path='/topic/:id' element={<MainPage />} /> */}
				{/* <Route path='/post/:id' element={<MainPage />} /> */}
				{/* <Route path='/post/new' element={<MainPage />} /> */}

				{/* <Route path='/login' element={<MainPage />} /> */}
				{/* <Route path='/register' element={<MainPage />} /> */}
			</Routes>
		</div>
	);
};
