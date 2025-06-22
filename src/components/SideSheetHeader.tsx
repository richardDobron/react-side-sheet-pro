import React, { ReactNode } from 'react';
import { HiX } from 'react-icons/hi';

export const SideSheetHeader: React.FC<{
  title: string;
  onClose?: () => void;
  actions?: ReactNode;
}> = React.memo(({ title, onClose, actions }) => (
  <header className="sidesheet-header">
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
