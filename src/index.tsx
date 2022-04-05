import 'reflect-metadata';

import ReactDOM from 'react-dom';

import App from './App';
import { initI18n } from './i18n';
import { setupContainer } from './ioc';

initI18n();
setupContainer();

ReactDOM.render(<App />, document.getElementById('root'));
