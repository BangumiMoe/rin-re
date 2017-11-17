import React from "react";

import { MuiThemeProvider, createMuiTheme } from "material-ui/styles";
import { fade } from "material-ui/styles/colorManipulator";

const theme = createMuiTheme();

const customTheme = createMuiTheme({
  overrides: {
    MuiTouchRipple: {
      rippleVisible: {
        opacity: 0.12,
      },
    },

    MuiButton: {
      root: {
        "&:hover": {
          backgroundColor: fade(theme.palette.text.primary, 0.075),
          "@media (hover: none)": {
            backgroundColor: fade(theme.palette.text.primary, 0.075),
          },
        },
        "&:active": {
          backgroundColor: fade(theme.palette.text.primary, 0.075),
        },
      },

      flatPrimary: {
        "&:hover": {
          backgroundColor: fade(theme.palette.primary[500], 0.05),
          "@media (hover: none)": {
            backgroundColor: fade(theme.palette.primary[500], 0.05),
          },
        },
        "&:active": {
          backgroundColor: fade(theme.palette.primary[500], 0.05),
        },
      },
    },

    MuiMenuItem: {
      root: {
        fontSize: `${14 / 16}rem`,
        "&:hover": {
          backgroundColor: fade(theme.palette.text.primary, 0.075),
        },
        "&:focus": {
          backgroundColor: fade(theme.palette.text.primary, 0.075),
        },
      },
    },
  },
});

const Theme = ({ children }) => (
  <MuiThemeProvider theme={customTheme}>{children}</MuiThemeProvider>
);

export default Theme;
