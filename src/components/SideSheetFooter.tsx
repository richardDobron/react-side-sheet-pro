import React, { ReactNode } from 'react';
import classNames from 'classnames';

export const SideSheetFooter: React.FC<{
  children: ReactNode;
  className?: string;
}> = ({ children, className }) => (
  <footer className={classNames('sidesheet-footer', className)}>
    {children}
  </footer>
);
