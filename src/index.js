import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import './index.css';
import Root from './Root';
import configureStore, { history } from './store/configureStore';
import registerServiceWorker from './registerServiceWorker';

const store = configureStore();

const render = Component => {
    ReactDOM.render(
        <AppContainer>
            <Component />
        </AppContainer>,
        document.getElementById('root'),
    )
}

render(<Root store={store} history={history} />)

// Webpack Hot Module Replacement API
if (module.hot) {
    module.hot.accept('./Root', () => {
        const NewRoot = require('./Root').default;
        render(
            <AppContainer>
                <NewRoot store={store} history={history} />
            </AppContainer>,
            document.getElementById('root')
        );
    });
}

registerServiceWorker();
