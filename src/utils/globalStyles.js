import { createGlobalStyle } from 'styled-components';
import { FontPoppins } from '../assets/Assets';
import { color } from './Color';



export const GlobalStyles = createGlobalStyle`
@font-face { font-family: 'Poppins'; src: url(${FontPoppins}); } 

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
