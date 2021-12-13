import { createTheme } from '@material-ui/core'

export const theme = createTheme({
    overrides: {
      MuiCssBaseline: {
        '@global': {
          html: {
            boxSizing: "border-box"
          },
          a: {
            textDecoration: "none",
            color: "inherit"
          }
        }
      }
    },
    typography: {
      fontFamily: "'Quicksand', sans-serif"
    },
    color: {
      white: {
        main: '#fafafa',
        light: '#ffffff'
      },
      gray: {
        light: "rgba(0, 0, 0, 0.12)"
      },
      dark: {
        main: '#1b1d2c'
      },
      blueGrey: {
        main: "#cfd8dc"
      },
      grey: {
        main: "#424242",
        dark: "#1b1b1b"
      },
      amber: {
        main: "#fff8e1"
      }
    }
})