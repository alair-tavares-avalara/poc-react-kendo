import React from 'react'
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader'
import Root from './Root';
import configureStore, { history } from './store/configureStore';
import registerServiceWorker from './registerServiceWorker';

const store = configureStore();

render(
    <AppContainer>
        <Root store={store} history={history} />
    </AppContainer>,
    document.getElementById('root')
);

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
