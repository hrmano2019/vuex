import { Provider } from 'react-redux';
import { store } from './store';

const App = () => (
  <Provider store={store}>
    <Index />
  </Provider>
  

);
