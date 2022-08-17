import { Route, Routes as ReactRouterRoutes } from 'react-router-dom';
import HomePage from './HomePage';
import SignInPage from './SignInPage'
import TestPage from './TestPage'
import TestResultPage from './TestResultPage';


const Routes = () => {
  return (
  <>
    <ReactRouterRoutes>
      <Route path="/" element={<SignInPage />} />
      <Route path='/home' element={<HomePage />} />
      <Route path="/test" element={<TestPage />} />
      <Route path="/result" element={<TestResultPage />} />
    </ReactRouterRoutes>
  </>
  )
}
export default Routes;  