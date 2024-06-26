import { ThemeProvider, createGlobalStyle } from 'styled-components'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import theme from './theme'
import Login from './pages/Auth/Login/index.jsx';
import Cadastro from './pages/Auth/Register/index.jsx';
import MarketAddress from './pages/Auth/Register/Market/Address'
import MarketPlan from './pages/Auth/Register/Market/Plan'
import MarketInformation from './pages/Auth/Register/Market/Information'
import MarketConfirm from './pages/Auth/Register/Market/Confirm';
import OngAddress from './pages/Auth/Register/Ong/Address'
import OngInformation from './pages/Auth/Register/Ong/Information'
import OngConfirm from './pages/Auth/Register/Ong/Confirm';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './context/AuthContext';
import { PrivateRoute, PrivateRouteOng, PrivateRouteSupermarket } from './components/PrivateRoute.jsx';
import MainLayout from './Layout.jsx';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import { API_URL } from './api/config.js';
import { createTheme as MuiCreateTheme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles';

// Supermercado
import MarketDashboard from './pages/SupermarketUI/Dashboard/index.jsx'
import MarketProducts from './pages/SupermarketUI/Products/index.jsx';
import MarketProductView from './pages/SupermarketUI/ProductView/index.jsx';
import MarketDonations from './pages/SupermarketUI/Donations/index.jsx';
import MarketPlans from './pages/SupermarketUI/Plans/index.jsx';

// Ong
import ONGDashboard from './pages/OngUI/Dashboard/index.jsx'
import ONGDonations from './pages/OngUI/Donations/index.jsx';
import ONGFoods from './pages/OngUI/Foods/index.jsx';
import ONGFoodView from './pages/OngUI/FoodView/index.jsx';

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

const MuiTheme = MuiCreateTheme({
  palette: {
    primary: {
      main: theme.colors.primary,
      light: theme.colors.primary,
      dark: theme.colors.primary
    }
  },
  
})

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

          <MuiThemeProvider theme={MuiTheme}>

            <ToastContainer />

            <Router>
              {/* Rotas de Autenticação */}
              <Routes>
                <Route path='/login' element={<Login />} />

                <Route path='/cadastro'>
                  <Route index element={<Cadastro />} />
                  
                  <Route path='supermercado'>
                    <Route path='informacoes' element={<MarketInformation />} />
                    <Route path='endereco' element={<MarketAddress />} />
                    <Route path='planos' element={<MarketPlan />} />
                    <Route path='confirmar' element={<MarketConfirm />} />
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
                    <Route path='dashboard' element={<MarketDashboard />} />

                    <Route path='produtos'>
                      <Route index element={<MarketProducts/>} />
                      <Route path=':id' element={<MarketProductView />} />
                    </Route>

                    <Route path='doacoes' element={<MarketDonations />} />

                    <Route path='planos' element={<MarketPlans />} />
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

          </MuiThemeProvider>

        </AuthProvider>

      </QueryClientProvider>

    </ThemeProvider>
  )
}



export default App
