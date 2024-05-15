import { ThemeProvider, styled } from 'styled-components'
import { lightTheme } from './utils/Themes.js'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Authentication from './pages/Authentication';
import Navbar from './components/Navbar.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Workouts from './pages/Workouts.jsx';

const Container = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    background: ${({ theme }) => theme.bg};
    color: ${({ theme }) => theme.text_primary};
    overflow-x: hidden;
    overflow-y: hidden;
    transition: all 0.2s ease;

`;


function App() {
  const { currentUser } = useSelector((state) => state.user)
  return (
    <ThemeProvider theme={lightTheme}>
      <BrowserRouter>
        {currentUser ? (<Container>
          <Navbar currentUser={currentUser} />
          <Routes>
            <Route path="/" exact element={<Dashboard />} />
            <Route path="/workouts" exact element={<Workouts />} />
          </Routes>
        </Container>) :
          (<Container>
            <Authentication />
          </Container>)
        }
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
