import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'

import Dashboard from './pages/dashboard';
import VideoTest from './pages/videoTest';

export default () => (
  <Router basename="/tmonitor">
    <Switch>
      <Route path='/' component={VideoTest} />
    </Switch>
  </Router>
)

// export default routes
