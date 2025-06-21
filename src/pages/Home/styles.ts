import styled from "styled-components";

export const CardsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  column-gap: 20px;
  row-gap: 20px;
  padding: 30px;
  width: 100%;

  @media (max-width: 720px) {
    justify-content: center;
    align-items: center;
    padding: 30px 0;
  }
`;

export const Card = styled.div`
  padding: 20px;
  border-radius: 10px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  height: fit-content;
  width: fit-content;
  min-width: 250px;
  background-color: ${(props) => props.theme.colors.sage};
  justify-content: center;
  align-items: center;
  text-align: center;

  @media (max-width: 1366px) {
    width: 320px;
  }

  @media (max-width: 1280px) {
    width: 320px;
  }
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

export const SmallCardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  width: 70%;
  column-gap: 20px;
  row-gap: 20px;

  @media (max-width: 1920px) {
  }

  @media (max-width: 720px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;
