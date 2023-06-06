import { ReactNode } from 'react';
import dynamic from 'next/dynamic';

const NonSSRWrapper = ({ children }: { children: ReactNode }) => (
  <>{children}</>
);
export default dynamic(() => Promise.resolve(NonSSRWrapper), {
  ssr: false
});
