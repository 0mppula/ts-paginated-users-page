import { FC } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Users from './components/UserList/Users';
import UserPage from './components/UserPage/UserPage';

const App: FC = () => {
	return (
		<div className="container">
			<div className="header">
				<h1>TypeScript Paginated Users Page</h1>
			</div>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Users />} />
					<Route path="/user/:userId" element={<UserPage />} />
					<Route path="*" element={<Navigate replace to="/" />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
};

export default App;
