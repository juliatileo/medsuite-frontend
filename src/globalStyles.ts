import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    * {
        font-family: 'Roboto', sans-serif;
        input::-webkit-outer-spin-button,
        input::-webkit-inner-spin-button {
            -webkit-appearance: none;
            margin: 0;
        }


        input[type=number] {
            -moz-appearance: textfield;
            appearance: textfield;
    }
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
