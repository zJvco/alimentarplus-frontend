import { ThemeProvider, createGlobalStyle } from 'styled-components'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import theme from './theme'
import Login from './pages/Auth/Login/index.jsx';
import Cadastro from './pages/Auth/Register/index.jsx';
import SupermarketAddress from './pages/Auth/Register/Supermarket/Address'
import SupermarketPlan from './pages/Auth/Register/Supermarket/Plan'
import SupermarketInformation from './pages/Auth/Register/Supermarket/Information'
import SupermarketConfirm from './pages/Auth/Register/Supermarket/Confirm';
import OngAddress from './pages/Auth/Register/Ong/Address'
import OngInformation from './pages/Auth/Register/Ong/Information'
import OngConfirm from './pages/Auth/Register/Ong/Confirm';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './context/AuthContext';
import { PrivateRoute, PrivateRouteOng, PrivateRouteSupermarket } from './components/PrivateRoute/index.jsx';
import MainLayout from './Layout.jsx';

// Supermercado
import SMHome from './pages/SupermarketUI/Home';
import SMProducts from './pages/SupermarketUI/Products/index.jsx';

// Ong
import ONGHome from './pages/OngUI/Home/index.jsx';

const GlobalStyle = createGlobalStyle`
  * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

  body {
      font-family: 'Nunito', sans-serif;
      font-size: .9rem;
  }

  a {
    text-decoration: none;
    color: ${props => props.theme.colors.primary};

    &:hover {
      text-decoration: underline;
      color: ${props => props.theme.colors.secondary};
    }
  }

  .footer-text {
    font-size: 0.8rem;
  }

  button {
    font-family: unset;
  }
`

const queryClient = new QueryClient()

function App() {

  return (
    <ThemeProvider theme={theme}>

      <GlobalStyle />

      <QueryClientProvider client={queryClient}>

        <AuthProvider>

          <ToastContainer />

          <Router>
            {/* Rotas de Autenticação */}
            <Routes>
              <Route path='/login' element={<Login />} />
              <Route path='/cadastro' element={<Cadastro />} />
              <Route path='/cadastro/supermercado/informacoes' element={<SupermarketInformation />} />
              <Route path='/cadastro/supermercado/endereco' element={<SupermarketAddress />} />
              <Route path='/cadastro/supermercado/planos' element={<SupermarketPlan />} />
              <Route path='/cadastro/supermercado/confirmar' element={<SupermarketConfirm />} />
              <Route path='/cadastro/ong/informacoes' element={<OngInformation />} />
              <Route path='/cadastro/ong/endereco' element={<OngAddress />} />
              <Route path='/cadastro/ong/confirmar' element={<OngConfirm />} />

              <Route
                element={<PrivateRoute><MainLayout /></PrivateRoute>}
              >
                <Route 
                  path='/estabelecimento'
                  element={<PrivateRouteSupermarket />}
                >
                  <Route index element={<SMHome />} />
                  <Route path='/estabelecimento/produtos' element={<SMProducts/>} />
                </Route>

                <Route
                  path='/ong'
                  element={<PrivateRouteOng><ONGHome /></PrivateRouteOng>}
                >

                </Route>

              </Route>
            </Routes>
          </Router>

        </AuthProvider>

      </QueryClientProvider>

    </ThemeProvider>
  )
}



export default App
