import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from "react-redux";
import store from './store/store.js';


createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <div class="zoomed-wrapper"></div>
      <div className='dark:bg-black'>
        <App />
      </div>
    </div>
  </Provider>
)
