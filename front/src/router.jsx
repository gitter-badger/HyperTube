import React from 'react';
import { Route, IndexRoute, Redirect } from 'react-router';

import App from './containers/App';
import Home from './containers/Home';
import Movie from './containers/Movie';
import Movies from './containers/Movies';
import Login from './containers/Login';
import Register from './containers/Register';

//import page 404
import Page404 from './containers/Page404';

export default (
  <Route path="/" component={App}>
      <IndexRoute component={Home}/>
        <Route path="/movies" component={Movies}/>
        <Route path="/login" component={Login}/>
        <Route path="/register" component={Register}/>
      <Route path="/movies/:id" component={Movie}/>
      {/*<Route path="tweets/:username" component={ByUsername}/>*/}
      <Route path="404" component={Page404}/>
      <Redirect from="*" to="404"/>
  </Route>
);