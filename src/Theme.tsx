import { ThemeProvider } from "styled-components";

const theme = {
  colors: {
    timberwolf: "#DAD7CD",
    sage: "#A3B18A",
    fernGreen: "#588157",
    hunterGreen: "#3A5A40",
    brunswickGreen: "#344E41",
    seasalt: "#F6F6F6",
    white: "#FEFEFE",
    jet: "#333333",
    battleshipGray: "#999999",
    antiFlashWhite: "#F1F1F1",
  },
  fonts: ["sans-serif", "Roboto"],
  fontSizes: {
    small: "1em",
    medium: "1.5em",
    large: "2em",
  },
};

const Theme = ({ children }: { children: JSX.Element[] }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

export default Theme;
