import { Routes, Route } from "react-router-dom";
import Homepage from "./components/Homepage/Homepage.tsx";
import Readings from "./components/Readings/Readings.tsx";
import Watchings from "./components/Watchings/Watchings.tsx";
import Listenings from "./components/Listenings/Listenings.tsx";
import { createTheme, ThemeProvider } from "@mui/material";
import './App.scss'

const theme = createTheme({
  palette: {
    primary: {
      main: '#74b9ff'
    },
    background: {
      paper: '#fff',
    },
    text: {
      primary: '#000000',
      secondary: "#74b9ff"
    }
  },
});

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Routes>
          <Route path="/" element={< Homepage />} />
          <Route path="/lecture" element={< Readings />} />
          <Route path="/visionnage" element={< Watchings />} />
          <Route path="/ecoute" element={< Listenings />} />
        </Routes>
      </ThemeProvider>
    </>
  )
}

export default App
