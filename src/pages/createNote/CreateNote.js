import axios from 'axios';
import React, { useState } from 'react';
import { HashLoader } from 'react-spinners';
import { color } from '../../utils/Color';
import { Input, Box, Button, Textarea } from '../../components/Components';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const CreateNote = () => {

	const PROD_URL = 'https://be-denote.vercel.app'
	const userData = JSON.parse(localStorage.getItem('user'));
	const userId = userData.data._id;
	const navigate = useNavigate();

	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	const [formData, setFormData] = useState({
		title: '',
		note: '',
	});

	const handleChange = e => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const config = {
		headers: {
			'Content-type': 'application/json',
		},
	};

	const submitHandler = async (e) => {
		e.preventDefault();
		setError(null);
		setLoading(true);

		await axios
			.post(
				`${PROD_URL}/api/notes/create/${userId}`,
				{
					title: formData.title,
					note: formData.note,
				},
				config
			)
			.then((data) => {
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
			<h3 style={{ color: '#002E31', margin: "2rem 0" }}>Create new Note</h3>
			<HashLoader cssOverride={{ margin: "2rem 0" }} color={color.btn} loading={loading} />
			{error && <h3 style={{ color: '#f04848' }}>{error}</h3>}

			<Input
				className="grid-item"
				required
				label="Title"
				type="text"
				name='title'
				placeholder="Anything..."
				value={formData.title}
				onChange={handleChange}
			/>
			<Box margin="1rem" />

			<Textarea
				className="grid-item"
				required
				label="Note"
				type="text"
				name='note'
				placeholder="Pour what in ur mind here..."
				value={formData.note}
				onChange={handleChange}
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
