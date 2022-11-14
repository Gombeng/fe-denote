import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { HashLoader } from 'react-spinners';
import { Box, Button, Container, Note } from '../../components/Components';
import { color } from '../../utils/Color';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Home = () => {
	const userData = JSON.parse(localStorage.getItem('user'));
	const userId = userData.data._id;
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);

	useEffect(() => {
		setLoading(true);
		axios
			.get(`https://denoter-server.herokuapp.com/api/notes/user/${userId}`)
			.then(({ data }) => {
				console.log(data);
				setLoading(false);
				setError(false);
				setData(data.data._notes.reverse());
			})
			.catch((err) => {
				setLoading(false);
				setError('Gagal memuat data!');
			});
	}, [setLoading, userId]);

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

				{data.length && (
					<Link to={`/create`}>
						<Button label="Create Note" style={{ margin: '1rem 1rem 0 0' }} />
					</Link>
				)}

				{data.length ? (
					data.map(({ _id, title, note, created }) => (
						<Link key={_id} to={`/edit/${_id}`}>
							<Note title={title} note={note} create={created} />
						</Link>
					))
				) : (
					<div>
						<h3
							style={{
								color: '#f04848',
								marginTop: '5rem',
								textAlign: 'left',
							}}
						>
							You does not have note already
							<br />
							Go Add some
						</h3>
						<Link to={`/create`}>
							<Button
								label="Create Note"
								style={{ textAlign: 'center', margin: '1rem auto 0' }}
							/>
						</Link>
					</div>
				)}

				<Box margin="2rem" />

				{/* <ModalComp /> */}
			</div>
		</Container>
	);
};

export default Home;

const Flexbox = styled.div`
	display: flex;
	justify-content: space-between;
`;
