import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import Onboarding from './pages/Onboarding.js';
import ROBOTO from './assets/font/Roboto-Medium.ttf';

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
				</Routes>
			</div>
		</BrowserRouter>
	);
}

export default App;