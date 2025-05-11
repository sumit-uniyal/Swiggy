import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store, { persistor }  from './components/store/Store.jsx'
import { PersistGate } from 'redux-persist/integration/react'
import Footer from './components/Footer/Footer.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google';

// const persistor = persistStore(store);

createRoot(document.getElementById('root')).render(

  <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <div className="app-container">
          <App />
          <Footer />
        </div>
      </PersistGate>
    </Provider>
  </GoogleOAuthProvider>,
)
