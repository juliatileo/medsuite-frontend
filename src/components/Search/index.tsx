import { Search as MuiSearch } from "@mui/icons-material";

import { SearchContainer, SearchInput, SearchInputForm } from "./styles";
import { SearchProps } from "./types";

function Search(props: SearchProps) {
  return (
    <SearchContainer>
      <SearchInputForm onSubmit={(e) => e.preventDefault()}>
        <SearchInput onChange={props.onChange} placeholder="Pesquise aqui..." />
      </SearchInputForm>
      <MuiSearch fontSize="large" sx={{ cursor: "pointer" }} />
    </SearchContainer>
  );
}

export default Search;
