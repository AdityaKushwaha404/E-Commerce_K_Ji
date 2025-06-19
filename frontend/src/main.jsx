import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

// ✅ ADD THESE TWO LINES
import { Provider } from 'react-redux';
import store from './redux/store';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}> {/* ✅ Wrap your app in Provider */}
      <App />
    </Provider>
  </StrictMode>
);
