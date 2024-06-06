import { ReactNode, useEffect, useState } from 'react';
import { useAppSelector } from '@/hooks/reduxHooks';
import { RoleType } from '../../redux/features/user/userSlice';

const RoleChecker = ({
  children,
  roles
}: {
  children: ReactNode;
  roles: string[];
}) => {
  const userRole = useAppSelector((state) => state.user.role);
  const [role, setRole] = useState<RoleType | null>(null);
  useEffect(() => {
    if (userRole) {
      setRole(userRole);
    }
  }, [userRole]);
  if (role && roles.includes(role)) {
    return <>{children}</>;
  } else {
    return null;
  }
};

export default RoleChecker;
