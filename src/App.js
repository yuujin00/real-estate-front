import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import Onboarding from './pages/Onboarding.js';
import Main from './pages/Main.js';
import Login from './pages/Login.js';
import Signup from './pages/Signup.js';
import ROBOTO from './assets/font/Cafe24OhsquareAir-v2.0.otf';

const GlobalStyle = createGlobalStyle`
@font-face {
  font-family: 'ROBOTO';
  src: local('ROBOTO'), url(${ROBOTO}) format('truetype');
  font-weight: normal;
  font-style: normal;
}

.body, html {
  font-family: 'ROBOTO';
  background-color: white;
  letter-spacing: -0.1px;
  margin: 0;
  background-color: black;
  padding: 0;
  overflow-x: hidden;
}

.layout{
    max-width: 390px;
    height: 720px;
    background-color: white;
    margin: 0 auto ;
    overflow-y: scroll;
    overflow-x: hidden;
}

.layout::-webkit-scrollbar {
  width: 0;
}

.layout::-webkit-scrollbar-thumb {
}

`;
function App() {
	return (
		<BrowserRouter>
			<GlobalStyle />
			<div className='layout'>
				<Routes>
					<Route path='/' element={<Onboarding />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/main' element={<Main />} />
				</Routes>
			</div>
		</BrowserRouter>
	);
}

export default App;