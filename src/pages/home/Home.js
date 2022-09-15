import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { HashLoader } from 'react-spinners';
import { Box, Container, Note } from '../../components/Components';
import { color } from '../../utils/Color';
import styled from 'styled-components';
import { IconAdd } from '../../assets/Assets';
import { Link } from 'react-router-dom';

const Home = () => {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);

	useEffect(() => {
		setLoading(true);
		axios
			.get('http://localhost:5000/api/post/getAll')
			.then((res) => {
				if (res.data.length === 0) {
					setError('Gagal memuat data!');
				}
				setLoading(false);
				const note = res.data.reverse();
				setData(note);
			})
			.catch((err) => setError('Gagal memuat data!'));
	}, [setLoading]);

	return (
		<Container alignStart>
			<div>
				<HashLoader
					style={{ margin: '2rem auto' }}
					color={color.btn}
					loading={loading}
				/>
				{data.map(({ title, note, create }, index) => (
					<Note key={index} title={title} note={note} create={create} />
				))}

				<Box margin="2rem" />
			</div>

			<Fab>
				<Link to="/add-note">
					<img src={IconAdd} alt="add" />
				</Link>
			</Fab>
		</Container>
	);
};

export default Home;

const Fab = styled.div`
	position: fixed;
	right: 5%;
	bottom: 3%;
	cursor: pointer;

	img {
		width: 4rem;
		background-color: white;
		border-radius: 50%;
		box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 15px -3px,
			rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;
	}
`;
