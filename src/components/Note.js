import React from 'react';
import styled from 'styled-components';
import { IconBin } from '../assets/Assets';
import { color } from './../utils/Color';

const Note = ({ title, note, create, btnDelete }) => {
	return (
		<Container>
			<div>
				<h3>{title}</h3>
				<p>{note}</p>
				<strong>{create}</strong>
			</div>
		</Container>
	);
};

export default Note;

const Container = styled.div`
	display: flex;
	align-items: center;

	div {
		color: ${color.nav};
		background-color: ${color.input};
		padding: 1rem;
		margin: 1.3rem auto 0;
		border-radius: 0.3rem;
		width: 90vw;
		max-width: 708px;
		cursor: pointer;
		position: relative;
		box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 15px -3px,
			rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;

		&:hover {
			background-color: hsl(55, 67%, 65%);
		}

		h3 {
			margin-bottom: 0.5rem;
		}

		p {
			margin-bottom: 0.5rem;
		}

		strong {
			font-size: 12px;
		}
	}
`;
