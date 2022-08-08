import { Route, Routes as ReactRouterRoutes } from 'react-router-dom';
import HomePage from './HomePage';
import SignInPage from './SignInPage'
import TestPage from './TestPage'


const Routes = () => {
  return (
    <ReactRouterRoutes>
      <Route path='/' element={<HomePage />} />
      <Route path="/signin" element={<SignInPage />} />
      <Route path="/test" element={<TestPage />} />

    </ReactRouterRoutes>
  )
}
export default Routes;