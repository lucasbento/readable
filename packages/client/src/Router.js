import React, { PureComponent } from 'react';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';

import { history } from './store';

import Header from './components/header/Header';

import PostList from './components/post/PostList';
import PostDetail from './components/post/PostDetail';

import Main from './components/Main';

class Router extends PureComponent {
  render() {
    return (
      <ConnectedRouter history={history}>
        <Header history={history}>
          <Switch>
            <Route
              path="/:category/:id"
              component={PostDetail}
            />

            <Route
              path="/:category"
              component={PostList}
            />

            <Route
              path="/"
              component={Main}
            />
          </Switch>
        </Header>
      </ConnectedRouter>
    );
  }
}

export default Router;
