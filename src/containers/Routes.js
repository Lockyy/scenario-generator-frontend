import React, { Component } from 'react'
import { Router, Route, browserHistory } from 'react-router'
import DocumentTitle from 'react-document-title'
import Strings from '../constants/strings'
import App from './App';
import ScenarioContainer from './Scenario'

/**
 * Component is exported for conditional usage in Root.js
 */
module.exports = class Routes extends Component {
  render() {
    return (
      <DocumentTitle title={Strings.rootPageTitle}>
        <Router history={browserHistory} >
          <Route path="/" component={App}>
            <Route path="generators/:id" component={ScenarioContainer} />
          </Route>
        </Router>
      </DocumentTitle>
    );
  }
};