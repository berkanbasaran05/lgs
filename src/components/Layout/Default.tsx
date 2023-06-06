import { ReactNode } from 'react';
import NonSSRWrapper from './NonSSRWrapper';
import { useAppSelector } from '../../hooks/reduxHooks';
import PrivateRoute from '../../utils/auth/PrivateRoute';
import Sidebar from '../Sidebar';
export default function Default({ children }: { children: ReactNode }) {
  const isOpen = useAppSelector((state) => state.navbar.isOpen);

  return (
    <NonSSRWrapper>
      <PrivateRoute>
        <div
          className={`h-full grid duration-300 transition-all ${
            isOpen
              ? 'grid-cols-[68px,calc(100%-68px)] lg:grid-cols-[250px,calc(100%-250px)]'
              : 'grid-cols-[68px,calc(100%-68px)]'
          }`}>
          <Sidebar />
          <main className={`min-h-screen col-start-2 h-full bg-gray-50 w-full`}>
            {children}
          </main>
        </div>
      </PrivateRoute>
    </NonSSRWrapper>
  );
}
