import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ThemeProvider, createTheme } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"

const theme = createTheme({
  palette: {
    mode: 'dark',
  },
  components: {
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          fontSize: '1.2rem',
        },
      },
    },
  },
});

const ThemeWrapper = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider theme={theme}>
    {children}
  </ThemeProvider>
);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeWrapper>
      <CssBaseline />
      <App />
    </ThemeWrapper>
  </StrictMode>,
)
