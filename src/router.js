import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'

import Login from './pages/Login'

export default () => (
  <Router basename="/tmonitor">
    <Switch>
      <Route path='/login' component={Login} />
    </Switch>
  </Router>
)

// export default routes
