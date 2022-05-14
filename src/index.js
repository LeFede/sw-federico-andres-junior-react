import { StrictMode } from 'react';
import {createRoot} from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import store from './features/store';


const root = createRoot(document.getElementById('root'));
root.render(
  <Router>
    <StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </StrictMode>
  </Router>
);
