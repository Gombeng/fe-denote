import React from 'react';
import styled from 'styled-components';
import { color } from '../utils/Color';

const Textarea = ({ label, ...rest }) => {
	return (
		<Container>
			<p>{label}</p>
			<textarea {...rest} />
		</Container>
	);
};

export default Textarea;

const Container = styled.div`
	p {
		margin-bottom: .5rem;
	}

	textarea {
		all: unset;
		padding: 1rem;
		width: 90%;
        height: 15vh;
		border-radius: 0.3rem;
		color: ${color.nav};
		background-color: ${color.input};
	}
`;
