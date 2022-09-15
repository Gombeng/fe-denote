import React from 'react';
import styled from 'styled-components';
import { color } from '../utils/Color';

const Note = ({ title, note, create }) => {
	return (
		<Container>
			<h3>{title}</h3>
			<p>{note}</p>
			<strong>{create}</strong>
		</Container>
	);
};

export default Note;

const Container = styled.div`
	color: ${color.nav};
	background-color: ${color.input};
	width: 90%;
	max-width: 768px;
	border-radius: 0.3rem;
	padding: 1rem;
	margin: 1.3rem auto 0;
	cursor: pointer;
	box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 15px -3px,
		rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;

	h3 {
		margin-bottom: 0.5rem;
	}

	p {
		margin-bottom: 0.5rem;
	}

	strong {
		font-size: 12px;
	}
`;
