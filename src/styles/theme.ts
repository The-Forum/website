import { createTheme } from "@mui/material";
import { forwardRef } from "react";
export const theme = createTheme({
  palette: {
    primary: {
      main: '#000c66',
    },
    secondary: {
      main: '#fffaf2',
      // dark: will be calculated from palette.secondary.main,
    },
    // Used by `getContrastText()` to maximize the contrast between
    // the background and the text.
    contrastThreshold: 3,
    // Used by the functions below to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: 0.2,
  },
});