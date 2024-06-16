import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import Onboarding from './pages/Onboarding.js';
import Main from './pages/Main.js';
import Login from './pages/Login.js';
import Signup from './pages/Signup.js';
import PropertyRegis from './pages/PropertyRegis.js';
import PropertyTrans from './pages/PropertyTrans.js';
import Chat from './pages/Chat.js';
import Chatroom from './pages/Chatroom.js';
import My from './pages/My.js';
import ROBOTO from './assets/font/Cafe24OhsquareAir-v2.0.otf';
import DetailPage from './pages/DetailPage.js';
import PropertyTransApart from './pages/PropertyTransApart.js';
import DetailPageApart from './pages/DetailPageApart.js';
import Header from './components/Header/Header';
import PropertyPayment from './pages/PropertyPayment.js';
import Contract from './pages/Contract.js';
import CreateContract from "./pages/CreateContract.js";

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

.wrap {
  margin-top : 80px;
}

`;

function App() {
	return (
		<BrowserRouter>
			<GlobalStyle />
			<div className='layout'>
      <Header />
        <div className='wrap'>
        <Routes>
            <Route path='/' element={<Onboarding />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/main' element={<Main />} />
            <Route path='/propertyRegis' element={<PropertyRegis />} />
            <Route path='/propertyTrans' element={<PropertyTrans />} />
            <Route path='/propertyTransApart' element={<PropertyTransApart />} />
            <Route path='/PropertyPayment/:id' element={<PropertyPayment />} />
            <Route path='/chat' element={<Chat />} />
            <Route path="/chatroom/:id" component={<Chatroom />} />
            <Route path="/my" element={<My />} />
            <Route path="/detail/:id" element={<DetailPage />} />
            <Route path="/detailapart/:id" element={<DetailPageApart />} />
            <Route path='/contract/:id' element={<Contract />} /> 
            <Route path="/create-contract/:id" element={<CreateContract />} />
            
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
