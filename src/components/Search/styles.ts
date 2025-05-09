import styled from "styled-components";

export const SearchContainer = styled.div`
  width: 900px;
  height: 60px;
  background-color: #f1f1f1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
`;

export const SearchInputForm = styled.form`
  background-color: #f1f1f1;
  border: none;
  width: 95%;
  height: 100%;
  overflow: hidden;
`;

export const SearchInput = styled.input`
  background-color: #f1f1f1;
  border: none;
  width: 100%;
  height: 100%;
  font-size: ${(props) => props.theme.fontSizes.medium};
`;
