import './App.css';
import {Provider} from "react-redux";
import store from './redux/store'
import {BrowserRouter} from "react-router-dom";
import Header from "./Components/Header/Header";
import Main from "./Components/Main/Main";
import React from 'react';

const App: React.FC<{
  tab: string
}> = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
          <Header />
          <Main store={store}/>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
