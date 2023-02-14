import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { HashLoader } from 'react-spinners';
import { color } from '../../utils/Color';
import { Input, Box, Button, Textarea } from '../../components/Components';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import Note from './../../components/Note';
import { IconBin } from '../../assets/Assets';

const EditNote = () => {

	const PROD_URL = 'https://be-denote.vercel.app'
	const [error, setError] = useState(false);
	const [loading, setLoading] = useState(false);

	const [formData, setFormData] = useState({
		title: '',
		note: '',
	});

	const navigate = useNavigate();
	const { noteId } = useParams();

	useEffect(() => {
		setLoading(true);
		axios
			.get(`${PROD_URL}/api/notes/${noteId}`)
			.then(({ data }) => {
				setLoading(false);
				setError(false);
				setFormData(data.data);
			})
			.catch((err) => {
				setLoading(false);
				setError('Gagal memuat data!');
			});
	}, [setLoading, noteId]);

	const config = {
		headers: {
			'Content-type': 'application/json',
		},
	};

	const handleChange = e => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const submitHandler = async (e) => {
		e.preventDefault();
		setError(null);
		setLoading(true);

		await axios
			.patch(
				`${PROD_URL}/api/notes/edit/${noteId}`,
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

	const deleteHandler = async (e) => {
		e.preventDefault();
		setError(null);
		setLoading(true);

		let confirmBox = window.confirm('Delete this poem?');
		if (confirmBox) {
			await axios
				.delete(
					`${PROD_URL}/api/notes/delete/${noteId}`,
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
		}
	};

	return (
		<>
			<Form onSubmit={submitHandler}>
				<h3 style={{ color: '#002E31', margin: '2rem 0' }}>Edit Note</h3>
				<HashLoader cssOverride={{ margin: '2rem 0' }} color={color.btn} loading={loading} />
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
					name="note"
					placeholder="Pour what in ur mind here..."
					value={formData.note}
					onChange={handleChange}
				/>
				<Box margin="1.5rem" />

				<Button label="Save" type="submit" style={{marginRight: "1rem"}}/>
				<Button label="Delete" onClick={deleteHandler} />
			</Form>
		</>
	);
};

export default EditNote;

const Form = styled.form`
	width: 90vw;
	max-width: 768px;
	margin: 0 auto 2rem;
`;
