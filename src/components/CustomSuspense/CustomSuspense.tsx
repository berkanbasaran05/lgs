import React, { ReactNode } from 'react';
import ErrorView from '../ErrorView/ErrorView';

// eslint-disable-next-line no-unused-vars
type ChildrenProps<T> = (data: T) => ReactNode;

type CustomSuspenseProps<T> = {
  children: ChildrenProps<T>;
  fallback: ReactNode;
  emptyMessage?: ReactNode;
  isLoading: boolean;
  isError: boolean;
  data: T | undefined;
};

const CustomSuspense = <T extends object>({
  children,
  isLoading,
  isError,
  data,
  emptyMessage,
  fallback
}: CustomSuspenseProps<T>) => {
  if (isLoading) {
    return <>{fallback}</>;
  }
  if (isError) {
    return <ErrorView content={<>Bir hata oluştu.</>} />;
  }
  // ARRAY
  if (Array.isArray(data)) {
    if (data && data.length > 0) {
      return <>{children(data)}</>;
    } else {
      return <>{emptyMessage}</>;
    }
  }
  // EMPTY OBJECT
  if (!data) {
    return <>{emptyMessage}</>;
  }

  return <>{children(data)}</>;
};

export default CustomSuspense;
