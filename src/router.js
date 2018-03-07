import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'

import Dashboard from './pages/dashboard'

export default () => (
  <Router basename="/tmonitor">
    <Switch>
      <Route path='/' component={Dashboard} />
    </Switch>
  </Router>
)

// export default routes
