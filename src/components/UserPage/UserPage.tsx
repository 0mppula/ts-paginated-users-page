import { FC, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import usersData from '../../assets/data/users.json';
import { usersDataType } from '../UserList/Users';

const UserPage: FC = () => {
	const [user, setUser] = useState<usersDataType | null>(null);
	let navigate = useNavigate();
	const { userId } = useParams();

	useEffect(() => {
		const [activeUser] = usersData.filter((u) => u.id === Number(userId));

		// No user is found go back to home page
		if (!activeUser) {
			navigate('/');
		}

		setUser(activeUser);
	}, []);

	return <div>UserPage</div>;
};

export default UserPage;
