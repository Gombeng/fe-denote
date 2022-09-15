import { createGlobalStyle } from 'styled-components';
import { color } from './Color';

export const GlobalStyles = createGlobalStyle`

* {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
}

body {
    color: ${color.text};
    background-color: ${color.bg};
    font-family: 'Poppins', sans-serif;
}

a {
    color: inherit;
    text-decoration: none;
}
`;
