import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { QueryClient, QueryClientProvider, } from 'react-query'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserContextProvide } from './ContextApi/UserContext.jsx'

const queryClient = new QueryClient()



const theme = createTheme({
  palette: {
    primary: {
      main: '#04342E',
      dark: '#F5671F',
      light: "#E9F7EF"
    },
    error: {
      main: "#E50F0C",
      warning: "#E75E06",
      dark: '#145A32',
    }
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(

  <React.StrictMode>

    <QueryClientProvider client={queryClient} >
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <UserContextProvide>
            <App />
          </UserContextProvide>
          <ToastContainer />
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>,
)
