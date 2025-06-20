import styled from "styled-components";

export const CardsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  column-gap: 20px;
  row-gap: 20px;
  padding: 30px;
`;

export const Card = styled.div`
  padding: 20px;
  border-radius: 10px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  height: fit-content;
  width: 300px fit-content;
  background-color: ${(props) => props.theme.colors.sage};
`;

export const CardTitle = styled.h2`
  font-size: 1.5rem;
  color: ${(props) => props.theme.colors.antiFlashWhite};
`;

export const CardContent = styled.h2`
  font-size: 2.5rem;
  text-align: center;
  color: ${(props) => props.theme.colors.white};
`;
