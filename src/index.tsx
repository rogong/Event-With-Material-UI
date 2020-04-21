import React from 'react';
import ReactDOM from 'react-dom';
import App from './app/layout/App';
import 'typeface-roboto';
import {createBrowserHistory} from 'history';
import { BrowserRouter } from 'react-router-dom';

export const history = createBrowserHistory();

ReactDOM.render(
    <BrowserRouter >
<App />
</BrowserRouter>
, document.getElementById('root'));
