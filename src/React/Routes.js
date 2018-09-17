import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Routes from 'config/routesConfig';
import HomePage from 'React/containers/HomePage';
import ArtistEventsPage from 'React/containers/ArtistEvents';


const Router = () => (
  <Switch>
    <Route exact path={Routes.artist} component={ArtistEventsPage} />
    <Route exact path={Routes.index} component={HomePage} />
  </Switch>
);

export default Router;
