import 'reflect-metadata';
import 'semantic-ui-css/semantic.min.css';
import './App.css';

import ReactDOM from 'react-dom';

import App from './App';
import { initI18n } from './i18n';
import { setupContainer } from './ioc';

initI18n();
setupContainer();

ReactDOM.render(<App />, document.getElementById('root'));
