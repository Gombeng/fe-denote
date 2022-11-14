import React from 'react';
import styled from 'styled-components';
import { color } from '../utils/Color';

const Input = ({ label, ...rest }) => {
	return (
		<Container>
			<p>{label}</p>
			<input {...rest} />
		</Container>
	);
};

export default Input;

const Container = styled.div`
	p {
		margin-bottom: 0.5rem;
		color: ${color.nav};
	}

	input {
		all: unset;
		padding: 1rem;
		width: 90%;
		border-radius: 0.3rem;
		color: ${color.nav};
		background-color: ${color.input};
	}
`;
