import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import { store } from '../bll/store';
import { Main } from './Main/Main';
import './App.css';

const App = () => {
  return (
    <div className='app'>
      <Provider store={store}>
        <HashRouter>
          <Main />
        </HashRouter>
      </Provider>
    </div>
  );
}

export default App;
