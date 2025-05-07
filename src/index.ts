import { SideSheetHeader } from './components/SideSheetHeader';
import { SideSheetContent } from './components/SideSheetContent';
import { SideSheetFooter } from './components/SideSheetFooter';
import { SideSheetProvider } from './components/SideSheetProvider';

export { useSideSheet } from './hooks/useSideSheet';
export * from './types';

export const SideSheet = {
  Provider: SideSheetProvider,
  Header: SideSheetHeader,
  Content: SideSheetContent,
  Footer: SideSheetFooter,
};
