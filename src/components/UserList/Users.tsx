import { FC, useState, useEffect } from 'react';

import UserListTopBar from './UserListTopBar';
import '../../assets/stylesheets/users.css';
import UserCard from './UserCard';
import usersData from '../../assets/data/users.json';

export interface usersDataType {
	id: number;
	first_name: string;
	last_name: string;
	email: string;
	gender: string;
	phone_number: string;
	birthday: string;
	avatar: string;
	street_address: string;
	job_title: string;
	username: string;
}

const Users: FC = () => {
	const [users, setUsers] = useState<usersDataType[] | null>(null);
	const [filteredUsers, setFilteredUsers] = useState<usersDataType[] | null>(null);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		setUsers(usersData);
		setFilteredUsers(usersData);
	}, []);

	return (
		<>
			<UserListTopBar users={users} filteredUsers={filteredUsers} />
			<div className="users-list-container">
				{filteredUsers &&
					filteredUsers.map?.((user, i) => <UserCard key={user.id} user={user} />)}
			</div>
		</>
	);
};

export default Users;
