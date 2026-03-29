import { Navigate } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';
import { authStorage } from '../../utils/auth';

interface Props {
  children: React.ReactNode;
  requiredRole?: 'admin' | 'user';
}

const ProtectedRoute = ({ children, requiredRole }: Props) => {
  const user = authStorage.getUser();
  const token = authStorage.getToken();

  if (!token || !user) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to={ROUTES.DASHBOARD} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;