
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar';
import { AuthContextProvider } from './context/auth-context';
import Home from './pages/home';
import Login from './pages/login';
import Signup from './pages/signup';
import Account from './pages/account'
import ProtectedRoute from './components/protected-route';

function App() {
  return (
    <>
      <AuthContextProvider>
        <Navbar /> 
        <Routes> 
            <Route path='/' 
              element={        
                <ProtectedRoute>
                  <Home />   
                </ProtectedRoute>
              } 
            />
            <Route path='/signup' element={<Signup />} />
            <Route path='/login' element={<Login />} />
            <Route path='/account' 
              element={         
                <ProtectedRoute>               
                  <Account />     
                </ProtectedRoute>
              }
            />   
        </Routes>  
      </AuthContextProvider>
    </>
  );
}

export default App;
