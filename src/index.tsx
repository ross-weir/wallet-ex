import 'reflect-metadata';

import ReactDOM from 'react-dom';
import { initI18n } from './i18n';
import App from './App';

import 'semantic-ui-css/semantic.min.css';
import './App.css';
import { setupContainer } from './ioc';

initI18n();
setupContainer();

ReactDOM.render(<App />, document.getElementById('root'));
