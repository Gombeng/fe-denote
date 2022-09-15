import React from 'react';
import styled from 'styled-components';
import { color } from '../utils/Color';

const Button = ({ label, ...rest}) => {
	return <ButtonSC {...rest}>{label}</ButtonSC>;
};

export default Button;

const ButtonSC = styled.button`
	all: unset;
	padding: .8rem 1.6rem;
	border-radius: 0.3rem;
	color: #fff;
	background: ${color.btn};
	cursor: pointer;
	transition: .3s all ease;

	&:hover {
		opacity: 0.8;
	}
`;
