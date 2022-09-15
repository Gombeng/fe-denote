import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Container, Button } from '../../components/Components';
import { color } from '../../utils/Color';

const NotFound = () => {
	return (
		<Container>
			<Box>
				<h2>You've been lost Denoter!</h2>

				<Link to="/home">
					<Button label="Go back home" />
				</Link>
			</Box>
		</Container>
	);
};

export default NotFound;

const Box = styled.div`
	color: ${color.nav};

	h2 {
		margin-bottom: 1rem;
	}
`;
