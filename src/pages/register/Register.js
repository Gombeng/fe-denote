import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Box, Button, Input } from '../../components/Components';
import styled from 'styled-components';
import { color } from '../../utils/Color';
import { IconLogo } from '../../assets/Assets';
import { HashLoader } from 'react-spinners';

const Login = () => {
	const navigate = useNavigate();

	useEffect(() => {
		const user = localStorage.getItem('user');

		if (user) {
			navigate('/home');
		}
	}, [navigate]);

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);

	const LOCAL_URL = 'http://localhost:8910'
	const PROD_URL = 'https://be-denote.vercel.app'

	const submitHandler = async (e) => {
		e.preventDefault();
		setError(null);

		try {
			const config = {
				headers: {
					'Content-type': 'application/json',
				},
			};

			setLoading(true);

			const { data } = await axios.post(
				`${PROD_URL}/api/users/register`,
				{
					email,
					password,
				},
				config
			);

			localStorage.setItem('user', JSON.stringify(data));
			setLoading(false);
			navigate('/home');
		} catch (error) {
			setLoading(false);
			setError(error.response.data.message);
		}
	};
	return (
		<Container>
			<div>
				<img width={80} height={63.72} src={IconLogo} alt="logo" />
				<Box margin="2rem" />
				<h2>Create note now!</h2>
				<Box margin=".5rem" />
				<p>Never lost any idea again, let's sign up!</p>
				<Box margin="2rem" />

				<form onSubmit={submitHandler}>
					<HashLoader color={color.btn} loading={loading} />
					{error && <h3 style={{ color: '#f04848' }}>{error}</h3>}
					<Box margin="1rem" />

					<Input
						required
						label="Your Email"
						type="email"
						placeholder="email@gmail.com"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
					<Box margin="1rem" />

					<Input
						required
						label="Password"
						type="password"
						placeholder="*******"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
					<Box margin="1.5rem" />

					<Button
						label="Sign up"
						type="submit"
						style={{ marginRight: '2rem' }}
					/>
					<Link to="/signin">Sign in</Link>
				</form>
			</div>
		</Container>
	);
};

export default Login;

const Container = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	min-height: 100vh;
	/* max-width: 768px; */
	background-color: ${color.nav};
`;
