import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import './index.css';
import { App } from './App';
import { Footer } from './components/footer';
import { Header } from './components';
import { AuthProvider } from './auth/AuthContext';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<BrowserRouter basename='/'>
		<AuthProvider>
			<Header />
			<App />
			<Footer/>
		</AuthProvider>
	</BrowserRouter>
);
