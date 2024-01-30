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
import { HelmetProvider, Helmet } from 'react-helmet-async';
import { API_URL } from './api/config.js';

// Supermercado
import SMDashboard from './pages/SupermarketUI/Dashboard/index.jsx'
import SMProducts from './pages/SupermarketUI/Products/index.jsx';
import SMProductView from './pages/SupermarketUI/ProductView/index.jsx';
import SMDonations from './pages/SupermarketUI/Donations/index.jsx';

// Ong
import ONGDashboard from './pages/OngUI/Dashboard/index.jsx'
import ONGDonations from './pages/OngUI/Donations/index.jsx';
import ONGFoods from './pages/OngUI/Foods/index.jsx';
import ONGFoodView from './pages/OngUI/FoodView/index.jsx';
import Plans from './pages/SupermarketUI/Plans/index.jsx';

const GlobalStyle = createGlobalStyle`
  * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      font-family: 'Nunito', sans-serif;
    }

  body {
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
`

const queryClient = new QueryClient()

function App() {
  return (
    <ThemeProvider theme={theme}>

      {/* Lib para adicionar a tag meta CSP */}
      <HelmetProvider>

        {API_URL.includes("https") && (
          <Helmet>
            <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests" />
          </Helmet>
        )}
      </HelmetProvider>

      {/* Estilo Global */}
      <GlobalStyle />

      <QueryClientProvider client={queryClient}>

        <AuthProvider>

          <ToastContainer />

          <Router>
            {/* Rotas de Autenticação */}
            <Routes>
              <Route path='/login' element={<Login />} />

              <Route path='/cadastro'>
                <Route index element={<Cadastro />} />
                
                <Route path='supermercado'>
                  <Route path='informacoes' element={<SupermarketInformation />} />
                  <Route path='endereco' element={<SupermarketAddress />} />
                  <Route path='planos' element={<SupermarketPlan />} />
                  <Route path='confirmar' element={<SupermarketConfirm />} />
                </Route>

                <Route path='ong'>
                  <Route path='informacoes' element={<OngInformation />} />
                  <Route path='endereco' element={<OngAddress />} />
                  <Route path='confirmar' element={<OngConfirm />} />
                </Route>
              </Route>

              <Route
                element={<PrivateRoute><MainLayout /></PrivateRoute>}
              >
                <Route 
                  path='/estabelecimento'
                  element={<PrivateRouteSupermarket />}
                >
                  <Route path='dashboard' element={<SMDashboard />} />

                  <Route path='produtos'>
                    <Route index element={<SMProducts/>} />
                    <Route path=':id' element={<SMProductView />} />
                  </Route>

                  <Route path='doacoes' element={<SMDonations />} />

                  <Route path='planos' element={<Plans />} />
                </Route>

                <Route
                  path='/ong'
                  element={<PrivateRouteOng />}
                >
                  <Route path='dashboard' element={<ONGDashboard />} />

                  <Route path='doacoes' element={<ONGDonations />} />

                  <Route
                  
                  >

                  </Route>

                  <Route path='estabelecimentos'>
                    <Route index element={<ONGFoods />} />

                    <Route
                      path=':name'
                    >
                      <Route index />
                      <Route
                        path='produtos'
                      >
                        <Route path=':id' element={<ONGFoodView />} />
                      </Route>
                    </Route>
                  </Route>
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
