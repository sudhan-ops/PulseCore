import React from 'react';
// FIX: Switched to react-router-dom namespace import to resolve module export errors.
import * as ReactRouterDom from 'react-router-dom';
import { useAppContext } from './hooks/useAppContext';
import Layout from './components/layout/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Sites from './pages/Sites';
import Control from './pages/Control';
import Automation from './pages/Automation';
import Monitoring from './pages/Monitoring';
import Reports from './pages/Reports';
import Users from './pages/Users';
import Toast from './components/ui/Toast';
import PermissionGuard from './components/PermissionGuard';
import DataManager from './pages/admin/DataManager';
import IotConfig from './pages/admin/IotConfig';
import Billing from './pages/admin/Billing';
import Configurations from './pages/admin/Configurations';

const App: React.FC = () => {
  const { role, toast } = useAppContext();

  return (
    <ReactRouterDom.HashRouter>
      <div className="font-sans text-slate-800 dark:text-slate-200">
        <ReactRouterDom.Routes>
          {role ? (
            <ReactRouterDom.Route path="/" element={<Layout />}>
              <ReactRouterDom.Route index element={<ReactRouterDom.Navigate to="/dashboard" replace />} />
              <ReactRouterDom.Route path="dashboard" element={<Dashboard />} />
              <ReactRouterDom.Route path="sites" element={<Sites />} />
              <ReactRouterDom.Route path="control" element={<PermissionGuard requiredPermissions={['control', 'control_limited']}><Control /></PermissionGuard>} />
              <ReactRouterDom.Route path="automation" element={<PermissionGuard requiredPermissions={['edit_automation']}><Automation /></PermissionGuard>} />
              <ReactRouterDom.Route path="monitoring" element={<Monitoring />} />
              <ReactRouterDom.Route path="reports" element={<Reports />} />
              
              <ReactRouterDom.Route path="admin" element={<ReactRouterDom.Outlet />}>
                <ReactRouterDom.Route path="users" element={<PermissionGuard requiredPermissions={['edit_users']}><Users /></PermissionGuard>} />
                <ReactRouterDom.Route path="data-manager" element={<PermissionGuard requiredPermissions={['manage_data']}><DataManager /></PermissionGuard>} />
                <ReactRouterDom.Route path="iot-config" element={<PermissionGuard requiredPermissions={['manage_data']}><IotConfig /></PermissionGuard>} />
                <ReactRouterDom.Route path="configurations" element={<PermissionGuard requiredPermissions={['manage_data']}><Configurations /></PermissionGuard>} />
                <ReactRouterDom.Route path="billing" element={<PermissionGuard requiredPermissions={['manage_data']}><Billing /></PermissionGuard>} />
              </ReactRouterDom.Route>

              <ReactRouterDom.Route path="*" element={<ReactRouterDom.Navigate to="/dashboard" replace />} />
            </ReactRouterDom.Route>
          ) : (
            <>
              <ReactRouterDom.Route path="/login" element={<Login />} />
              <ReactRouterDom.Route path="*" element={<ReactRouterDom.Navigate to="/login" replace />} />
            </>
          )}
        </ReactRouterDom.Routes>
        {toast && <Toast id={toast.id} message={toast.message} type={toast.type} action={toast.action} />}
      </div>
    </ReactRouterDom.HashRouter>
  );
};

export default App;