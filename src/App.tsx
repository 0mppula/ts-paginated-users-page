import { FC } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom';
import Footer from './components/Footer/Footer';

import Users from './components/UserList/Users';
import UserPage from './components/UserPage/UserPage';

const App: FC = () => {
	return (
		<>
			<div className="container">
				<BrowserRouter>
					{/* This reset query params by first linking to /reset then redirected to "/" */}
					<Link to="/reset" className="header">
						<h1>TypeScript Paginated Users Page</h1>
					</Link>

					<Routes>
						<Route path="/" element={<Users />} />
						<Route path="/user/:userId" element={<UserPage />} />
						<Route path="*" element={<Navigate replace to="/" />} />
					</Routes>
				</BrowserRouter>
			</div>

			<Footer />
		</>
	);
};

export default App;
