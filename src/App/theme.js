import { createMuiTheme } from '@material-ui/core/styles'

// A custom theme for this app
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#4791db',
    },
    secondary: {
      main: '#e33371',
    },
    error: {
      main: '#e57373',
    },
    background: {
      default: '#fff',
    },
  },
})

export default theme
