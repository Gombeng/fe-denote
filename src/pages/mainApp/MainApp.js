import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { NavLink, Outlet } from 'react-router-dom';
import { Button, Navbar } from '../../components/Components';

const MainApp = () => {
	const navigate = useNavigate();

	useEffect(() => {
		const user = localStorage.getItem('user');

		if (!user) {
			navigate('/signin');
		}
	}, [navigate]);


	return (
		<div>
			<Navbar />

			<Outlet />
		</div>
	);
};

export default MainApp;
