import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';

//
import { SWRConfig } from 'swr';
import App from './App';
import { store } from './store';
import * as serviceWorker from './serviceWorker';
import reportWebVitals from './reportWebVitals';
import APIService from './service';
import './index.css';

ReactDOM.render(
  <HelmetProvider>
    <Router>
      <Provider store={store}>
        <SWRConfig
          value={{
            // refreshInterval: 3000,
            fetcher: (url) => APIService.fetcher(url),
          }}
        >
          <App />
        </SWRConfig>
      </Provider>
    </Router>
  </HelmetProvider>,
  document.getElementById('root')
);

// If you want to enable client cache, register instead.
serviceWorker.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
