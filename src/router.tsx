import { Switch, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'

const Routes = () => (
  <Switch>
    <Route path="/login">
      <Login />
    </Route>
    <Route path="/">
      <Dashboard />
    </Route>
  </Switch>
)

export default Routes
