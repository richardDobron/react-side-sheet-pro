import React, { ReactNode } from 'react';
import { HiX } from 'react-icons/hi';
import classNames from 'classnames';

export const SideSheetHeader: React.FC<{
  title: string;
  onClose?: () => void;
  actions?: ReactNode;
  className?: string;
}> = React.memo(({ title, onClose, actions, className }) => (
  <header className={classNames('sidesheet-header', className)}>
    {onClose && (
      <button
        type="button"
        className="sidesheet-header-close sidesheet-header-btn"
        onClick={onClose}
      >
        <HiX />
      </button>
    )}
    <div className="sidesheet-header-title">{title}</div>
    {actions}
  </header>
));
