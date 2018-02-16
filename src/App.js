/* eslint-disable import/no-named-as-default */
import React from 'react';
import PropTypes from 'prop-types';
import { Switch, BrowserRouter as Router, Route } from 'react-router-dom';
import HomePage from './containers/HomePage';
import NotFoundPage from './containers/NotFoundPage';
import AgastListPage from './containers/AgastListPage';
import AgastFormPage from './containers/AgastFormPage';
import '@progress/kendo-theme-default/dist/all.css';

// This is a class-based component because the current
// version of hot reloading won't hot reload a stateless
// component at the top-level.

class App extends React.Component {
  static propTypes = {
    children: PropTypes.element
  };
  
  render() {
    return (
      <Router>
        <div>
          <div>
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route exact path="/agast-list" component={AgastListPage} />
              <Route exact path="/agast-form" component={AgastFormPage} />
              <Route component={NotFoundPage} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;