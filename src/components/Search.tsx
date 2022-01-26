import { InputBase } from "@mui/material";
import {styled } from "@mui/material/styles";

export const Search = styled('div')(({ theme }) => ({
    position: 'relative',
  }));


export const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
}));

export const StyledInputBase = styled(InputBase)(({ theme }) => ({
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      marginLeft: `calc(1em + ${theme.spacing(4)})`
    }
}));
