import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { color } from '../utils/Color';
import { Button } from './Components';
import {
	IconClose,
	IconLogo,
	IconMenu,
	IconPower,
	IconSearch,
} from '../assets/Assets';

const Navbar = () => {
	const navigate = useNavigate();

	const logOut = () => {
		let confirmBox = window.confirm('r u sure?');
		if (confirmBox) {
			localStorage.clear();
			navigate('/login');
		}
	};

	return (
		<Box>
			<Navcontainer>
				<img src={IconLogo} alt="logo" />
				<h3>Denote</h3>
				<div></div>

				{/* <NavLink
						className={({ isActive }) => (isActive ? 'link active' : 'link')}
						to="home"
					>
						Home
					</NavLink> */}

				{/* <img src={IconSearch} alt="search" /> */}
				<img onClick={logOut} src={IconPower} alt="logout" />
			</Navcontainer>
		</Box>
	);
};

export default Navbar;

const Box = styled.div`
	background: ${color.nav};
	position: sticky;
	top: 0;
`;

const Navcontainer = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 90%;
	max-width: 768px;
	margin: 0 auto;
	min-height: 10vh;

	img {
		width: 1.8rem;
		cursor: pointer;
	}

	.link {
		color: #b6b6b6;
		padding: 0.8rem 1rem;
		transition: 0.3s;

		&:hover {
			color: #fff;
		}

		&:not(:last-child) {
			margin-right: 1rem;
		}
	}

	.active {
		color: #fff;
		font-weight: 500;
	}

	.cta {
		font-weight: 600;
		border-radius: 0.3rem;
		padding: 0.8rem 1rem;
		color: #000000;
		background: #fff;
	}
`;
