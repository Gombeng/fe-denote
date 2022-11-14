import React from 'react';
import styled from 'styled-components';
import { color } from '../utils/Color';

const Button = ({ label, ...rest }) => {
	return <ButtonSC {...rest}>{label}</ButtonSC>;
};

export default Button;

const ButtonSC = styled.button`
	all: unset;
	padding: 0.8rem 1.6rem;
	width: fit-content;
	border-radius: 0.3rem;
	color: #fff;
	background: ${color.btn};
	cursor: pointer;
	transition: 0.3s all ease;

	&:hover {
		background-color: hsl(20.5, 100%, 55%);
	}
`;
