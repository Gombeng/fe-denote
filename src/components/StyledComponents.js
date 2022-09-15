import styled from 'styled-components';

const Container = styled.div`
	display: flex;
	justify-content: center;
	align-items: ${({ alignStart }) => (alignStart ? 'flex-start' : 'center')};
	min-height: 90vh;
`;

export { Container };
