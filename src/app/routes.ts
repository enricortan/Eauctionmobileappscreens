import { createHashRouter } from 'react-router';
import LandingPage from './pages/LandingPage';
import BuyerPage from './pages/BuyerPage';
import SupplierPage from './pages/SupplierPage';
import BuyerScreensPage from './pages/BuyerScreensPage';
import SupplierScreensPage from './pages/SupplierScreensPage';
import BuyerDemoPage from './pages/BuyerDemoPage';
import SupplierDemoPage from './pages/SupplierDemoPage';

// Using createHashRouter so URLs like enricortan.com/eauction/#/buyer
// work on GitHub Pages without a 404.html workaround.
export const router = createHashRouter([
  { path: '/', Component: LandingPage },
  { path: '/buyer', Component: BuyerPage },
  { path: '/buyer/screens', Component: BuyerScreensPage },
  { path: '/buyer/demo', Component: BuyerDemoPage },
  { path: '/supplier', Component: SupplierPage },
  { path: '/supplier/screens', Component: SupplierScreensPage },
  { path: '/supplier/demo', Component: SupplierDemoPage },
]);