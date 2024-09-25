import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '@radix-ui/themes/styles.css';


import store from './app/store.ts'
import App from './App.jsx'
import './index.css'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
    <App />
    </Provider>
  </StrictMode>,
)
