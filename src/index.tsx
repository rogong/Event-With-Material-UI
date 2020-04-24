import React from 'react';
import ReactDOM from 'react-dom';
import App from './app/layout/App';
import 'typeface-roboto';
import {createBrowserHistory} from 'history';
import { BrowserRouter } from 'react-router-dom';
import ScrollToTop from './app/layout/ScrollToTop';
import 'semantic-ui-css/semantic.min.css'

export const history = createBrowserHistory();

ReactDOM.render(
    <BrowserRouter >
        <ScrollToTop>
            <App />
        </ScrollToTop>
</BrowserRouter>
, document.getElementById('root'));
