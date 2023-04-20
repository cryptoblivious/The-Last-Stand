import { Outlet, useLocation } from 'react-router-dom';
import ColyseusProvider from './ColyseusProvider';

const App = () => {
  const location = useLocation();

  location.pathname === '/login' ? (
    <Outlet />
  ) : (
    <ColyseusProvider>
      <Outlet />
    </ColyseusProvider>
  );
};

export default App;
