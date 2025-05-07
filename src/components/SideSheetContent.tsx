import React, { ReactNode } from 'react';
import classNames from 'classnames';

export const SideSheetContent: React.FC<{
  children: ReactNode;
  className?: string;
}> = ({ children, className }) => (
  <section className={classNames('sidesheet-content', className)}>
    {children}
  </section>
);
