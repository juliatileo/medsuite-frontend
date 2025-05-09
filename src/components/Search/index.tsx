import { Search as MuiSearch } from "@mui/icons-material";

import { SearchContainer, SearchInput, SearchInputForm } from "./styles";
import { SearchProps } from "./types";
import { useState } from "react";

function Search(props: SearchProps) {
  const [value, setValue] = useState("");

  return (
    <SearchContainer>
      <SearchInputForm>
        <SearchInput onChange={(e) => setValue(e.target.value)} value={value} />
      </SearchInputForm>
      <MuiSearch fontSize="large" sx={{ cursor: "pointer" }} />
    </SearchContainer>
  );
}

export default Search;
