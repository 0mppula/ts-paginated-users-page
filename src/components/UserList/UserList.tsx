import { FC } from 'react';

import UserListTopBar from './UserListTopBar';
import '../../assets/stylesheets/userlist.css';

const UserList: FC = () => {
	return (
		<div className="user-list-container">
			<UserListTopBar />
		</div>
	);
};

export default UserList;
