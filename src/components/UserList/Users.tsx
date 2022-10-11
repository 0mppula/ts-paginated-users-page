import { FC, useState, useEffect } from 'react';

import UserListTopBar from './UserListTopBar';
import '../../assets/stylesheets/users.css';
import UserCard from './UserCard';
import usersData from '../../assets/data/users.json';
import Paginator from './Paginator';

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
	const [activePage, setActivePage] = useState<number>(1);
	const [usersPerPage, setUsersPerPage] = useState<number>(24);
	const [lastPage, setLastPage] = useState<number>(1);

	const lastUserIndex = activePage * usersPerPage;
	const firstUserIndex = lastUserIndex - usersPerPage;

	useEffect(() => {
		const usersJSON = usersData;

		// Initialize the filtered users array once users are fethced.
		setLastPage(Math.ceil(usersData?.length / usersPerPage));

		// Paginate the users on initial render
		const currentPageUsers = [...usersData].slice(firstUserIndex, lastUserIndex);
		setFilteredUsers(currentPageUsers);

		setUsers(usersJSON);
	}, []);

	useEffect(() => {
		// When the user changes pages slice the users array and save the sliced array to filtered
		// users state.
		if (Array.isArray(users) && users?.length > 0) {
			const currentPageUsers = [...users].slice(firstUserIndex, lastUserIndex);

			setFilteredUsers(currentPageUsers);
			window.scrollTo(0, 0);
		}
	}, [activePage]);

	const incrementPage = () => {
		if (activePage < lastPage) {
			setActivePage((prev) => prev + 1);
		}
	};

	const decrementPage = () => {
		if (activePage > 1) {
			setActivePage((prev) => prev - 1);
		}
	};

	return (
		<>
			{users && filteredUsers && (
				<>
					<UserListTopBar
						users={users}
						setUsers={setUsers}
						filteredUsers={filteredUsers}
						setFilteredUsers={setFilteredUsers}
					/>

					<hr />

					<div className="users-list-container">
						{filteredUsers.map?.((user) => (
							<UserCard key={user.id} user={user} />
						))}
					</div>

					<hr />

					<Paginator
						activePage={activePage}
						lastPage={lastPage}
						incrementPage={incrementPage}
						decrementPage={decrementPage}
					/>
				</>
			)}
		</>
	);
};

export default Users;
