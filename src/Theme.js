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
          backgroundColor: fade(theme.palette.text.primary, 0.05),
          "@media (hover: none)": {
            backgroundColor: fade(theme.palette.text.primary, 0.05),
          },
        },
        "&:active": {
          backgroundColor: fade(theme.palette.text.primary, 0.05),
        },
      },
    },

    MuiListItem: {
      button: {
        "&:hover": {
          backgroundColor: fade(theme.palette.text.primary, 0.05),
          "@media (hover: none)": {
            backgroundColor: fade(theme.palette.text.primary, 0.05),
          },
        },
        "&:active": {
          backgroundColor: fade(theme.palette.text.primary, 0.05),
        },
        "&:focus": {
          backgroundColor: fade(theme.palette.text.primary, 0.05),
        },
      },
    },
  },
});

const Theme = ({ children }) => (
  <MuiThemeProvider theme={customTheme}>{children}</MuiThemeProvider>
);

export default Theme;
