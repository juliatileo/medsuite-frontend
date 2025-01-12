import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
        * {
            font-family: 'Roboto', sans-serif;
        }

    body, html, #root {
        margin: 0;
        padding: 0;
        background-color: #fafafa;
        color: #333;
    }

`;

export default GlobalStyle;
