import { Route, Routes} from 'react-router-dom';
import { AuthContextProvider } from './context/AuthContext';
import Layout from './components/Layout';
import ClientRegister from "./pages/ClientRegister";
import Packages from './pages/Packages';
import Home from './pages/Home';
import ClientDetail from './pages/ClientDetail';



function App() {
  return (
    <AuthContextProvider>
      <Layout>
        <Routes >
          <Route path='/' element={<Home />}/>
          <Route path='/client-register' element={<ClientRegister />}/>
          <Route path='/packages' element={<Packages />}/>
          <Route path='/client-detail' element={<ClientDetail />}/>
        </Routes>
      </Layout>
    </AuthContextProvider>
  )
};

export default App;
