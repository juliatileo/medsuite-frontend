import { Search as MuiSearch } from "@mui/icons-material";

import { SearchContainer, SearchInput, SearchInputForm } from "./styles";
import { SearchProps } from "./types";

function Search(props: SearchProps) {
  return (
    <SearchContainer>
      <SearchInputForm
        onSubmit={(e) => {
          e.preventDefault();

          props.submit;
        }}
      >
        <SearchInput onChange={props.onChange} />
      </SearchInputForm>
      <MuiSearch
        fontSize="large"
        sx={{ cursor: "pointer" }}
        onClick={props.submit}
      />
    </SearchContainer>
  );
}

export default Search;
