import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      timberwolf: string;
      sage: string;
      fernGreen: string;
      hunterGreen: string;
      brunswickGreen: string;
      seasalt: string;
      white: string;
      jet: string;
      battleshipGray: string;
      antiFlashWhite: string;
    };
    fonts: string[];
    fontSizes: {
      small: string;
      medium: string;
      large: string;
    };
  }
}
