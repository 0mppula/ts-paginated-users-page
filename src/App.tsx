import { FC } from 'react';
import UserList from './components/UserList/UserList';

const App: FC = () => {
	return (
		<div className="container">
			<div className="header">
				<h1>TypeScript Paginated Users Page</h1>
			</div>
			
			<UserList />
		</div>
	);
};

export default App;
