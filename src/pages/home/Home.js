import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { HashLoader } from 'react-spinners';
import { Box, Container, ModalComp, Note } from '../../components/Components';
import { color } from '../../utils/Color';

const Home = () => {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);

	useEffect(() => {
		setLoading(true);

		const id = JSON.parse(localStorage.getItem('user')).userId;

		axios
			.get(`https://denoter-server.herokuapp.com/api/users/${id}/notes`)
			.then((res) => {
				if (res.data._notes.length === 0) {
					setError('No Note to display, go add some!');
				}
				setLoading(false);
				const note = res.data._notes.reverse();
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

				{error && (
					<h3 style={{ color: '#f04848', marginTop: '5rem' }}>{error}</h3>
				)}

				{data.map(({ _id, title, note, create }, index) => (
					<Note key={index} title={title} note={note} create={create} />
				))}

				<Box margin="2rem" />
				<ModalComp />
			</div>
		</Container>
	);
};

export default Home;
