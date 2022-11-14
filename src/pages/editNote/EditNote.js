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
	const [oldNote, setOldNote] = useState('');
	const [title, setTitle] = useState('');
	const [note, setNote] = useState('');
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	const { noteId } = useParams();

	useEffect(() => {
		setLoading(true);
		axios
			.get(`https://denoter-server.herokuapp.com/api/notes/${noteId}`)
			.then(({ data }) => {
				setLoading(false);
				setError(false);
				setOldNote(data.data);
			})
			.catch((err) => {
				setLoading(false);
				setError('Gagal memuat data!');
			});
	}, [setLoading, noteId]);

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
			.patch(
				`https://denoter-server.herokuapp.com/api/notes/edit/${noteId}`,
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

	const deleteHandler = async (e) => {
		e.preventDefault();
		setError(null);
		setLoading(true);
		const config = {
			headers: {
				'Content-type': 'application/json',
			},
		};

		let confirmBox = window.confirm('Delete this poem?');
		if (confirmBox) {
			await axios
				.delete(
					`https://denoter-server.herokuapp.com/api/notes/delete/${noteId}`,
					// `http://localhost:5000/api/notes/delete/${noteId}`,
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
		}
	};

	return (
		<div>
			{oldNote && (
				<Flexbox>
					<Note
						style={{ width: '70vw' }}
						title={oldNote.title}
						note={oldNote.note}
						create={oldNote.created}
					/>

					<DelButton onClick={deleteHandler}>
						<img width={24} src={IconBin} alt="delete" />
					</DelButton>
				</Flexbox>
			)}

			<Form onSubmit={submitHandler}>
				<h3 style={{ color: '#002E31' }}>Edit Note</h3>
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
		</div>
	);
};

export default EditNote;

const Flexbox = styled.form`
	display: flex;
	justify-content: center;
	align-items: center;
	margin-bottom: 1rem;
`;

const Form = styled.form`
	width: 90vw;
	max-width: 768px;
	margin: 0 auto 2rem;
`;

const DelButton = styled.button`
	all: unset;
	border-radius: 0.3rem;
	margin-left: 1rem;
	padding: 0.8rem 0.8rem 0.3rem;
	background-color: ${color.btn};
	cursor: pointer;
	transition: 0.3s all ease;

	&:hover {
		background-color: hsl(20.5, 100%, 55%);
	}
`;
