import { useContext } from 'react';
import { SideSheetContextValue } from '../types';
import { SideSheetContext } from '../components/SideSheetProvider';

export const useSideSheet = (): SideSheetContextValue => {
  const context = useContext(SideSheetContext);
  if (!context) {
    throw new Error('useSideSheet must be used within SideSheetProvider');
  }
  return context;
};
