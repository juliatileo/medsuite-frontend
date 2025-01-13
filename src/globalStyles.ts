import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    * {
            font-family: 'Roboto', sans-serif;
    }

    body, html, #root {
        margin: 0;
        padding: 0;
        background-color: #fefefe;
        color: #333;
    }


    textarea:focus, input:focus{
        outline: none;
    }

    a {
        text-decoration: none;
        color: inherit;
    }
`;

export default GlobalStyle;
