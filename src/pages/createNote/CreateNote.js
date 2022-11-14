import axios from 'axios';
import React, { useState } from 'react';
import { HashLoader } from 'react-spinners';
import { color } from '../../utils/Color';
import { Input, Box, Button, Textarea } from '../../components/Components';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const CreateNote = () => {
	const userData = JSON.parse(localStorage.getItem('user'));
	const userId = userData.data._id;
	const [title, setTitle] = useState('');
	const [note, setNote] = useState('');
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	const submitHandler = async (e) => {
		e.preventDefault();
		setError(null);
		setLoading(true);
		const config = {
			headers: {
				'Content-type': 'application/json',
			},
		};
		await axios
			.post(
				`https://denoter-server.herokuapp.com/api/notes/create/${userId}`,
				{
					title,
					note,
				},
				config
			)
			.then((data) => {
				console.log(data);
				setLoading(false);
			})
			.catch((err) => {
				setLoading(false);
				setError(error.response.data.message);
			});

		navigate('/home');
	};

	return (
		<Form onSubmit={submitHandler}>
			<h3 style={{ color: '#002E31' }}>Create new Note</h3>
			<Box margin="1rem" />
			<HashLoader color={color.btn} loading={loading} />
			<Box margin="1rem" />
			{error && <h3 style={{ color: '#f04848' }}>{error}</h3>}
			<Box margin="1rem" />

			<Input
				className="grid-item"
				required
				label="Title"
				type="text"
				placeholder="Anything..."
				value={title}
				onChange={(e) => setTitle(e.target.value)}
			/>
			<Box margin="1rem" />

			<Textarea
				className="grid-item"
				required
				label="Note"
				type="text"
				placeholder="Pour what in ur mind here..."
				value={note}
				onChange={(e) => setNote(e.target.value)}
			/>
			<Box margin="1.5rem" />

			<Button label="Save" type="submit" />
		</Form>
	);
};

export default CreateNote;

const Form = styled.form`
	width: 90vw;
	max-width: 768px;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
`;
